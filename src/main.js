
const API_KEY = "90697dc549999b99dacdb507dc685f0f"
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

    getLatestExchange(userBase,$date)
    
    e.preventDefault();
    
}


function getLatestExchange(base,date){


    /* fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=90697dc549999b99dacdb507dc685f0f&base=${base}`) */
   /* fetch(`http://api.exchangeratesapi.io/v1/${date}?access_key=90697dc549999b99dacdb507dc685f0f&base=${base}`) */
   /* 
    */
   fetch(`http://api.exchangeratesapi.io/v1/${date}?access_key=${API_KEY}&symbols=USD,AUD,CAD,PLN,MXN&format=1`)
  .then(response => response.json())

  .then(response => {

    console.log(response)
    //setSymbols(response.symbols)

  })



  .catch(error => console.error("There was a problem", error));




}



function handleSymbols(){  //En la API se llaman symbols a  las bases
    
    //esta función obtendrá las bases disponibles de la api
    //luego se utilizará esta información para completar el select

    fetch(`http://api.exchangeratesapi.io/v1/symbols?access_key=90697dc549999b99dacdb507dc685f0f`)
  .then(response => response.json())

  .then(response => {

    //console.log(response.symbols)
    setSymbols(response.symbols)

  })



  .catch(error => console.error("There was a problem", error));


    
}




function setSymbols (symbols){

    let $select = document.querySelector('#select')

    let keys = Object.keys(symbols)
    let values = Object.values(symbols)

    keys.forEach((key,i) => {

        let newOption = document.createElement('option')
       /*  <option value="USD">Euro</option>   */
       newOption.setAttribute('value',`${key}`)
       newOption.textContent = `${values[i]}`

     
       $select.appendChild(newOption)


        
    });

   

        
        
        
    




}