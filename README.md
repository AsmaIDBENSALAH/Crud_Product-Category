# Product and Category Management System

## Description

This project is a web application for managing products and their categories. 
It allows users to perform CRUD (Create, Read, Update, Delete) operations on products and categories. 
The application is built using **ReactJS** for the frontend and **Spring Boot** with **MySQL** for the backend.

## Application Screenshots
![image](https://github.com/user-attachments/assets/f1c481ad-0aa3-448c-848c-e72a8ff5dcb9)


## Features

- User-friendly interface for managing products and categories.
- CRUD operations for both products and categories.
- Home page with an overview of the application and navigation links.
- Data persistence using MySQL database.
- RESTful API for seamless communication between frontend and backend.

## Technologies Used
    
    ### Frontend
    - ReactJS: For building the user interface.
    - Axios: For making HTTP requests to the backend API.
    - Bootstrap CSS: For styling the application.
    - React Router: For navigation between different views.
    
    ### Backend
    - Spring Boot: For building the RESTful API.
    - MySQL: For the database management system.
    - JPA/Hibernate: For interacting with the database.
    - Maven: For dependency management.
    
   

### Prerequisites

  - JDK 11 or higher
  - Node.js (version 14 or higher)
  - MySQL server
  - Maven

### Setup


    1. **Backend**
       - Create the MySQL database:
         CREATE DATABASE product;
         
       - Configure your database in `src/main/resources/application.properties`:
         spring.datasource.url=jdbc:mysql://localhost:3306/product
         spring.datasource.username=your_username
         spring.datasource.password=your_password
         
       - Build and run the Spring Boot application:
         mvn spring-boot:run
    
    2. **Frontend**
       - Navigate to the frontend directory:
         cd frontend
         
       - Install dependencies and start the React application:
         npm install
         npm start
         

### Usage

  - Access the application in your browser at `http://localhost:3000/Home`.
  - The **Home Page** provides an overview of the application and links to navigate to the product and category management sections.
  - Use the interface to add, edit, or delete products and categories.
