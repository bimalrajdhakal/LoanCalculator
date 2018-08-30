// Listen for submit event 

document.getElementById('loan-form').addEventListener('submit',function(e){
  // Hide Results
   document.getElementById('results').style.display ='none';
  // Show Loader 
  document.getElementById('loading').style.display ='block';

  setTimeout(calculateResults,2000);
  
  e.preventDefault();
});

// Calculate Results function 
function calculateResults(){
  // UI Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) /100 /12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    // Show Results
    document.getElementById('results').style.display ='block';

    // Hide Loader
    document.getElementById('loading').style.display ='none';
  }else{
    showErrors('Please Check Your Number Inputs');
  }
}

// show error function 
function showErrors(errorMsg){
  // Hide Results
  document.getElementById('results').style.display ='none';
  // Hide Loader
  document.getElementById('loading').style.display ='none';
// create a div 
const errorDiv = document.createElement('div');

// Get elements
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');

// Add class
errorDiv.className = 'alert alert-danger';
// create text node and append to div 

errorDiv.appendChild(document.createTextNode(errorMsg));

// insert error message above heading 
card.insertBefore(errorDiv,heading);

// clear error message after 3 second

setTimeout(clearErrorMsg,3000);

}

// clear error message function 

function clearErrorMsg(){
  document.querySelector('.alert').remove();
}