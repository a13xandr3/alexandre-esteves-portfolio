# Alexandre Page

Página pessoal de Alexandre Esteves, desenvolvida com Angular 20 e Angular Material. O projeto usa componentes standalone, controle de fluxo nativo, Signals e detecção de mudanças `OnPush`.

## Executar

Requisitos: Node.js 20.19+, 22.12+ ou 24+ e npm 10+.

```bash
npm install
npm start
```

Acesse `http://localhost:4200`.

## Validar e gerar produção

```bash
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
```

Os arquivos otimizados serão criados em `dist/alexandre-page/browser`.

## Decisões de interface

- **Angular Material:** integração direta com Angular, componentes acessíveis e suporte oficial a temas. Usado seletivamente para preservar a identidade editorial.
- **Tipografia:** Manrope para leitura e Source Serif 4 para títulos, ambas do Google Fonts.
- **Paleta:** azul-noite para autoridade, azul moderado como acento e superfícies azul-claro/cinza para reduzir luminosidade agressiva. Texto e foco foram definidos para WCAG 2.2 AA.
- **Responsividade:** layout fluido para desktop, tablet e celular; menu compacto abaixo de 900 px e tipografia com `clamp()`.
- **Acessibilidade:** HTML semântico, link de salto, foco visível, nomes acessíveis, links externos seguros e suporte a movimento reduzido.

## Estrutura

```text
src/app/
├── portfolio/
│   ├── portfolio.component.ts
│   ├── portfolio.component.html
│   └── portfolio.component.scss
├── app.ts
├── app.html
└── app.config.ts
```

O conteúdo profissional fica em `portfolio.component.ts`; a estrutura semântica, em `portfolio.component.html`; e o sistema visual, em `portfolio.component.scss` e `src/styles.scss`.

## Referências técnicas

- Angular: https://angular.dev/
- Angular Material: https://material.angular.dev/
- Google Fonts: https://fonts.google.com/
- WCAG 2.2: https://www.w3.org/WAI/WCAG22/quickref/
