# School Payment Dashboard - Frontend

This is the frontend for the School Payment and Dashboard Application, built as part of a software developer assessment. It provides a user interface for administrators to view, filter, and manage payment transactions.

Live Application URL:(https://schoolpaymentfrontend-eubl.onrender.com/)  

---



---

## ✨ Features

* Secure JWT Authentication: A dedicated login page to secure the dashboard.
* Transaction Overview: A comprehensive table displaying all payment transactions.
* Dynamic Filtering: Filter transactions by `status` (Success, Pending, Failed) and by `School ID`.
* Column Sorting: Sort the transaction table by any column in ascending or descending order.
* Pagination: Efficiently navigate through a large number of transactions.
* Modern Hover Effect: A clean, modern UI with a special hover effect on table rows for better user experience.
* Transaction Status Check: A modal to check the status of a specific transaction using its `custom_order_id`.
* Persistent Filters: All filters and sorting states are persisted in the URL, allowing users to share or bookmark specific views.

---

## 🛠️ Tech Stack

* Framework: React (with Vite)
* Styling: Tailwind CSS
* Routing: React Router DOM
* API Communication**: Axios
* Icons: React Icons

---

## 🚀 Project Setup

To run this project on your local machine, follow these steps:

1. Clone the repository:
bash

cd school-payment-frontend


**2. Install dependencies:**
Make sure you have Node.js (v20.19.0 or higher) installed.
bash
npm install


**3. Set up environment variables:**
Create a file named `.env` in the root of the project and add the following line. This tells the frontend where to find the backend API.
```
VITE_API_BASE_URL=http://localhost:5000
```
*(For production, this should be the URL of your deployed backend.)*

**4. Run the development server:**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 📝 Development & Troubleshooting Journey

Building this application involved a realistic development and debugging process to ensure a robust final product.

* Initial Setup: The project was initialized with Vite and React, with dependencies like Axios and React Router for core functionality and Tailwind CSS for styling.
* API Integration**: An Axios instance was configured with an interceptor to automatically attach the JWT token to all protected API requests.
* Deployment & CORS: Upon initial deployment to Render, we encountered and resolved several classic full-stack challenges:
    * Inactive API Endpoint: The payment gateway URL provided in the assessment (`api.eduvanz.com`) was found to be inactive (returning a 404). To complete the project, the API call was **mocked** in the backend, a standard industry practice for handling unresponsive external services.
    * CORS (Cross-Origin Resource Sharing)**: We resolved a series of CORS errors by implementing a robust CORS policy on the backend Express server, explicitly allowing the deployed frontend's origin to make requests.
    * Deployment Verification: We systematically debugged deployment issues by making visible changes to the UI (e.g., updating header text) to confirm that the latest code was live on Render.
* Data Rendering: After confirming successful API communication, we debugged a final rendering issue by using the browser's developer tools to inspect the live data and ensure the React components correctly mapped the data properties to the UI.

This iterative process of coding, deploying, and debugging led to the stable and fully functional application you see today.
