// UI Variables 
const loanForm = document.querySelector('#loan-form');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');


const calculateRessults = (e) => {

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const k = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * k * calculatedInterest) / (k - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {

        errorMessage('All fields are required!');
    }

    e.preventDefault();
};

const errorMessage = (message) => {
    // Create a div element, add a class name and append a text node to the div
    const div = document.createElement('div');
    div.className = 'alert alert-danger';
    div.appendChild(document.createTextNode(message));

    // insert error above heading
    card.insertBefore(div, heading);

    //Clear error message after 3 seconds 
    setTimeout(clearMessage, 3000);
};

const clearMessage = () => {
    document.querySelector('.alert').remove();
};


loanForm.addEventListener('submit', calculateRessults);