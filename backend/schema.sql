CREATE DATABASE IF NOT EXISTS military_asset_db;
   USE military_asset_db;

   CREATE TABLE IF NOT EXISTS users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(50) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     role ENUM('Admin', 'Base Commander', 'Logistics Officer') NOT NULL,
     base VARCHAR(50)
   );

   CREATE TABLE IF NOT EXISTS assets (
     id INT AUTO_INCREMENT PRIMARY KEY,
     base VARCHAR(50) NOT NULL,
     equipmentType VARCHAR(50) NOT NULL,
     openingBalance INT NOT NULL,
     purchases INT DEFAULT 0,
     transfersIn INT DEFAULT 0,
     transfersOut INT DEFAULT 0,
     assigned INT DEFAULT 0,
     expended INT DEFAULT 0,
     date DATE NOT NULL
   );

   CREATE TABLE IF NOT EXISTS purchases (
     id INT AUTO_INCREMENT PRIMARY KEY,
     base VARCHAR(50) NOT NULL,
     equipmentType VARCHAR(50) NOT NULL,
     quantity INT NOT NULL,
     date DATETIME NOT NULL
   );

   CREATE TABLE IF NOT EXISTS transfers (
     id INT AUTO_INCREMENT PRIMARY KEY,
     fromBase VARCHAR(50) NOT NULL,
     toBase VARCHAR(50),
     equipmentType VARCHAR(50) NOT NULL,
     quantity INT NOT NULL,
     date DATETIME NOT NULL,
     type ENUM('in', 'out') NOT NULL
   );

   CREATE TABLE IF NOT EXISTS assignments (
     id INT AUTO_INCREMENT PRIMARY KEY,
     base VARCHAR(50) NOT NULL,
     personnel VARCHAR(100) NOT NULL,
     equipmentType VARCHAR(50) NOT NULL,
     quantity INT NOT NULL,
     date DATETIME NOT NULL,
     status ENUM('assigned', 'expended') NOT NULL
   );