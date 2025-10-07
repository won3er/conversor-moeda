# Conversor de Moedas (Web)

Uma aplicação web simples e responsiva para conversão de moedas fiduciárias e Bitcoin, com interface moderna e animação decorativa.

## Visão geral
- **Front-end puro**: HTML + CSS + JavaScript (sem build, sem frameworks).
- **Cotações fiat**: via Exchangerate API (par a par).
- **Cotações BTC**: via CoinGecko (fallback automático quando a conversão envolve BTC).
- **UI**: tema escuro com degradê, título destacado, botão com microinterações e animação SVG do lado esquerdo.

## Funcionalidades
- **Conversão entre moedas**: BRL, USD, EUR, GBP, ARS, CLP, JPY, CNY e BTC.
- **Conversão com BTC**:
  - BTC → moeda fiduciária (multiplica pelo preço do BTC na moeda destino).
  - Moeda fiduciária → BTC (divide pelo preço do BTC na moeda origem).
- **Validações**: evita valores inválidos; feedback de carregamento no botão.

## Estrutura do projeto
```
site test/
├─ index.html           # Página principal
├─ style.css            # Estilos (tema escuro, tipografia, botão, inputs)
├─ script.js            # Lógica de conversão e integração com APIs
└─ assets/
   └─ img/
      └─ animated-money.svg  # Animação SVG (moeda girando)
```

## Como executar localmente
- Opção 1 (simples): abra `index.html` diretamente no navegador (arraste e solte).
- Opção 2 (recomendado): use uma extensão como Live Server (porta já configurada em `.vscode/settings.json`).

## Uso
1. Selecione a **moeda de origem** e a **moeda de destino**.
2. Digite o **valor** a ser convertido.
3. Clique em **Converter**. O resultado aparece no campo “Valor convertido”.

## APIs
- Fiat (par a par): `https://v6.exchangerate-api.com/v6/<SUA_CHAVE>/pair/<FROM>/<TO>/<AMOUNT>`
- BTC: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=<moeda>`

Observações:
- Quando a conversão envolve BTC (origem ou destino), a app usa CoinGecko automaticamente.
- Para demais pares (fiat ↔ fiat), usa a Exchangerate API.

## Configuração
- Arquivo: `script.js`
  - `urlBase`: base da Exchangerate API
  - `accesKey`: chave de acesso

Caso altere as moedas suportadas, ajuste as `<option>` em `index.html` (`#moeda-origem` e `#moeda-destino`).

## Deploy
- Como é um site estático, você pode publicar facilmente no **GitHub Pages**, **Netlify**, **Vercel** ou qualquer servidor estático.
- Para GitHub Pages: suba os arquivos na branch `main` e ative Pages (root do projeto).

## Acessibilidade e UX
- Inputs e selects com foco visual discreto.
- Botão com estados de hover/active/disabled e foco sem borda (halo sutil).
- Título com alto contraste e barra decorativa.

## Roadmap (ideias futuras)
- Exibir a taxa usada (ex.: “1 BTC = X BRL”).
- Mostrar símbolos e nomes das moedas no resultado.
- Histórico recente de conversões.
- Suporte a mais criptomoedas.

## Licença
Defina uma licença (ex.: MIT) caso deseje abrir o projeto.
