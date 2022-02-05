//Using https://exchangerate.host/#/docs
//const API_KEY = ""
/* const $form = document.querySelector('#form'); */

const $btnConsult = document.querySelector("#btn-consult");

const $newConsultbtn = document.querySelector("#reset");

handleSymbols();

$btnConsult.onclick = function (e) {
  deletePreviousRates();

  const $title = document.querySelector("#title");
  const $date = document.querySelector("#date").value;
  const $form = document.querySelector("#form");

  let userBase = $form.currency.value;

  getExchangeByBaseAndDate(userBase, $date);
  const $exchangeTitle = document.querySelector("#rates-container h2");
  $exchangeTitle.textContent = `Tipo de cambio con base ${userBase}:`;

  e.preventDefault();
};

$newConsultbtn.onclick = reset;

function getExchangeByBaseAndDate(base, date) {
  fetch(`https://api.exchangerate.host/${date}?base=${base}`)
    .then((response) => response.json())

    .then((response) => {
      handleRates(response.rates);
    })

    .catch((error) => console.error("There was a problem", error));
}

function handleRates(rates) {
  const $form = document.querySelector("#form");
  const $ratesContainer = document.querySelector("#rates-container");
  const $rates = document.querySelector("#rates");
  const $title = document.querySelector("#title");

  let ratesKeys = Object.keys(rates);

  ratesKeys.forEach((key) => {
    let newLi = document.createElement("li");
    newLi.textContent = `${key} : ${rates[key]}`;

    $rates.appendChild(newLi);
    //$ratesContainer.appendChild(newLi)
  });

  $form.classList.add("d-none");
  $title.classList.add("d-none");
  $ratesContainer.classList.remove("d-none");
}

function handleSymbols() {
  fetch(`https://api.exchangerate.host/symbols`)
    .then((response) => response.json())

    .then((response) => {
      /* Objeto de la forma
      Objeto{ ARS:{description: "Peso argentino"}, code:"ARS"}
    
    */
      console.log(response.symbols);
      let symbols = response.symbols;
      setSymbols(symbols);
    })

    .catch((error) => console.error("There was a problem", error));
}

function setSymbols(symbols) {
  let $select = document.querySelector("#select");

  /* Objeto de la forma
      Objeto{ ARS:{description: "Peso argentino"}, code:"ARS"}
    
    */

  let supportedCodes = symbols; // un array [] con dos posiciones

  let currenciesKeys = Object.keys(supportedCodes);

  currenciesKeys.forEach((key) => {
    createOptions(supportedCodes, key, $select);
  });
}

function createOptions(symbols, key, parent) {
  let newOption = document.createElement("option");
  newOption.setAttribute("value", `${key}`);
  newOption.textContent = `${key} - ${symbols[key].description}`;

  parent.appendChild(newOption);
}

function deletePreviousRates() {
  let ratesDisplay = document.querySelectorAll("li");

  ratesDisplay.forEach((rate) => {
    rate.remove();
  });
}

function reset() {
  const $form = document.querySelector("#form");
  const $title = document.querySelector("#title");
  const $ratesContainer = document.querySelector("#rates-container");

  $form.classList.remove("d-none");
  $title.classList.remove("d-none");
  $ratesContainer.classList.add("d-none");
}

//Validar formulario y estilos de error
//test con cypress
