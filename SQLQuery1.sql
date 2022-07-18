--CREATE DATABASE BankingSystem
--USE BankingSystem

CREATE TABLE Registration(ID INT IDENTITY(1,1) PRIMARY KEY, AadharNo BIGINT, PanCard VARCHAR(10), EmpID INT, EmpName VARCHAR(100),
Gender VARCHAR(20), DOB VARCHAR(100), AccountType VARCHAR(100) DEFAULT('Salary'),PhoneNo VARCHAR(100), EmailID VARCHAR(100),
Address VARCHAR(200), Password VARCHAR(100), InitialAmount DECIMAL(18,2) DEFAULT(10000), IsActive INT)

CREATE TABLE TransactionHistory(ID INT IDENTITY(1,1) PRIMARY KEY, FromAccount VARCHAR(100), ToAccount VARCHAR(100), 
Amount DECIMAL(18,2), TransactionDate DateTime) 

SELECT * FROM Registration;

SELECT * FROM TransactionHistory;



