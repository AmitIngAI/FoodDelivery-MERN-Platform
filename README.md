<div align="center">

# 🍕 FoodDelivery Pro - MERN Platform

### Full-Stack Food Delivery System with Multi-Role Architecture

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**[Live Demo](#)**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Multi-Role System](#-multi-role-system)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**FoodDelivery Pro** is a production-ready, full-stack food delivery platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js). Designed for real-world use cases, it features a sophisticated multi-role system supporting **Customers**, **Restaurants**, and **Delivery Partners** with distinct dashboards and workflows.

### 🎯 Problem Statement

Traditional food delivery platforms struggle with:
- ❌ Complex role management
- ❌ Poor real-time order tracking
- ❌ Inefficient restaurant-customer-delivery coordination
- ❌ Limited scalability
- ❌ Security vulnerabilities

### 💡 Our Solution

FoodDelivery Pro delivers:
- ✅ **Multi-Role Authentication** - JWT-based secure auth for 3 user types
- ✅ **Real-Time Updates** - Live order tracking and status updates
- ✅ **Smart Cart Management** - Restaurant-specific cart with validation
- ✅ **Professional UI/UX** - Material-UI + Framer Motion animations
- ✅ **RESTful API** - Clean, documented backend architecture
- ✅ **State Management** - Redux Toolkit with async thunks
- ✅ **Responsive Design** - Mobile-first approach

---

## ✨ Key Features

### 🛍️ Customer Portal

<table>
<tr>
<td width="50%">

#### 🔐 Authentication
- JWT-based secure login
- Role-based access control
- Password encryption (bcrypt)
- Remember me functionality
- Smart form validation

#### 🍔 Food Ordering
- Browse restaurants by cuisine
- Advanced search & filters
- Restaurant details & menu
- Add to cart with customizations
- Real-time stock availability
- Multiple address management

</td>
<td width="50%">

#### 📦 Order Management
- Place orders with multiple items
- Multiple payment methods
- Order history tracking
- Real-time order status
- Cancel orders
- Reorder functionality
- Download invoices

#### ❤️ Additional Features
- Favorite restaurants
- Restaurant reviews & ratings
- Order notifications
- Profile management
- Address book
- Order tracking map

</td>
</tr>
</table>

### 🏪 Restaurant Dashboard

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Sales overview, pending orders, analytics |
| 🍕 **Menu Management** | Add/Edit/Delete menu items, categories, pricing |
| 📦 **Order Processing** | Accept/Reject orders, update status, view history |
| 📈 **Analytics** | Revenue tracking, popular items, customer insights |
| ⚙️ **Settings** | Business hours, delivery settings, profile |

### 🚗 Delivery Partner Dashboard

- **Order Assignment** - View available delivery orders
- **Earnings Tracker** - Daily, weekly, monthly earnings
- **Active Delivery** - Real-time delivery tracking
- **Order History** - Completed deliveries
- **Profile Management** - Update vehicle info, availability

```

## 👥 Multi-Role System
┌─────────────────────────────────────────────────┐
│ User Roles │
├─────────────────────────────────────────────────┤
│ │
│ 👤 CUSTOMER 🏪 RESTAURANT │
│ • Browse & Order • Manage Menu │
│ • Track Orders • Process Orders │
│ • Manage Profile • View Analytics │
│ • Add Favorites • Business Settings │
│ │
│ 🚗 DELIVERY PARTNER │
│ • Accept Deliveries │
│ • Track Earnings │
│ • Update Availability │
│ │
└─────────────────────────────────────────────────┘



## 🛠️ Tech Stack

### **Backend:**
├── Runtime & Framework
│ ├── Node.js 18.x
│ ├── Express.js 4.18
│ └── REST API Architecture
│
├── Database
│ ├── MongoDB 6.0
│ ├── Mongoose ODM
│ └── MongoDB Atlas (Production)
│
├── Authentication & Security
│ ├── JWT (jsonwebtoken)
│ ├── bcryptjs (Password Hashing)
│ ├── express-validator
│ ├── helmet (Security Headers)
│ ├── cors
│ └── rate-limiter
│
└── Tools & Utilities
├── dotenv (Environment Variables)
├── morgan (Logging)
└── nodemon (Development)


### **Frontend:**
├── Core Framework
│ ├── React 18.2
│ ├── React Router DOM 6.20
│ ├── Redux Toolkit 1.9
│ └── React Hooks
│
├── UI & Styling
│ ├── Material-UI (MUI) 5.14
│ ├── Framer Motion 10.16 (Animations)
│ ├── React Icons
│ ├── Swiper.js (Carousels)
│ └── Custom CSS with CSS Variables
│
├── HTTP & State
│ ├── Axios 1.6
│ ├── Redux Persist
│ └── React Toastify
│
└── Build Tools
├── Create React App
├── Webpack 5
└── Babel


---

## 🏗️ System Architecture
┌────────────────────────────────────────────────────┐
│ CLIENT LAYER │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ React Web │ │ Admin Panel │ │
│ │ (Port 3000) │ │ (Port 3001) │ │
│ └──────┬───────┘ └──────┬───────┘ │
│ │ │ │
│ └────────┬────────┘ │
│ │ │
│ ┌────────▼────────┐ │
│ │ Axios HTTP │ │
│ │ (API Calls) │ │
│ └────────┬────────┘ │
└──────────────────┼────────────────────────────────┘
│
┌──────────────────▼────────────────────────────────┐
│ SERVER LAYER │
│ ┌─────────────────────────────────────────┐ │
│ │ Express.js REST API (Port 5000) │ │
│ │ │ │
│ │ ┌──────────────────────────────────┐ │ │
│ │ │ API Routes & Controllers │ │ │
│ │ ├──────────────────────────────────┤ │ │
│ │ │ /api/auth - Authentication │ │ │
│ │ │ /api/users - User Management │ │ │
│ │ │ /api/restaurants - Restaurants │ │ │
│ │ │ /api/menu - Menu Items │ │ │
│ │ │ /api/orders - Order Processing │ │ │
│ │ └──────────────────────────────────┘ │ │
│ │ │ │
│ │ ┌──────────────────────────────────┐ │ │
│ │ │ Middleware Layer │ │ │
│ │ ├──────────────────────────────────┤ │ │
│ │ │ • JWT Authentication │ │ │
│ │ │ • Role Authorization │ │ │
│ │ │ • Error Handling │ │ │
│ │ │ • Input Validation │ │ │
│ │ └──────────────────────────────────┘ │ │
│ └─────────────────────────────────────────┘ │
└──────────────────┬────────────────────────────────┘
│
┌──────────────────▼────────────────────────────────┐
│ DATABASE LAYER │
│ ┌─────────────────────────────────────────┐ │
│ │ MongoDB Database │ │
│ ├─────────────────────────────────────────┤ │
│ │ Collections: │ │
│ │ • users - User accounts │ │
│ │ • restaurants - Restaurant data │ │
│ │ • menuitems - Food items │ │
│ │ • orders - Order records │ │
│ │ • reviews - Customer reviews │ │
│ │ • deliverypersons - Delivery partners │ │
│ └─────────────────────────────────────────┘ │
└───────────────────────────────────────────────────┘


---

## 🚀 Getting Started

### **Prerequisites**

| Software | Version | Download Link |
|----------|---------|---------------|
| 🟢 **Node.js** | 18+ | [Download](https://nodejs.org/) |
| 🍃 **MongoDB** | 6.0+ | [Download](https://www.mongodb.com/try/download/community) |
| 📦 **npm** | 9+ | Included with Node.js |
| 🔧 **Git** | Latest | [Download](https://git-scm.com/) |

```
📸 Screenshots
🏠 Home Page
Home Page

🔐 Login Page
Login

🛒 Cart
Cart

📊 Restaurant Dashboard
Restaurant Dashboard

🚗 Delivery Dashboard
Delivery Dashboard

🔒 Security Features
✅ JWT Authentication - Secure token-based auth
✅ Password Hashing - bcrypt with salt rounds
✅ Input Validation - Prevent SQL injection, XSS
✅ CORS Configuration - Restricted cross-origin requests
✅ Rate Limiting - Prevent brute force attacks
✅ Helmet.js - Security HTTP headers
✅ Environment Variables - Sensitive data protection

🤝 Contributing
Contributions are welcome! 

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center">

## 👨‍💻 Amit Ingale  

📞 Contact  
Developer Information  

<br>

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:amitgingale@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/amitgingale07)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AmitIngAI)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://amitingale.vercel.app/)

<br><br>

⭐ **Show Your Support**  
If this project helped you, please consider giving it a ⭐!

</div