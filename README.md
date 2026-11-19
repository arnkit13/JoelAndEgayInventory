# Joel and Egay Inventory System

A modern Point-of-Sale (POS) and inventory management system designed for store owners and tindera/o operations, featuring real-time fast product search, stock management, sales tracking, and administrative analytics.

## Tech Stack

- **Frontend**: React, Vite, Modern CSS
- **Backend**: Java 21, Spring Boot 3.4, Spring Data JPA
- **Database**: PostgreSQL (Railway PostgreSQL)

## Architecture

- `/frontend`: Vite + React web application with Tindera / Admin dashboards (deployed to Vercel).
- `/backend`: Spring Boot REST API for inventory, products, sales, and user authentication (deployed to Railway).

---

## 🚀 Deployment Guide

### Part 1: Deploy Backend to Railway

1. Go to [railway.com](https://railway.com) and open your project.
2. Click **New** → **GitHub Repo** → choose **`JoelAndEgayInventory`**.
3. Railway automatically detects `railway.json` and `nixpacks.toml` to build the Java 21 Spring Boot backend.
4. **Link Database**:
   - In your backend service, ensure `DATABASE_URL` is set to your PostgreSQL database (Railway automatically injects this when deployed in the same project).
5. **Generate Public Domain**:
   - Under your backend service, go to **Settings** → **Networking**.
   - Click **Generate Domain** (e.g. `joelandegayinventory-production.up.railway.app`).
   - Copy this URL!

---

### Part 2: Connect Frontend on Vercel

1. In your Vercel project settings for **`JoelAndEgayInventory`**:
2. Go to **Settings** → **Environment Variables**.
3. Set / Update:
   - `VITE_API_URL`: Your new Railway backend URL from Part 1 (e.g. `https://joelandegayinventory-production.up.railway.app`)
4. Redeploy in Vercel to apply the new environment variable.

---

## 💻 Local Development

### Running the Backend Locally
```bash
cd backend
./mvnw spring-boot:run
```
Backend runs on `http://localhost:8085`.

### Running the Frontend Locally
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.
