function validateCreditCard() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expMonth = document.getElementById('expMonth').value;
    const expYear = document.getElementById('expYear').value;

    // Basic input validation
    if (!cardNumber.trim() || !expMonth.trim() || !expYear.trim()) {
        document.getElementById('result').innerHTML = 'Please fill in all fields';
        return;
    }

    // Show loading indicator
    document.getElementById('result').innerHTML = 'Validating...';

    const data = {
        card_number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear
    };

    // Disable button during request
    document.getElementById('validateButton').disabled = true;

    fetch('https://plum-line-production.up.railway.app/', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        // Re-enable button
        document.getElementById('validateButton').disabled = false;
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        document.getElementById('result').innerHTML = result.valid ? 'Card is valid' : 'Card is invalid';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'Error validating credit card. Please try again.';
    });
}

document.getElementById('validateButton').addEventListener('click', function (e) {
    e.preventDefault(); 
    validateCreditCard();
});
