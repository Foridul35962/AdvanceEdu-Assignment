# AdvanceEdu – Backend Developer Technical Assignment

This project is a RESTful backend API built as part of a **Backend Developer Technical Assignment**.
It demonstrates backend development skills using **Node.js, Express.js, MongoDB**, JWT authentication, and **Stripe payment integration (test mode)**.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **Stripe (Test Mode)**
* **Postman (API Testing)**
* **Deployment Ready (Render / Railway / Vercel)**

---

## 📦 Features Implemented

### 1 Authentication

* User registration
* Email verification
* Login with JWT
* Get logged-in user profile
* Forgot & reset password

### 2 Product Management

* Add product (Admin only)
* Get all products
* Get product by ID

### 3 Order Management

* Create order
* Get logged-in user orders
* Stock validation during order creation

### 4 Payment Integration (Stripe)

* Stripe Checkout Session
* Secure payment flow
* Webhook handling
* Order status update after payment
* Automatic stock reduction after successful payment

---

## 🔐 Environment Variables

Create a `.env` file using `.env.sample` as reference.

---

## ▶️ Project Setup

```bash
git clone https://github.com/Foridul35962/AdvanceEdu-Assignment.git
cd AdvanceEdu
npm install
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 📮 API Endpoints Overview

### Auth Routes

```
POST   /api/auth/register
POST   /api/auth/register-verify-email
POST   /api/auth/login
GET    /api/auth/profile        (JWT)
POST   /api/auth/forget-pass
POST   /api/auth/forget-pass-verify
PATCH  /api/auth/reset-pass
```

### Product Routes

```
GET    /api/product/all-product
POST   /api/product/add-product      (Admin + JWT)
GET    /api/product/id/:_id
```

### Order & Payment Routes

```
POST   /api/orders/create-order      (JWT)
GET    /api/orders                   (JWT - My Orders)
POST   /api/orders/checkout          (JWT)
```

### Stripe Webhook

```
POST   /api/webhook/stripe
```

---

## 💳 Stripe Payment Flow

1. User creates an order
2. Checkout session is created via Stripe
3. User completes payment on Stripe
4. Stripe sends event to webhook
5. Order status is updated (`isPaid = true`)
6. Product stock is reduced

---

## 🧪 Postman Documentation

* A Postman collection is provided inside the `/postman` folder
* Import the collection into Postman
* Set `BASE_URL` and `JWT_TOKEN`
* Test all endpoints easily

---

## 🌍 Deployment

The backend is deployment-ready for:

* **Vercel**

Webhook endpoint must be publicly accessible for Stripe events.

---

## 🧹 Code Quality

* Clean project structure
* Centralized error handling
* Async handler usage
* Secure environment variables
* Modular controllers & routes

---

## 📁 Repository Includes

* Full backend source code
* `.env.example`
* Postman collection
* README documentation

---

## 👤 Author

**Foridul Islam**
Backend Developer

---

✅ This project fulfills all requirements of the **Backend Developer Technical Assignment**.