<div align="center">

# 🩸 BDMS – Blood Donation Management System

**A full-stack platform connecting donors, receivers, and admins to save lives efficiently.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

</div>

## 🌟 Overview

BDMS is a secure, scalable web application that helps:

- **Receivers** quickly request blood with hospital details
- **Donors** register, get verified, and become available for matching
- **Admins** manage users, verify donors, approve requests, and assign donors manually or automatically

Built with modern technologies and focused on real-world blood donation urgency.

## ✨ Key Features

| Feature                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| 🔐 Secure Authentication       | JWT + Role-based access (Admin / Donor / Receiver)                          |
| 🩸 Blood Request System        | Create, track, approve & auto-match requests                                |
| 👤 Donor Verification          | Admin verifies donors before they can be matched                            |
| 🚀 Admin Dashboard             | Stats overview, user management, request handling                           |
| 📊 Real-time Matching          | Auto-match donors based on blood group & location                           |
| 🛡️ Secure & Role-Protected     | Protected routes & middleware for every role                                |

## 🛠️ Tech Stack

| Layer       | Technology                            | Purpose                              |
|------------|---------------------------------------|--------------------------------------|
| Frontend   | React 18 + Vite                       | Fast development & build             |
| Styling    | Tailwind CSS + Shadcn/ui              | Beautiful, consistent UI             |
| Routing    | React Router v6                       | Protected & public routes            |
| Icons      | Lucide React                          | Modern, clean icons                  |
| Backend    | Node.js + Express                     | REST API server                      |
| Database   | MongoDB (Mongoose)                    | Flexible document storage            |
| Auth       | JWT + bcrypt                          | Secure authentication                |
| Deployment | Vercel (frontend) + Render (backend)  | Free & fast hosting                  |

## 📸 Screenshots (coming soon)

(After deployment we'll add real screenshots here)

## ⚡ Quick Start (Local Development)

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)
- Git

### Backend

```bash
cd backend
npm install