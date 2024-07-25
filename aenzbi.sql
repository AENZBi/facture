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
