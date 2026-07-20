<div align="center">

# 🛒 E-Commerce Application
### Full Stack Online Shopping Platform using Spring Boot, React & Razorpay

[![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Database](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Payment](https://img.shields.io/badge/Payment-Razorpay-0C73FE?style=for-the-badge)](https://razorpay.com/)
[![Authentication](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)](LICENSE)

**A full-stack E-Commerce platform that enables users to browse products, manage shopping carts, securely authenticate, and complete online payments using Razorpay.**

[Features](#-key-features) • [Architecture](#️-system-architecture) • [Workflow](#-application-workflow) • [Screens](#-application-modules)

</div>

---

# 📖 Project Overview

The **E-Commerce Application** is a modern online shopping platform built using **Spring Boot**, **React**, and **MySQL**. It provides a seamless shopping experience with secure authentication, product browsing, shopping cart management, and online payment integration using **Razorpay**.

---

# ✨ Key Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 🏠 Home Page
- 📦 Product Listing
- 🔍 Product Details
- 🛒 Shopping Cart
- 💳 Razorpay Payment Gateway
- 📞 Contact Page
- ℹ️ About Page
- 📱 Responsive User Interface
- ⚡ REST API Integration
- 🗄️ MySQL Database

---

# 🛠 Technology Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend |
| Spring Boot | Backend |
| Spring Security | Authentication |
| JWT | Secure Login |
| MySQL | Database |
| JPA/Hibernate | ORM |
| Razorpay | Online Payment |
| REST API | Client-Server Communication |
| Bootstrap / CSS | UI Design |

---

# 📂 Project Structure

```
Frontend (React)

src
│
├── About
├── Auth
├── Cart
├── Contact
├── Home
├── ProductDetails
├── ProductList
├── Services
├── Components
├── App.js
└── index.js


Backend (Spring Boot)

src
│
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── config
└── EcommerceApplication.java
```

---

# 🏗️ System Architecture

```mermaid
flowchart TB

subgraph Frontend["React Frontend"]
A[Home]
B[Product List]
C[Product Details]
D[Cart]
E[Authentication]
F[About]
G[Contact]
end

subgraph Backend["Spring Boot Backend"]
H[REST Controllers]
I[Service Layer]
J[Business Logic]
K[Spring Security + JWT]
end

subgraph Database["Database"]
L[(MySQL)]
end

subgraph Payment["Payment Gateway"]
M[Razorpay]
end

Frontend --> Backend
Backend --> Database
Backend --> Payment
```

---

# 🔄 Application Workflow

```mermaid
flowchart TD

A[User Opens Website]

A --> B[Home Page]

B --> C[Browse Products]

C --> D[View Product Details]

D --> E[Add to Cart]

E --> F{Checkout?}

F -- No --> C

F -- Yes --> G[Login / Register]

G --> H[JWT Authentication]

H --> I[Checkout]

I --> J[Razorpay Payment]

J --> K{Payment Success?}

K -- Yes --> L[Order Confirmed]

K -- No --> M[Retry Payment]

L --> N[Order History]
```

---

# 🔐 Authentication Flow

```mermaid
sequenceDiagram

participant User
participant React
participant SpringBoot
participant JWT
participant MySQL

User->>React: Login
React->>SpringBoot: Login API
SpringBoot->>MySQL: Verify Credentials
MySQL-->>SpringBoot: User Found
SpringBoot->>JWT: Generate Token
JWT-->>React: JWT Token
React-->>User: Login Successful
```

---

# 💳 Razorpay Payment Flow

```mermaid
flowchart TD

A[Checkout]

A --> B[Create Order]

B --> C[Spring Boot API]

C --> D[Razorpay Order API]

D --> E[Return Order ID]

E --> F[React Razorpay Checkout]

F --> G[User Pays]

G --> H{Payment Successful?}

H -- Yes --> I[Verify Signature]

I --> J[Save Order]

J --> K[Success Page]

H -- No --> L[Payment Failed]
```

---

# 🗄 Database Design

```mermaid
erDiagram

USER ||--o{ CART : owns
USER ||--o{ ORDER : places

PRODUCT ||--o{ CART : added_to

PRODUCT ||--o{ ORDERITEM : contains

ORDER ||--|{ ORDERITEM : includes

USER {
Long id
String name
String email
String password
}

PRODUCT {
Long id
String name
Double price
String image
String description
}

CART {
Long id
Integer quantity
}

ORDER {
Long id
Double totalAmount
String paymentStatus
String orderStatus
}

ORDERITEM {
Long id
Integer quantity
Double price
}
```

---

# 📱 Application Modules

| Module | Description |
|---------|-------------|
| 🏠 Home | Landing Page |
| 🔐 Authentication | Login & Register |
| 📦 Product List | View Products |
| 🔍 Product Details | Product Information |
| 🛒 Cart | Shopping Cart |
| 💳 Razorpay | Online Payment |
| 📞 Contact | Contact Form |
| ℹ️ About | Company Information |

---

# 📲 Screen Navigation

```mermaid
graph LR

Home --> ProductList

ProductList --> ProductDetails

ProductDetails --> Cart

Cart --> Login

Login --> Checkout

Checkout --> Razorpay

Razorpay --> OrderSuccess

Home --> About

Home --> Contact
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/garajesh/ecommerce-application.git
```

## Backend

```bash
cd backend

mvn spring-boot:run
```

## Frontend

```bash
cd frontend

npm install

npm start
```

---

# 💳 Razorpay Integration

1. Create a Razorpay Account.
2. Generate **Key ID** and **Secret Key**.
3. Configure Spring Boot backend with Razorpay credentials.
4. Create Razorpay Orders using REST API.
5. Integrate Razorpay Checkout in React.
6. Verify Payment Signature.
7. Save Order Details in MySQL.

---

# 📈 Future Enhancements

- ❤️ Wishlist
- ⭐ Product Reviews
- 📦 Order Tracking
- 🔔 Email Notifications
- 📱 Mobile Application
- 🎟 Coupon System
- 🤖 AI Product Recommendation
- 📊 Admin Dashboard
- 📈 Sales Analytics

---

<div align="center">

## ⭐ Support

If you found this project useful, please consider giving it a **Star ⭐** on GitHub.

Made with ❤️ using **Spring Boot, React & Razorpay**

</div>
