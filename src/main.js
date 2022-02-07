//Using https://exchangerate.host/#/docs

const $btnConsult = document.querySelector("#btn-consult");

const $newConsultbtn = document.querySelector("#reset");

handleSymbols();

$btnConsult.onclick = validateForm;

function validateForm(e) {
  deletePreviousRates();
  const $form = document.querySelector("#form");
  const $title = document.querySelector("#title");
  const $date = document.querySelector("#date").value;

  if (isValidDate($date)) {
    let date = document.querySelector("#date");
    date.classList.remove("alert");
    date.classList.remove("alert-danger");
    let userBase = $form.currency.value;

    getExchangeByBaseAndDate(userBase, $date);
    const $exchangeTitle = document.querySelector("#rates-container h2");
    $exchangeTitle.textContent = `Tipo de cambio con base ${userBase}:`;
  }

  if (!isValidDate($date)) {
    let date = document.querySelector("#date");
    let dateInfo = document.querySelector("#date-info");

    date.classList.add("alert");
    date.classList.add("alert-danger");
    dateInfo.textContent = "La fecha ingresada no es válida";
  }

  e.preventDefault();
}

$newConsultbtn.onclick = reset;

function getExchangeByBaseAndDate(base, date) {
  fetch(`https://api.exchangerate.host/${date}?base=${base}`)
    .then((response) => response.json())

    .then((response) => {
      handleRates(response.rates);
    })

    .catch((error) =>{

      console.error("There was a problem", error)


     } );
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
  });

  $form.classList.add("d-none");
  $title.classList.add("d-none");
  $ratesContainer.classList.remove("d-none");
}

function handleSymbols() {
  fetch(`https://api.exchangerate.host/symbols`)
    .then((response) => response.json())

    .then((response) => {
      let symbols = response.symbols;
      setSymbols(symbols);
    })

    .catch((error) => console.error("There was a problem", error));
}

function setSymbols(symbols) {
  let $select = document.querySelector("#select");

  let supportedCodes = symbols;

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
  let dateInfo = document.querySelector("#date-info");

  $form.classList.remove("d-none");
  $title.classList.remove("d-none");
  $ratesContainer.classList.add("d-none");
  dateInfo.textContent = "No compartiremos tu información con nadie";
}

//From stackoverflow  https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
function isValidDate(dateString) {
  let $today = new Date();

  let $day = $today.getDate();

  let $month = $today.getMonth() + 1;
  let $year = $today.getFullYear();

  // First check for the pattern
  var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

  if (!regex_date.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  var parts = dateString.split("-");
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  if (
    year < 1999 ||
    year > $year ||
    month == 0 ||
    month > 12 ||
    (year == $year && month > $month) ||
    (year == $year && month == $month && day > $day)
  ) {
    return false;
  }

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}
