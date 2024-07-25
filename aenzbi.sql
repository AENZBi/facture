-- Create database
CREATE DATABASE IF NOT EXISTS aenzbi;
USE aenzbi;

-- Create table for invoices
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_name VARCHAR(255),
    seller_address TEXT,
    company_nif VARCHAR(50),
    legal_form VARCHAR(100),
    trade_register VARCHAR(100),
    seller_contact VARCHAR(100),
    vat_subjected BOOLEAN,
    buyer_name VARCHAR(255),
    buyer_address TEXT,
    date DATE,
    items JSON
);

-- Create table for payments
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    amount DECIMAL(10, 2),
    method VARCHAR(50),
    date DATE,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- Create table for products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    stock INT
);

-- Create table for customers
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address TEXT
);
