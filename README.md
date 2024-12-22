# Adventura - Travel Website Application

Adventura is a travel booking platform where users can browse trips, view trip details, and make bookings. While the backend is fully functional, the frontend development is a work in progress. Currently, user authentication, trip browsing, and viewing trip details are implemented on the frontend.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Trip Endpoints](#trip-endpoints)
  - [Booking Endpoints](#booking-endpoints)
- [Future Enhancements](#future-enhancements)

---

## Project Overview
Adventura allows users to:
- Browse trips and view trip details.
- Register and log in to manage their profiles.
- Manage and book trips (feature in progress).
- Organizer-only features to create, update, and delete trips.

### Current Status
- Backend: Fully functional with all endpoints tested.
- Frontend: Navbar, user authentication, trips, and trip details are implemented. Trip booking and payment integration are pending.

---

## Features
- **User Authentication:** Register and log in with JWT-based authentication.
- **Trip Management:** Organizers can create, update, and delete trips.
- **Booking Management:** Users can book trips (backend only for now).
- **Payment Integration:** Demo payment integration (pending).

---

## Technologies Used

**Frontend:**
- React.js
- Redux Toolkit
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB

**Other Tools:**
- JWT for authentication
- Mongoose for database interaction

---

## Setup Instructions

### Backend (Server)
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```
4. The backend will run on `http://localhost:2000` (default `PORT`).

### Frontend (Client)
1. Navigate to the client directory:
   ```bash
   cd client/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The frontend will run on `http://localhost:5173` (default).

---

Here's the revised section for your README:

---

## Environment Variables

The `.env` files for both the backend and frontend are included in the repository. You can modify them as needed. Below are the variables used:

### Backend (`server/.env`)
```env
PORT=2000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```
- Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB credentials if you set up your own cluster.

### Frontend (`client/client/.env`)
```env
VITE_API_URL=http://localhost:2000/api
```
- The `VITE_API_URL` is used to connect to the backend API. Ensure the backend is running on `http://localhost:2000/api` for local testing.

---

## API Documentation

### User Endpoints
| Method | Endpoint      | Description               | Protected |
|--------|---------------|---------------------------|-----------|
| POST   | `/api/users/register` | Register a new user.       | No        |
| POST   | `/api/users/login`    | Authenticate a user.       | No        |

### Trip Endpoints
| Method | Endpoint            | Description                              | Protected       |
|--------|---------------------|------------------------------------------|-----------------|
| GET    | `/api/trips`        | Get all trips.                          | No              |
| GET    | `/api/trips/:id`    | Get trip details by ID.                 | No              |
| POST   | `/api/trips`        | Create a new trip (Organizer only).      | Yes (Organizer) |
| PUT    | `/api/trips/:id`    | Update a trip by ID (Organizer only).    | Yes (Organizer) |
| DELETE | `/api/trips/:id`    | Delete a trip by ID (Organizer only).    | Yes (Organizer) |
| GET    | `/api/trips/organizer` | Get trips by the organizer.             | Yes (Organizer) |

### Booking Endpoints
| Method | Endpoint                     | Description                              | Protected       |
|--------|------------------------------|------------------------------------------|-----------------|
| POST   | `/api/bookings`              | Create a new booking.                    | Yes             |
| GET    | `/api/bookings`              | Get user bookings.                       | Yes             |
| GET    | `/api/bookings/organizer`    | Get organizer bookings (Organizer only). | Yes (Organizer) |
| PUT    | `/api/bookings/:id/cancel`   | Cancel a booking.                        | Yes             |
| PUT    | `/api/bookings/:id/payment`  | Update booking payment status.           | Yes             |

---

## Future Enhancements

1. **Frontend Features:**
   - Trip booking functionality.
   - Payment gateway integration (demo).
   - Booking management for users and organizers.

2. **Backend Enhancements:**
   - Add email notifications for booking confirmations.
   - Add detailed trip search and filters.
   - Implement concurrency handling to manage simultaneous requests efficiently, especially for trip booking and payment processing.

3. **Deployment:**
   - Deploy the application on a platform like Heroku, Vercel, or AWS.

---


