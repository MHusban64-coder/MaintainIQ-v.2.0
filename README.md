# 🚀 MaintainIQ

**Scan. Report. Maintain.**

MaintainIQ is a modern QR-based Asset Maintenance & History Management platform built with **React**, **Vite**, **Firebase**, and **Tailwind CSS**.

The application helps organizations digitally manage physical assets by replacing traditional spreadsheets and paper maintenance logs with an easy-to-use web platform.

Every asset is assigned a unique QR Code that can be scanned to instantly access its complete information, maintenance history, warranty details, and reported issues.

---

## ✨ Features

- 🔐 Firebase Authentication
- 📦 Asset Management (CRUD)
- 📱 QR Code Generation
- 📷 QR Code Scanner
- 🛠 Maintenance History Tracking
- 🚨 Issue Reporting
- 🖼 Image Upload with Firebase Storage
- 📊 Dashboard Analytics
- 🔍 Search & Filtering
- 🌙 Dark Mode
- 📱 Fully Responsive Design
- ⚡ Fast Vite Development Environment

---

## 🛠 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Lucide React
- React Hot Toast
- Recharts

### Backend
- Firebase Authentication
- Cloud Firestore
- Firebase Storage

### QR Technologies
- react-qr-code
- html5-qrcode

---

## 📂 Project Structure

```
src/
│
├── assets/
├── components/
├── context/
├── firebase/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
├── utils/
│
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd maintainiq
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file in the project root.

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Enable the following Firebase services:

- Authentication (Email/Password)
- Cloud Firestore
- Firebase Storage

---

### 4. Run the project

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

## 📱 Core Modules

- Landing Page
- Authentication
- Dashboard
- Asset Management
- Asset Details
- QR Generation
- QR Scanner
- Maintenance Records
- Issue Reporting
- User Profile
- Settings

---

## 🎯 Project Goal

MaintainIQ was created to demonstrate how modern web technologies can simplify asset maintenance workflows.

The project focuses on:

- Clean UI/UX
- Scalable React architecture
- Firebase integration
- Responsive design
- Practical real-world functionality

without unnecessary complexity.

---

## 📸 Screenshots

> Add screenshots here after completing the project.

---

## 🌱 Future Improvements

- Push notifications
- Maintenance reminders
- Role-based access control
- PDF maintenance reports
- Asset import/export
- Offline support
- Advanced analytics
- Barcode support

---

## 👨‍💻 Built With

- React
- Vite
- Firebase
- Tailwind CSS

---

## 📄 License

This project was developed for educational and hackathon purposes.
