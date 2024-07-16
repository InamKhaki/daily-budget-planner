document.getElementById('calculate-budget').addEventListener('click', function() {
    const totalBudget = parseFloat(document.getElementById('total-budget').value);
    const numDays = parseInt(document.getElementById('num-days').value);
    const miscCharges = parseFloat(document.getElementById('misc-charges').value);
    
    const availableBudget = totalBudget - miscCharges;
    const dailyBudget = availableBudget / numDays;
    
    document.getElementById('daily-budget').textContent = `Daily Budget: ${dailyBudget.toFixed(2)}`;
    
    const expensesContainer = document.getElementById('expenses-container');
    expensesContainer.innerHTML = ''; // Clear previous inputs

    for (let i = 0; i < numDays; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        
        const label = document.createElement('label');
        label.textContent = `Day ${i + 1} Expense:`;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.classList.add('daily-expense');
        
        const warning = document.createElement('span');
        warning.classList.add('warning');
        
        input.addEventListener('input', function() {
            const expense = parseFloat(input.value);
            if (expense > dailyBudget) {
                warning.textContent = 'Warning: Out of budget!';
            } else {
                warning.textContent = '';
            }
            updateSavings(dailyBudget, numDays);
        });

        dayDiv.appendChild(label);
        dayDiv.appendChild(input);
        dayDiv.appendChild(warning);
        expensesContainer.appendChild(dayDiv);
    }
});

function updateSavings(dailyBudget, numDays) {
    const expenses = document.querySelectorAll('.daily-expense');
    let savings = 0;
    
    expenses.forEach(input => {
        const expense = parseFloat(input.value) || 0;
        if (expense < dailyBudget) {
            savings += dailyBudget - expense;
        }
    });
    
    document.getElementById('total-savings').textContent = `Total Savings: ${savings.toFixed(2)}`;
}
