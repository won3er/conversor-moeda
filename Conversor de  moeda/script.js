const urlBase = 'https://v6.exchangerate-api.com/v6';
const accesKey = '8c7a92d866f35e8051bd9bca';

const btn = document.getElementById('converter');
const resultInput = document.getElementById('result');

btn.addEventListener('click', async function () {
  try {
    const moedaOrigem = document.getElementById('moeda-origem').value;
    const moedaDestino = document.getElementById('moeda-destino').value;
    const valorStr = document.getElementById('valor').value;
    const valor = parseFloat(valorStr.replace(',', '.'));

    // validações básicas
    if (isNaN(valor) || valor < 0) {
      resultInput.value = 'Informe um valor válido';
      return;
    }

    // caso mesma moeda
    if (moedaOrigem === moedaDestino) {
      resultInput.value = valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
      return;
    }

    // feedback de carregamento
    const prevText = btn.innerText;
    btn.disabled = true;
    btn.innerText = 'Convertendo...';

    let converted;

    if (moedaOrigem === 'BTC' || moedaDestino === 'BTC') {
      // Conversão envolvendo BTC usando CoinGecko
      const vsCurr = (moedaOrigem === 'BTC') ? moedaDestino : moedaOrigem; // moeda fiduciária
      const urlCg = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${vsCurr.toLowerCase()}`;
      const resCg = await fetch(urlCg);
      if (!resCg.ok) throw new Error('Falha na requisição (CoinGecko)');
      const dataCg = await resCg.json();
      const price = dataCg?.bitcoin?.[vsCurr.toLowerCase()];
      if (!price) throw new Error('Preço BTC indisponível para a moeda selecionada');

      // Se origem é BTC, multiplica pelo preço; se destino é BTC, divide pelo preço
      converted = (moedaOrigem === 'BTC') ? (valor * price) : (valor / price);

      const isDestBTC = (moedaDestino === 'BTC');
      resultInput.value = Number(converted).toLocaleString('pt-BR', {
        minimumFractionDigits: isDestBTC ? 6 : 2,
        maximumFractionDigits: isDestBTC ? 10 : 6,
      });
      console.log('Conversão (BTC via CoinGecko):', converted);
    } else {
      // Demais pares via Exchangerate API
      const url = `${urlBase}/${accesKey}/pair/${moedaOrigem}/${moedaDestino}/${valor}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Falha na requisição');
      const json = await res.json();

      if (json && json.conversion_result != null) {
        converted = json.conversion_result;
        resultInput.value = Number(converted).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        });
        console.log('Conversão:', converted);
      } else {
        resultInput.value = 'Erro ao converter';
        console.error('Resposta inesperada da API:', json);
      }
    }

    btn.disabled = false;
    btn.innerText = prevText;
  } catch (e) {
    console.error(e);
    resultInput.value = 'Erro na conversão';
    btn.disabled = false;
    btn.innerText = 'Converter';
  }
});