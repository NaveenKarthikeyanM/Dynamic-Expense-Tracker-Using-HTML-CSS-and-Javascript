const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseDateInput = document.getElementById('expense-date');
const expenseTableBody = document.querySelector('#expense-table tbody');
const totalAmountSpan = document.getElementById('total-amount');

function formatCurrency(amount) {
    return amount.toFixed(2);
}

function updateTotalAmount() {
    let total = 0;
    document.querySelectorAll('#expense-table tbody tr').forEach(row => {
        const amount = parseFloat(row.querySelector('.amount').textContent);
        total += amount;
    });
    totalAmountSpan.textContent = formatCurrency(total);
}

function removeExpense(event) {
    const row = event.target.closest('tr');
    row.remove();
    updateTotalAmount();
}

function addExpense(event) {
    event.preventDefault();

    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = parseFloat(expenseAmountInput.value);
    const expenseCategory = expenseCategorySelect.value;
    const expenseDate = expenseDateInput.value;

    if (!expenseName || isNaN(expenseAmount) || !expenseCategory || !expenseDate) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${expenseName}</td>
        <td class="amount">${formatCurrency(expenseAmount)}</td>
        <td>${expenseCategory}</td>
        <td>${expenseDate}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    newRow.querySelector('.delete-btn').addEventListener('click', removeExpense);

    expenseTableBody.appendChild(newRow);

    
    updateTotalAmount();

    
    expenseForm.reset();
}

expenseForm.addEventListener('submit', addExpense);