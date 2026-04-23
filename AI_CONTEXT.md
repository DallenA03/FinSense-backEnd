# 🤖 AI CONTEXT — FinSense Backend

## 📌 Project Overview

This project is a backend service for a personal finance management application called **FinSense**.

The main goal of this system is to:

* Automatically track user transactions from email notifications
* Allow users to upload financial statements (CSV/PDF)
* Categorize transactions using AI
* Provide financial insights and analytics

---

## 🧱 Tech Stack

* Node.js (Express.js)
* MongoDB (Mongoose)
* JWT Authentication
* Multer (File Upload)
* Email Parsing (IMAP / Gmail API)
* AI Integration (OpenAI API)

---

## 🏗️ Architecture

This project uses a **feature-based modular architecture**.

Structure:

* Each feature is located inside `src/modules/`
* Each module contains:

  * controller
  * service
  * repository
  * model
  * route
  * validator (optional)

Example:

```bash
modules/transaction/
├── transaction.controller.js
├── transaction.service.js
├── transaction.repository.js
├── transaction.model.js
├── transaction.route.js
├── transaction.validator.js
```

---

## 🔁 Data Flow Pattern

Controller → Service → Repository → Database

Rules:

* Controller handles request/response only
* Service contains business logic
* Repository handles database queries

---

## 📦 Modules Overview

### 1. Auth

* Register
* Login
* JWT authentication

### 2. Transaction

* Create transaction
* Get transactions (pagination + filter)
* Update & delete

### 3. Email

* Connect email account
* Fetch emails
* Parse transaction data

### 4. Upload

* Upload CSV/PDF
* Parse file
* Preview transactions

### 5. Analytics

* Monthly summary
* Category breakdown

### 6. AI

* Categorize transaction
* Generate insights
* Give notification to user when expense crosses their monthly budget in any category

---

## 📊 Transaction Schema (Important)

A transaction must include:

* userId
* accountId
* amount
* type (income / expense)
* category
* description
* transactionDate
* source (manual / email / csv / pdf)
* referenceId (for deduplication)

---

## ⚠️ Important Rules

### 1. Separation of Concerns

* NEVER put business logic inside controllers
* ALWAYS use service layer

---

### 2. Validation

* Use Joi for request validation
* Validate all inputs

---

### 3. Error Handling

* Use global error middleware
* Avoid try-catch repetition in controllers

---

### 4. Security

* Hash passwords using bcrypt
* Use JWT for authentication
* Never expose sensitive data

---

### 5. Deduplication

* Use `referenceId` to avoid duplicate transactions
* Especially for email and file imports

---

## 📧 Email Parsing Rules

* Extract:

  * amount
  * date
  * description
* Use regex-based parsing
* Store raw email for debugging

---

## 📂 File Upload Rules

* Support:

  * CSV
  * PDF
* Always parse first → return preview
* Only save after user confirmation

---

## 🤖 AI Behavior Guidelines

When generating code:

* Prefer clean, readable, and modular code
* Follow existing folder structure strictly
* Do not introduce new architecture styles
* Reuse existing utilities if available

For AI categorization:

* Input: transaction description
* Output: category string

---

## 📡 API Response Format

Always return consistent response:

```json
{
  "success": true,
  "message": "string",
  "data": {}
}
```

---

## 🚫 Things to Avoid

* Do not mix responsibilities between layers
* Do not access database directly from controller
* Do not hardcode values
* Do not skip validation

---

## ✅ Coding Style

* Use ES Modules (import/export)
* Use async/await
* Keep functions small and focused
* Use meaningful variable names

---

## 🎯 Goal for AI Agent

The AI agent should:

* Help generate clean and maintainable code
* Follow the modular architecture
* Avoid breaking existing structure
* Assist in building scalable backend features

---

## 📌 Notes

This project is designed to be scalable and production-ready.

Any generated code should align with:

* Clean architecture principles
* Modular design
* Real-world backend best practices