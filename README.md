# Cloth Trailer Management System

## Setup Instructions

1. Create a MySQL database named `cloth_trailer`
2. Run these SQL commands to create tables:

```sql
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    address TEXT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE measurements (
    measurement_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    garment_type ENUM('shirt', 'pant', 'blazer', 'sherwani') NOT NULL,
    measurement_name VARCHAR(50) NOT NULL,
    measurement_value VARCHAR(20) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
