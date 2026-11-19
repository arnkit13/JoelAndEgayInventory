# Joel and Egay Inventory System

A modern Point-of-Sale (POS) and inventory management system designed for store owners and tindera/o operations, featuring real-time fast product search, stock management, sales tracking, and administrative analytics.

## Tech Stack

- **Frontend**: React, Vite, Modern CSS
- **Backend**: Java 21, Spring Boot 3.4, Spring Data JPA
- **Database**: PostgreSQL (Supabase or Railway PostgreSQL)

## Architecture

- `/frontend`: Vite + React web application with Tindera / Admin dashboards (deployed to Vercel).
- `/backend`: Spring Boot REST API for inventory, products, sales, and user authentication (deployed to Railway).

---

## 🚀 Deployment Guide

### Part 1: Deploy Backend to Railway

1. Go to [railway.com](https://railway.com) and create a **New Project**.
2. Select **"Deploy from GitHub repo"** and choose **`JoelAndEgayInventory`**.
3. Railway automatically detects `railway.json` and `nixpacks.toml` to build the Java 21 Spring Boot backend.
4. **Configure Database**:
   - **Option A (Supabase)**: In your Railway service under **Variables**, add:
     - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<your-host>:5432/postgres?sslmode=require`
     - `SPRING_DATASOURCE_USERNAME`: `<your-db-user>`
     - `SPRING_DATASOURCE_PASSWORD`: `<your-db-password>`
     - `SUPABASE_URL`: `https://<your-project>.supabase.co`
     - `SUPABASE_PUBLISHABLE_KEY`: `<your-supabase-publishable-key>`
   - **Option B (Railway PostgreSQL)**: In your Railway project, click **New** > **Database** > **Add PostgreSQL**. Railway will automatically link the database and provide `DATABASE_URL`!
5. **Generate Public Domain**:
   - Under your backend service, go to **Settings** > **Networking**.
   - Click **Generate Domain** (e.g. `joel-egay-backend.up.railway.app`).
   - Copy this URL!

---

### Part 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select the **`JoelAndEgayInventory`** repository from GitHub.
3. In the project setup modal:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (click Edit and select `frontend`)
4. Expand **Environment Variables** and add:
   - `VITE_API_URL`: Your new Railway backend URL from Part 1 (e.g. `https://joel-egay-backend.up.railway.app`)
5. Click **Deploy**. Vercel will build and deploy your frontend!

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
