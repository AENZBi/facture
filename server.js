// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername', // Update with your MySQL username
    password: 'yourPassword', // Update with your MySQL password
    database: 'aenzbi'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/generateInvoice', (req, res) => {
    const { seller, buyer, date, items } = req.body;
    const sql = `INSERT INTO invoices (seller_name, seller_address, company_nif, legal_form, trade_register, seller_contact, vat_subjected, buyer_name, buyer_address, invoice_date, items) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [seller.name, seller.address, seller.companyNIF, seller.legalForm, seller.tradeRegister, seller.contact, seller.vatSubjected, buyer.name, buyer.address, date, JSON.stringify(items)];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error generating invoice.');
        } else {
            res.send('Invoice generated and saved!');
        }
    });
});

app.get('/listInvoices', (req, res) => {
    const sql = 'SELECT * FROM invoices';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving invoices.');
        } else {
            res.json(results);
        }
    });
});

app.post('/processPayment', (req, res) => {
    const { invoiceId, amount, method, date } = req.body;
    const sql = `INSERT INTO payments (invoice_id, amount, method, date) VALUES (?, ?, ?, ?)`;
    const values = [invoiceId, amount, method, date];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error processing payment.');
        } else {
            res.send('Payment processed successfully!');
        }
    });
});

app.get('/listPayments', (req, res) => {
    const sql = 'SELECT * FROM payments';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving payments.');
        } else {
            res.json(results);
        }
    });
});

// More endpoints for listProducts, listCustomers, etc.

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
