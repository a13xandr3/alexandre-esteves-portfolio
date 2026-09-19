#!/usr/bin/env bash

set -Eeuo pipefail

readonly DOMAIN="alexandre-esteves.com.br"
readonly PRODUCTION_URL="https://${DOMAIN}"
readonly EXPECTED_ORIGIN="https://github.com/a13xandr3/alexandre-esteves-portfolio.git"
readonly BUILD_DIR="dist/alexandre-page/browser"
readonly PDF_PATH="assets/images/Alexandre-Esteves-CV.pdf"
readonly NG_BIN="./node_modules/.bin/ng"
readonly MAX_ATTEMPTS=12
readonly RETRY_INTERVAL=10

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
cd "$SCRIPT_DIR"

TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

fail() {
  echo "ERRO: $*" >&2
  exit 1
}

echo "======================================"
echo "DEPLOY EM PRODUÇÃO"
echo "======================================"

echo
echo "[1/4] Validando ambiente e repositório..."

for command in git curl cmp; do
  command -v "$command" >/dev/null 2>&1 || fail "comando obrigatório não encontrado: $command"
done

[[ -x "$NG_BIN" ]] || fail "Angular CLI local não encontrado. Execute: npm ci"
[[ $(git branch --show-current) == "main" ]] || fail "execute o deploy a partir da branch main."
[[ -z $(git status --porcelain) ]] || fail "há alterações não commitadas. Faça o commit ou descarte-as antes do deploy."
[[ $(git remote get-url origin) == "$EXPECTED_ORIGIN" ]] || fail "o remote origin não aponta para $EXPECTED_ORIGIN."

git fetch origin main

read -r AHEAD BEHIND < <(git rev-list --left-right --count HEAD...origin/main)
[[ "$BEHIND" == "0" ]] || fail "a main local está desatualizada. Execute: git pull --ff-only origin main"
[[ "$AHEAD" == "0" ]] || fail "há commits locais ainda não publicados. Execute: git push origin main"

echo "OK: main limpa e sincronizada com origin/main"

echo
echo "[2/4] Executando build de produção..."

"$NG_BIN" build --configuration production --base-href /

[[ -f "$BUILD_DIR/index.html" ]] || fail "index.html não encontrado em $BUILD_DIR."
[[ -f "$BUILD_DIR/$PDF_PATH" ]] || fail "PDF não encontrado em $BUILD_DIR/$PDF_PATH."

echo
echo "[3/4] Publicando na branch gh-pages..."

"$NG_BIN" deploy \
  --no-build \
  --remote=origin \
  --branch=gh-pages \
  --cname="$DOMAIN" \
  --dir="$BUILD_DIR" \
  --message="deploy: publica $(git rev-parse --short HEAD)"

echo
echo "[4/4] Validando o conteúdo publicado..."

for ((attempt = 1; attempt <= MAX_ATTEMPTS; attempt++)); do
  cache_buster="$(date +%s)-$attempt"

  if curl --fail --location --silent --show-error \
    --connect-timeout 10 --max-time 30 \
    -H "Cache-Control: no-cache" \
    "$PRODUCTION_URL/?deploy=$cache_buster" \
    --output "$TEMP_DIR/index.html" && \
    curl --fail --location --silent --show-error \
      --connect-timeout 10 --max-time 30 \
      -H "Cache-Control: no-cache" \
      "$PRODUCTION_URL/$PDF_PATH?deploy=$cache_buster" \
      --output "$TEMP_DIR/curriculo.pdf" && \
    cmp --silent "$BUILD_DIR/index.html" "$TEMP_DIR/index.html" && \
    cmp --silent "$BUILD_DIR/$PDF_PATH" "$TEMP_DIR/curriculo.pdf"; then
    echo "OK: página e currículo correspondem ao build publicado em $PRODUCTION_URL/"
    echo
    echo "DEPLOY FINALIZADO COM SUCESSO"
    exit 0
  fi

  if ((attempt < MAX_ATTEMPTS)); then
    echo "Aguardando propagação... tentativa $attempt/$MAX_ATTEMPTS"
    sleep "$RETRY_INTERVAL"
  fi
done

fail "a produção não corresponde ao build local após $MAX_ATTEMPTS tentativas."
