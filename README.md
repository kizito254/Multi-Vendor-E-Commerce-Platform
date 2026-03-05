# Multi-Vendor E-Commerce Platform (MERN)

Production-ready starter for a multi-vendor marketplace with:
- **MongoDB** for persistent data.
- **Express/Node.js** API with JWT auth and role-based access.
- **React (Vite)** frontend for customers and vendors.
- **Docker Compose** for one-command local deployment.

## Why this project is trending
Marketplace systems showcase full-stack mastery because they combine domain modeling, role-based security, transactional order/payment workflows, and scalable architecture patterns in one product.

## Features implemented
- Auth: register/login with role (`customer`, `vendor`, `admin`).
- Product catalog: list approved products publicly.
- Vendor dashboard: create products and view own products.
- Customer checkout: create orders from cart items.
- Order tracking: customers can view their orders.
- API health endpoint and seed script.

## Core feature scope (blueprint)
### Customer
- Browse catalog, add to cart, place orders, and track own order history.

### Vendor
- Manage own products and monitor incoming vendor-related orders.

### Admin
- Role available in data model/auth flow and can access vendor/admin-protected endpoints.

## Project structure

```text
.
├── client/                 # React app
├── server/                 # Express API + Mongo models
├── docs/images/            # Architecture and flow diagrams
├── docker-compose.yml
└── package.json            # workspace scripts
```

## Quick start (local, no Docker)

### Prerequisites
- Node.js 20+
- MongoDB running locally on `mongodb://localhost:27017`

### Setup
```bash
npm install
cp server/.env.example server/.env
npm run seed
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api

### Seed users
- Customer: `customer@example.com` / `password123`
- Vendor: `vendor@example.com` / `password123`
- Admin: `admin@example.com` / `password123`

## Docker deployment

```bash
docker compose up --build
```

Services:
- `web`: React app on `http://localhost:5173`
- `api`: Express API on `http://localhost:5000`
- `mongodb`: MongoDB on `mongodb://localhost:27017`

## API reference (core)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/products` (vendor/admin)
- `GET /api/products/mine` (vendor/admin)
- `POST /api/orders` (customer)
- `GET /api/orders/mine`
- `GET /api/orders/vendor` (vendor/admin)
- `GET /api/health`

## Visual overview

### Platform architecture
![Multi-Vendor platform architecture](docs/images/marketplace-architecture.svg)

### Order lifecycle
![Marketplace order lifecycle](docs/images/order-lifecycle.svg)

## Deployment notes
- Set a strong `JWT_SECRET` in production.
- Restrict CORS via `CLIENT_URL`.
- Run API and web behind TLS termination (e.g., Nginx/Cloud LB).
- Add payment gateway, object storage, background jobs, and stronger validation/error handling for full production scale.
