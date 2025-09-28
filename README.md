# AI Resume Builder

[Live Demo](https://ai-resume.bilalsi.com)

AI Resume Builder is a full-stack web application that allows users to **generate professional resumes automatically** and **download them as PDF files**. Built with **React (Vite)**, **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

---

## Features

- User **authentication** (register/login)
- **Generate resumes** automatically or manually
- **Download resumes as PDF**
- **Manage multiple resumes** per user
- Responsive **dashboard** with modal form
- Sample data auto-fill for quick generation
- Secure JWT-based authentication and API requests

---

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **PDF Generation:** EJS templates + html-pdf

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/bilalup/ai-resume.git
cd ai-resume
cd server
npm install

create env file
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

start the backend
npm run dev

frontend setup
cd ../client
npm install

Create a .env file with:
VITE_API_URL=http://localhost:8080/api

start the frontend
npm run dev

Live Demo

Check out the project live at: https://ai-resume.bilalsi.com
```
