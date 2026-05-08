# MERN User Management System

A full-stack **MERN (MongoDB, Express, React, Node.js)** application for user authentication and profile management.

This project demonstrates a complete authentication system including **user registration, login, JWT authentication, protected routes, and profile management**.

It follows a **proper full-stack structure with separated frontend and backend folders**.

---

# Features

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* User Profile Page
* Redux Toolkit State Management
* REST API Backend
* Middleware Authentication

---

# Tech Stack

### Frontend

* React
* Redux Toolkit
* React Router
* Axios
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt

### Database

* MongoDB

---

# Project Structure

mern-user-management

frontend

* src
* components
* pages
* redux
* services

backend

* controllers
* models
* routes
* middleware
* config

README.md

---

# Installation Guide

## 1. Clone the Repository

git clone https://github.com/harichandran8/mern-user-management.git

## 2. Go to the Project Folder

cd mern-user-management

---

# Install Dependencies

### Install Backend Packages

cd backend
npm install

### Install Frontend Packages

cd ../frontend
npm install

---

# Environment Variables Setup

Inside the **backend folder**, create a file named:

.env

Example configuration:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Replace these values with your own credentials.

---

# Running the Project

### Start Backend Server

cd backend
npm start

Backend will run on:

http://localhost:5000

### Start Frontend

Open another terminal:

cd frontend
npm start

Frontend will run on:

http://localhost:3000

---

# Authentication Flow

1. User registers using the registration form.
2. Password is hashed using bcrypt before storing in the database.
3. User logs in with email and password.
4. Backend verifies credentials.
5. Server generates a JWT token.
6. Token is sent to the frontend.
7. Frontend stores token in Redux state.
8. Protected routes verify the token using backend middleware.

---

# API Endpoints

### Authentication

POST /api/register
Register a new user

POST /api/login
Login user and return JWT token

### User

GET /api/profile
Get logged-in user profile (Protected Route)

---

# Concepts Used

* JWT Authentication
* REST API Development
* Redux Toolkit State Management
* React Protected Routes
* Express Middleware
* Password Hashing with bcrypt
* MongoDB Schema Design
* MVC Backend Structure

---

# Future Improvements

* Admin Panel
* Refresh Token Authentication
* Email Verification
* Password Reset System
* Role Based Access Control
* Docker Deployment

---

# .gitignore Setup

Make sure your project contains a `.gitignore` file.

Example:

node_modules
.env

This prevents sensitive information and dependencies from being pushed to GitHub.

---

# How Other Developers Can Run This Project

1. Clone the repository
2. Install backend dependencies
3. Install frontend dependencies
4. Create `.env` file inside backend folder
5. Add MongoDB connection string and JWT secret
6. Start backend server
7. Start frontend server

---

# Author

Harichandran

Full Stack MERN Developer 

---

# License

This project is open-source and available for learning and educational purposes.
