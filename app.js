// UI Variables 
const loanForm = document.querySelector('#loan-form'),
    amount = document.querySelector('#amount'),
    interest = document.querySelector('#interest'),
    years = document.querySelector('#years'),
    monthlyPayment = document.querySelector('#monthly-payment'),
    totalPayment = document.querySelector('#total-payment'),
    totalInterest = document.querySelector('#total-interest'),
    card = document.querySelector('.card'),
    heading = document.querySelector('.heading'),
    loader = document.querySelector('#loading'),
    results = document.querySelector('#results');


const calculateResults = () => {

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
        // show results 
        results.style.display = 'block';
        // hide loader
        loader.style.display = 'none';

        // clear the inputs after a successful operation
        amount.value = '';
        interest.value = '';
        years.value = '';

    } else {
        errorMessage('All fields are required!');
    }
};

const errorMessage = (message) => {
    // Hide loader and results
    loader.style.display = 'none';
    results.style.display = 'none';

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

const loadEvent = () => {

};
loanForm.addEventListener('submit', (e) => {
    // show loader 
    loader.style.display = 'block';
    // Hide results
    results.style.display = 'none';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});