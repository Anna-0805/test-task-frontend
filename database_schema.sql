CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    description TEXT
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serialNumber INT NOT NULL,
    isNew BOOLEAN NOT NULL DEFAULT 1,
    photo VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    specification TEXT,
    guarantee_start DATETIME,
    guarantee_end DATETIME,
    price_usd DECIMAL(10,2),
    price_uah DECIMAL(10,2),
    `order` INT NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);