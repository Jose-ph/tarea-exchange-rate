
//Using https://exchangerate.host/#/docs
//const API_KEY = ""
/* const $form = document.querySelector('#form'); */

const $btnConsult = document.querySelector('#btn-consult')

  
  handleSymbols();

$btnConsult.onclick= function(e) {

    const $title = document.querySelector('#title');
    const $date = document.querySelector('#date').value;
    const $form = document.querySelector('#form');
    
    let userBase = $form.currency.value
    console.log(userBase)
    console.log($date)

     getExchangeByBaseAndDate(userBase,$date)
     

    e.preventDefault();
    
}


function getExchangeByBaseAndDate(base,date){

 

   fetch(`https://api.exchangerate.host/${date}?base=${base}`)
  .then(response => response.json())

  .then(response => {

    console.log(response)
    console.log(response.rates)
    
    handleRates(response.rates)

  })



  .catch(error => console.error("There was a problem", error));



}


function handleRates(rates){


  const $ratesContainer = document.querySelector('#rates-container');
  const $rates= document.querySelector('#rates');

  let ratesKeys = Object.keys(rates)

  ratesKeys.forEach(key => {

    let newLi = document.createElement('li')
    newLi.textContent = `${key} : ${rates[key]}`

    $ratesContainer.appendChild(newLi)
    
    
  });





}


function handleSymbols(){  

    fetch(`https://api.exchangerate.host/symbols`)
  .then(response => response.json())

  .then(response => {
    /* Objeto de la forma
      Objeto{ ARS:{description: "Peso argentino"}, code:"ARS"}
    
    */
    console.log(response.symbols) 
    let symbols = response.symbols
    setSymbols(symbols)

  })



  .catch(error => console.error("There was a problem", error));


    
}




function setSymbols (symbols){

    let $select = document.querySelector('#select')

    /* Objeto de la forma
      Objeto{ ARS:{description: "Peso argentino"}, code:"ARS"}
    
    */

    let supportedCodes = symbols // un array [] con dos posiciones
    
    let currenciesKeys = Object.keys(supportedCodes)
  
    currenciesKeys.forEach(key => { 

        createOptions(supportedCodes,key,$select)

    });



}


function createOptions(symbols,key,parent){



  let newOption = document.createElement('option')
  newOption.setAttribute('value',`${key}`)
  newOption.textContent = `${key} - ${symbols[key].description}`


 parent.appendChild(newOption) 


}