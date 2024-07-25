document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateInvoice();
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
            vatSubjected: document.getElementById('vatSubjected').value,
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

async function listInvoices() {
    const response = await fetch('/listInvoices');
    const invoices = await response.json();
    alert('Invoices: ' + JSON.stringify(invoices, null, 2));
}

function listProducts() {
    fetch('/listProducts')
        .then(response => response.json())
        .then(products => {
            alert('Products: ' + JSON.stringify(products, null, 2));
        })
        .catch(error => console.error('Error:', error));
}

function listCustomers() {
    fetch('/listCustomers
