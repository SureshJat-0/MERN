# 💬 MERN ChatApp

A full-stack real-time chat application using **MERN Stack + Socket.IO**.

- 🌐 Frontend: React + Context API + Axios
- 🔙 Backend: Node.js + Express + MongoDB + Passport.js
- 🔌 Real-Time: Socket.IO
- 🔐 Auth: Passport-local-mongoose with sessions
- 🚀 Deploy Ready for Render

---

## 📁 Project Structure
ChatApp/
├── Client/ # React frontend
├── Server/ # Express backend with WebSocket
├── README.md # You're here!

## 🚀 Features

- User authentication (login/signup)
- Real-time one-on-one chat
- Session-based route protection
- Auto-scroll chat
- Clean UI with conditional styling

---

## 🧑‍💻 How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/SureshJat-0/MERN.git
cd MERN/ChatApp

cd Server
npm install
cp .env.example .env   # Add your MongoDB URI & session secret
npm start

cd ../Client
npm install
npm run dev
```

## Environment Variables

- PORT=3000
- MONGO_URL=your_mongo_uri
- SESSION_SECRET=your_secret
- CLIENT_URL=http://localhost:5173