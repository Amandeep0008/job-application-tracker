# Job Application Tracker

A full-stack MERN web application for tracking job applications across a six-stage hiring pipeline, complete with user authentication and a stage-wise analytics dashboard.

🔗 **Live Demo:** https://job-application-tracker-frontend-uu66.onrender.com  
*(Note: Hosted on Render's free tier—initial load may take 30–50 seconds while the server wakes up.)*

## ✨ Key Features

- **Full CRUD Pipeline:** Add, update, and delete job applications across six hiring stages.
- **Secure Authentication:** JWT-based auth with `bcrypt` password hashing and protected routes ensuring per-user data isolation.
- **Stage-Wise Analytics:** Real-time dashboard powered by a MongoDB aggregation pipeline (`$match`, `$group`) showing application counts by stage.
- **Clean Architecture:** MVC-structured REST API (routes, controllers, Mongoose models) with schema validation.

## 🛠️ Tech Stack

- **Frontend:** React (Hooks), Vite, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MongoDB Atlas, Mongoose
- **Deployment:** Render (separate frontend & backend services)

## ⚙️ Running Locally

### 1. Clone the repository
```bash
git clone [https://github.com/](https://github.com/)<your-username>/<job-tracker-repo>.git
cd <job-tracker-repo>
