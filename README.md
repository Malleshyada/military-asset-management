Military Asset Management System
Overview
This project is a web-based Military Asset Management System built with React.js (frontend), Node.js/Express.js (backend), and MySQL (database). It provides features for tracking assets, recording purchases, transfers, assignments, and expenditures with role-based access control (RBAC).
Project Structure
military-asset-management/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── assets.js
│   │   ├── purchases.js
│   │   ├── transfers.js
│   │   └── assignments.js
│   ├── server.js
│   ├── schema.sql
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Purchases.js
│   │   │   ├── Transfers.js
│   │   │   ├── Assignments.js
│   │   │   └── NetMovementPopup.js
│   │   ├── App.js
│   │   └── index.js
│   └── index.html
└── README.md

Setup Instructions
Backend Setup

Install Dependencies:

Ensure Node.js and MySQL are installed.
Navigate to the backend/ directory:cd backend


Install dependencies:npm install




Set Up MySQL:

Start your MySQL server.
Update backend/config/db.js with your MySQL credentials (e.g., password).
Run the database schema:mysql -u root -p < schema.sql




Start the Backend:

Run the server:npm start


The backend will run on http://localhost:3000.



Frontend Setup

Serve the Frontend:
Install serve globally:npm install -g serve


Navigate to the frontend/ directory:cd frontend


Serve the frontend:serve -s . -l 5000


The frontend will run on http://localhost:5000.



Testing

Open http://localhost:5000 in your browser.
Use the login credentials (username: admin, password: password) to access the system.
Test the dashboard, purchases, transfers, and assignments pages.
Verify RBAC:
Admin: Full access.
Base Commander: Access to their base only.
Logistics Officer: Access to purchases and transfers only.



Notes

The frontend uses React via CDNs for simplicity. For production, consider using a proper React setup with create-react-app.
The backend uses JWT for authentication. Replace the simulated login with a proper authentication system.
Ensure the backend (http://localhost:3000) and frontend (http://localhost:5000) ports do not conflict.
For production, add input validation, error handling, and enhanced security measures.

Troubleshooting

npm start error: Ensure package.json has a "start" script.
Port conflicts: Change the frontend port using serve -s . -l <port>.
Database errors: Verify MySQL credentials and ensure the database is created.

