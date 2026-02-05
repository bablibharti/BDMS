🩸 BDMS – Blood Donation Management System

A full-stack Blood Donation Management System (BDMS) that connects donors, receivers, and admins to efficiently manage blood donation requests, donor verification, and request assignment.

Built with modern web technologies, role-based access control, and an admin SaaS-style dashboard.

🚀 Features
👤 User (Donor / Receiver)

User registration & login

Role-based dashboards

Donor verification system

Blood request creation & tracking

🛡️ Admin Panel (SaaS Dashboard)

Secure admin authentication

View platform statistics (users, donors, requests)

Verify / block / unblock donors

Approve blood requests

Assign donors manually or automatically

Modern sidebar layout with cards & charts

🔐 Security

JWT authentication

Role-based authorization

Protected admin routes

Secure API access

🧑‍💻 Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router

Lucide Icons

Chart.js

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcrypt

📁 Project Structure
BDMS/
├── frontend/
│   ├── src/
│   │   ├── auth/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── routes/
│   │   └── App.jsx
│   └── .gitignore
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .gitignore
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repositories
git clone https://github.com/your-username/bdms-frontend.git
git clone https://github.com/your-username/bdms-backend.git

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key


Run backend:

npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🌍 Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

CI/CD enabled via GitHub — auto deploy on push 🚀

📊 Admin Capabilities
Feature	Status
View all users	✅
Verify donors	✅
Block / unblock users	✅
Approve requests	✅
Assign donors	✅
Auto donor matching	✅
🧠 Future Enhancements

Real-time notifications

SMS / Email alerts

Location-based donor matching

Analytics dashboard

Mobile app integration

🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Babli Bharti
2nd Year CSE | Full-Stack Developer
🚀 Focused on System Design, SaaS, and Scalable Web Apps