//Cotações de moedas.
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

//obtendo os elementos do formulário
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')
const footer = document.querySelector('main footer')
const description = document.getElementById('description')
const result = document.getElementById('result')

//manipulando o input amount para receber somente números
amount.addEventListener('input', () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, '')
})

//capturando evento de submit(enviar) do formulario
form.onsubmit = event => {
  event.preventDefault()

  switch (currency.value) {
    case 'USD':
      convertCurrency(amount.value, USD, 'US$')
      break
    case 'EUR':
      convertCurrency(amount.value, EUR, '€')
      break
    case 'GBP':
      convertCurrency(amount.value, GBP, '£')
      break
  }
}

//função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
    //calcula o total
    let total = amount * price

    if (isNaN(total)) {
      return alert('Por favor, digite o valor corretamente para converter.')
    }

    //Formatar o valor total para exibir em real com virgula
    total = formatCurrencyBRL(total).replace('R$', '')
    //exibir o resultado total
    result.textContent = `${total} Reais`

    //Aplica a class que exibe o footer para mostrar o resultado.
    footer.classList.add('show-result')
  } catch (error) {
    console.log(error)
    //remove a classe do footer removendo ele da tela
    footer.classList.remove('show-result')
    alert('Não foi possível converter. Tente novamente mais tarde.')
  }
}

//Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
  //converte para numero para utilizar o toLocalstring para formatar o padrão BRL
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
