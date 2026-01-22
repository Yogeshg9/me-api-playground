Me API Playground – Backend Assignment

This project is a backend REST API built using Node.js, Express, MongoDB, and JWT
authentication.
It demonstrates secure user authentication, protected routes, and user-specific profile
management.

FEATURES
- User Registration with password hashing
- User Login with JWT authentication
- Protected routes using middleware
- One-to-One User and Profile mapping
- CRUD operations for Profile
- MongoDB Atlas integration
- Proper error handling

TECH STACK
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- HTML, CSS, JavaScript

INSTALLATION
1. Clone repository
2. Go to backend folder
3. Run npm install

ENVIRONMENT VARIABLES
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
RUN PROJECT
npm start
Server runs on http://localhost:5000

API ENDPOINTS
POST /auth/register
POST /auth/login
POST /profile
GET /profile
PUT /profile
DELETE /profile

AUTH FLOW
Register → Login → Get JWT → Access protected routes

Architecture
Frontend (HTML/CSS/JavaScript)  
- REST API (Node.js + Express)  
- MongoDB Atlas  

Resume

https://drive.google.com/file/d/1ii2jpmLdAyXGt8Gol3SdxM_N1Py9dNMf/view?usp=drivesdk

Remarks:
- Frontend is minimal, focus was on backend logic.
- Authentication uses JWT stored in localStorage.
- Given more time, I would add validation, refresh tokens, and role-based access.


AUTHOR
Yogesh Sharma