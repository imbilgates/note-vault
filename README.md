# 🗒️ NoteVault — Full Stack Note-Taking App

NoteVault is a full-stack note-taking application built as part of an internship assignment. It allows users to sign up or sign in using OTP-based email authentication and manage their personal notes securely.

---

## ✨ Features

- 🔐 **OTP-Based Authentication**
  - Sign up or log in using email and OTP (no password).
  - Option to store session token in `localStorage`.

- 📝 **Notes Dashboard**
  - View your personal notes.
  - Create new notes via modal.
  - Delete existing notes.

- 🧠 **JWT Authorization**
  - Token stored in localStorage and used in API requests.
  - Backend validates token using `Authorization` header.

- ⚙️ **API Routes (Next.js App Router)**
  - Fully secured RESTful endpoints for notes.
  - Middleware-compatible JWT token validation (optional).

- 💬 **Toast Notifications**
  - Success & error feedback using `sonner`.

- 💡 **Modern UI**
  - Built with `shadcn/ui`, Tailwind CSS, and custom design based on Figma.
  - Fully responsive for mobile and desktop.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React Hook Form + Zod**
- **Recharts** (if added later)

### Backend
- **Node.js with Next.js API routes**
- **MongoDB with Mongoose**
- **JWT for Auth**
- **Nodemailer (optional for email OTP)**

---

🔒 Authentication Flow
Step 1: User enters email → requests OTP.

Step 2: Enters OTP → server verifies.

Step 3: Server returns JWT → stored in localStorage.

Step 4: Protected API routes require Authorization: Bearer <token> header.


📌 Notes
❌ No cookie-based auth or middleware protection (uses localStorage).

✅ Easily extendable to support Google login or password auth.

📧 Author
Name: Bilkates

Status: Internship Assignment ✅

Stack: React • Next.js • Node • MongoDB • JWT



