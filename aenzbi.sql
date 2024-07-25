-- aenzbi.sql

-- Create the database
CREATE DATABASE aenzbi;

-- Use the newly created database
USE aenzbi;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create invoices table
CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_name VARCHAR(255),
    seller_address VARCHAR(255),
    company_nif VARCHAR(50),
    legal_form VARCHAR(50),
    trade_register VARCHAR(50),
    seller_contact VARCHAR(50),
    vat_subjected VARCHAR(50),
    buyer_name VARCHAR(255),
    buyer_address VARCHAR(255),
    invoice_date DATE,
    items JSON
);

-- Create products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10, 2)
);

-- Create customers table
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    contact VARCHAR(50)
);

-- Create bills table
CREATE TABLE bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Insert default admin user
INSERT INTO users (username, password) VALUES ('admin', '');
-- aenzbi.sql

-- Create the database
CREATE DATABASE IF NOT EXISTS aenzbi;
USE aenzbi;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact VARCHAR(50) NOT NULL
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_name VARCHAR(255),
    seller_address VARCHAR(255),
    company_nif VARCHAR(50),
    legal_form VARCHAR(50),
    trade_register VARCHAR(50),
    seller_contact VARCHAR(50),
    vat_subjected VARCHAR(50),
    buyer_name VARCHAR(255),
    buyer_address VARCHAR(255),
    invoice_date DATE,
    items JSON
);

-- Create bills table
CREATE TABLE IF NOT EXISTS bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    amount DECIMAL(10, 2),
    date DATE,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10, 2),
    order_date DATE,
    status VARCHAR(50),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    amount DECIMAL(10, 2),
    method VARCHAR(50),
    date DATE,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Insert default admin user
INSERT INTO users (username, password) VALUES ('admin', '');

-- Sample data insertion
INSERT INTO products (name, quantity, price) VALUES 
('Product A', 100, 10.00),
('Product B', 150, 15.00),
('Product C', 200, 20.00);

INSERT INTO customers (name, address, contact) VALUES 
('John Doe', '123 Main St', '555-1234'),
('Jane Smith', '456 Elm St', '555-5678');

INSERT INTO invoices (seller_name, seller_address, company_nif, legal_form, trade_register, seller_contact, vat_subjected, buyer_name, buyer_address, invoice_date, items) VALUES 
('Acme Corp', '789 Oak St', 'NIF123456', 'LLC', 'TR12345', '555-8765', 'Yes', 'John Doe', '123 Main St', '2024-07-25', '[
    {"name": "Product A", "quantity": 2, "price": 10.00},
    {"name": "Product B", "quantity": 3, "price": 15.00}
]');

INSERT INTO bills (invoice_id, amount, date) VALUES (1, 75.00, '2024-07-25');
