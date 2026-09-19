#!/bin/bash

set -e

DOMAIN="alexandre-esteves.com.br"

echo "======================================"
echo "DEPLOY PRODUÇÃO"
echo "======================================"

echo
echo "[1/4] Validando branch..."

BRANCH=$(git branch --show-current)

if [ "$BRANCH" != "main" ]; then
  echo "ERRO: execute o deploy a partir da branch main."
  exit 1
fi

echo "OK: branch main"

echo
echo "[2/4] Atualizando main..."

git pull --ff-only origin main

echo
echo "[3/4] Executando build e deploy..."

npx ng deploy \
  --branch=gh-pages \
  --cname="$DOMAIN" \
  --build-target=alexandre-page:build:production \
  --dir=dist/alexandre-page/browser

echo
echo "[4/4] Validando produção..."

sleep 10

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/")

if [ "$STATUS" = "200" ]; then
  echo "OK: https://$DOMAIN/ respondeu HTTP 200"
else
  echo "ATENÇÃO: site respondeu HTTP $STATUS"
fi

echo
echo "DEPLOY FINALIZADO"
