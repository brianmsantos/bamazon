DROP DATABASE if exists bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER(100) AUTO_INCREMENT,    
    product_name VARCHAR(100),
    department_name VARCHAR(100), 
    price INTEGER(100),
    stock_quantity INTEGER(100),
    primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Xbox One", "Gaming", 300, 100),
("PS4", "Gaming", 350, 80),
("Echo Dot", "Electronics", 40, 300),
("USB Flash Drive", "Electronics", 20, 40),
("Shower Mirror", "Household", 15, 30),
("Hairbrush","Household", 10, 20),
("Sunglasses", "Fashion", 60, 50),
("Wallet", "Fashion", 75, 20),
("Beef Jerky", "Food", 15, 100),
("Moon Cheese", "Food", 10, 95);

