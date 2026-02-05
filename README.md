# 🩸 BDMS – Blood Donation Management System

BDMS is a full-stack web application designed to efficiently manage blood donors, blood requests, and admin operations.  
It helps hospitals and users quickly find verified donors and manage blood requests securely.

---

## 🚀 Features

### 👤 User
- Register & login
- Request blood
- View request status

### 🩸 Donor
- Register as donor
- Get verified by admin
- Can be assigned to blood requests

### 🛠️ Admin Dashboard
- View system stats (users, donors, requests)
- Verify / block / unblock donors
- Approve blood requests
- Assign donors manually or automatically
- Secure admin-only access

---

## 🧱 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Role-based access (Admin/User/Donor)

---

## 🔐 Security
- JWT-based authentication
- Admin & protected routes
- Role-based middleware
- Secure API access

---

## 📂 Project Structure

BDMS/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── .env
│
└── README.md


---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000

🧪 Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🌍 Deployment

Backend: Render

Frontend: Vercel

🤝 Contribution

Pull requests are welcome.
For major changes, please open an issue first.

📌 Author

Babli Bharti
GitHub: https://github.com/bablibharti


📸 Later we’ll add **screenshots section** (after deploy).

---

# ✅ 2️⃣ Backend Deployment → **Render**

### 🔹 Step 1: Prepare backend
In `backend/server.js`:
```js
app.get("/", (req, res) => {
  res.send("BDMS Backend is running 🚀");
});