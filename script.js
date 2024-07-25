document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('invoiceForm').addEventListener('submit', function(event) {
        event.preventDefault();
        generateInvoice();
    });

    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        processPayment();
    });

    document.getElementById('fetchPayments').addEventListener('click', function() {
        getPayments();
    });

    // Add button click event listeners for listing products and customers
    document.getElementById('listProducts').addEventListener('click', listProducts);
    document.getElementById('listCustomers').addEventListener('click', listCustomers);
});

function addItem() {
    const itemsDiv = document.getElementById('items');
    const newItem = document.createElement('div');
    newItem.innerHTML = `
        <label>Item Name:</label>
        <input type="text" class="itemName" required>
        <label>Quantity:</label>
        <input type="number" class="itemQuantity" required>
        <label>Price:</label>
        <input type="number" class="itemPrice" required>
        <br>
    `;
    itemsDiv.appendChild(newItem);
}

async function generateInvoice() {
    const invoice = {
        seller: {
            name: document.getElementById('sellerName').value,
            address: document.getElementById('sellerAddress').value,
            companyNIF: document.getElementById('companyNIF').value,
            legalForm: document.getElementById('legalForm').value,
            tradeRegister: document.getElementById('tradeRegister').value,
            contact: document.getElementById('sellerContact').value,
            vatSubjected: document.getElementById('vatSubjected').value === 'true',
        },
        buyer: {
            name: document.getElementById('buyerName').value,
            address: document.getElementById('buyerAddress').value,
        },
        date: document.getElementById('invoiceDate').value,
        items: []
    };

    const itemNames = document.getElementsByClassName('itemName');
    const itemQuantities = document.getElementsByClassName('itemQuantity');
    const itemPrices = document.getElementsByClassName('itemPrice');

    for (let i = 0; i < itemNames.length; i++) {
        invoice.items.push({
            name: itemNames[i].value,
            quantity: itemQuantities[i].value,
            price: itemPrices[i].value
        });
    }

    const response = await fetch('/generateInvoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice)
    });

    if (response.ok) {
        alert('Invoice generated and saved!');
    } else {
        alert('Error generating invoice.');
    }
}

async function processPayment() {
    const payment = {
        invoiceId: document.getElementById('paymentInvoiceId').value,
        amount: parseFloat(document.getElementById('paymentAmount').value),
        method: document.getElementById('paymentMethod').value,
        date: document.getElementById('paymentDate').value
    };

    const response = await fetch('/processPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
    });

    if (response.ok) {
        alert('Payment processed successfully!');
        getPayments();
    } else {
        alert('Error processing payment.');
    }
}

async function getPayments() {
    const response = await fetch('/listPayments');
    const payments = await response.json();
    const paymentsList = document.getElementById('paymentsList');
    paymentsList.innerHTML = '';
    payments.forEach(payment => {
        const paymentItem = document.createElement('li');
        paymentItem.textContent = `Payment ID: ${payment.id}, Invoice ID: ${payment.invoice_id}, Amount: ${payment.amount}, Method: ${payment.method}, Date: ${payment.date}`;
        paymentsList.appendChild(paymentItem);
    });
}

async function listInvoices() {
    const response = await fetch('/listInvoices');
    const invoices = await response.json();
    alert('Invoices: ' + JSON.stringify(invoices, null, 2));
}

async function listProducts() {
    const response = await fetch('/listProducts');
    const products = await response.json();
    alert('Products: ' + JSON.stringify(products, null, 2));
}

async function listCustomers() {
    const response = await fetch('/listCustomers');
