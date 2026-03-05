# Multi-Vendor E-Commerce Platform (MERN)

A full-stack marketplace starter built with **MongoDB, Express, React, and Node.js**.
This repository provides a working baseline for customer shopping, vendor product management, and role-based API access.

---

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Implemented Features](#implemented-features)
- [Repository Structure](#repository-structure)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Run with Docker](#run-with-docker)
- [Seed Data](#seed-data)
- [API Endpoints](#api-endpoints)
- [Visual Diagrams](#visual-diagrams)
- [Production Notes](#production-notes)

---

## Overview
This project includes:
- A React frontend (`client/`) for browsing products, authentication, vendor product creation, and order views.
- An Express API (`server/`) with JWT-based authentication and role checks.
- MongoDB models for users, products, and orders.
- Docker configuration for running web + API + MongoDB together.

The goal is to offer a practical starting point for a multi-vendor commerce system that can be extended with payments, search, moderation, and analytics.

## Tech Stack
- **Frontend:** React (Vite), React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + role-based route guards
- **Containerization:** Docker, Docker Compose

## Implemented Features
- User registration and login (`customer`, `vendor`, `admin` roles).
- Public product listing endpoint.
- Vendor-only product creation and product management view.
- Customer checkout flow creating persisted orders.
- Customer order history endpoint.
- Vendor order listing endpoint.
- Health check endpoint.
- Seed script for demo users and products.

## Repository Structure
```text
.
├── client/                 # React application
├── server/                 # Express API + Mongoose models
├── docs/images/            # Architecture and order-flow SVGs
├── docker-compose.yml      # Local container orchestration
├── package.json            # npm workspace scripts
└── README.md
```

## Local Development

### Prerequisites
- Node.js 20+
- MongoDB instance available at `mongodb://localhost:27017`

### Setup
```bash
npm install
cp server/.env.example server/.env
npm run seed
npm run dev
```

### Local URLs
- Frontend: `http://localhost:5173`
- API base: `http://localhost:5000/api`
- Health: `http://localhost:5000/api/health`

## Environment Variables
Create `server/.env` from `server/.env.example`.

| Variable | Required | Description |
|---|---|---|
| `PORT` | Yes | API port (default `5000`) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for token signing |
| `CLIENT_URL` | Yes | Allowed frontend origin for CORS |

## Run with Docker
```bash
docker compose up --build
```

Services exposed:
- Web app: `http://localhost:5173`
- API: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

## Seed Data
After setting environment variables:
```bash
npm run seed
```

Demo accounts:
- Customer: `customer@example.com` / `password123`
- Vendor: `vendor@example.com` / `password123`
- Admin: `admin@example.com` / `password123`

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Products
- `GET /api/products`
- `POST /api/products` *(vendor/admin)*
- `GET /api/products/mine` *(vendor/admin)*

### Orders
- `POST /api/orders` *(customer)*
- `GET /api/orders/mine`
- `GET /api/orders/vendor` *(vendor/admin)*

### Health
- `GET /api/health`

## Visual Diagrams
### Platform architecture
![Multi-Vendor platform architecture](docs/images/marketplace-architecture.svg)

### Order lifecycle
![Marketplace order lifecycle](docs/images/order-lifecycle.svg)

## Production Notes
- Use a strong, rotated `JWT_SECRET`.
- Restrict CORS to trusted frontend origins only.
- Place API and web behind TLS termination.
- Add input validation, centralized error handling, and request rate limiting.
- Add payment gateway integration and async jobs for real marketplace operations.
