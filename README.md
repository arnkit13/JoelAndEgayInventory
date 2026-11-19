# Joel and Egay Inventory

A modern Point-of-Sale (POS) and inventory management frontend designed for store operations, featuring real-time fast product search, stock management, sales tracking, and administrative analytics.

Connected directly to the shared Railway backend & database (`https://chinoinventorysystem-production.up.railway.app`).

## Tech Stack

- **Frontend**: React, Vite, Modern CSS
- **Backend API**: Spring Boot on Railway (`https://chinoinventorysystem-production.up.railway.app`)

---

## 🚀 Deploying this Frontend to Vercel

1. Push this repository (`JoelAndEgayInventory`) to GitHub (`https://github.com/arnkit13/JoelAndEgayInventory.git`).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select the **`JoelAndEgayInventory`** repository from GitHub.
4. In the project setup modal:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (click Edit and select `frontend`)
5. Expand **Environment Variables** and add:
   - `VITE_API_URL`: `https://chinoinventorysystem-production.up.railway.app`
6. Click **Deploy**. Vercel will build and deploy your new frontend!

---

## 💻 Local Development

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend connects directly to the production backend by default or uses the local proxy if running the backend locally on `http://localhost:8085`.
