# Aura & Co. | Luxury Interior Design Studio Website

An enterprise-grade, responsive, and visually stunning web application for **Aura & Co.**, a premier luxury interior design studio. Built with a modern React + Vite frontend and a secure Node.js + Express + MongoDB REST API backend.

---

## Technical Architecture

### Frontend
- **Framework**: React.js (Vite configuration)
- **Styling**: Tailwind CSS (luxury palettes, bespoke glassmorphism utilities)
- **Animations**: Framer Motion (page transitions, slow-zooming Ken Burns carousels, responsive slider dragging)
- **Routing**: React Router DOM (Scroll-To-Top listener on route swaps)
- **Icons**: React Icons (Lucide-based vectors)
- **SEO**: Custom `SEO` manager component injecting Open Graph tags, structured schema JSON-LD, and metadata.

### Backend
- **Framework**: Node.js & Express.js
- **Database**: MongoDB (Mongoose Schema validation)
- **Security**: 
  - `helmet` (Secure HTTP headers)
  - `cors` (Allowed origins configuration)
  - `express-rate-limit` (Prevents brute-forcing endpoints)
- **Notifications**: Nodemailer SMTP dispatcher sending transaction letters to clients and administrative alerts to the studio.

---

## Directory Hierarchy

```
workspace/
├── README.md
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── assets/
│       ├── utils/
│       │   └── seo.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── Hero.jsx
│       │   ├── ProjectCard.jsx
│       │   ├── BeforeAfter.jsx
│       │   ├── DesignerCard.jsx
│       │   ├── TestimonialCard.jsx
│       │   ├── StyleCard.jsx
│       │   └── ConsultationForm.jsx
│       ├── data/
│       │   ├── projects.js
│       │   ├── designers.js
│       │   ├── styles.js
│       │   └── testimonials.js
│       └── pages/
│           ├── Home.jsx
│           ├── About.jsx
│           ├── Portfolio.jsx
│           ├── DesignStyles.jsx
│           ├── Designers.jsx
│           ├── Testimonials.jsx
│           └── Contact.jsx
└── backend/
    ├── package.json
    ├── server.js
    ├── .env.example
    ├── config/
    │   └── db.js
    ├── models/
    │   └── Consultation.js
    ├── controllers/
    │   └── consultationController.js
    └── routes/
        └── consultationRoutes.js
```

---

## Installation & Configuration

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local installation or Atlas Cloud Database cluster)

### 1. Backend Setup
1. Open a terminal in the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Adjust the environment keys inside `.env`:
   - `PORT`: Server port (default: 5000)
   - `MONGODB_URI`: Your MongoDB connection link
   - `SMTP_USER` & `SMTP_PASS`: Credentials to route notification emails

### 2. Frontend Setup
1. Open a terminal in the `frontend/` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## Run Commands

### Development Mode

#### Start Backend
```bash
cd backend
npm run dev
```
*The API is now running at `http://localhost:5000` with file watch auto-reload.*

#### Start Frontend
```bash
cd frontend
npm run dev
```
*Vite local hosting server is available at `http://localhost:5173`.*

---

## REST API Documentation

### 1. Submit Consultation Request
- **Endpoint**: `POST /api/consultation`
- **Rate Limit**: Max 20 requests per 15-minute interval per IP address.
- **Content-Type**: `application/json`

#### Request Payload
```json
{
  "name": "Elizabeth Sterling",
  "email": "elizabeth@example.com",
  "phone": "+1 (310) 555-0199",
  "location": "Beverly Hills, CA",
  "projectType": "Luxury Villa",
  "budget": "$500,000+",
  "designStyle": "Luxury",
  "message": "We need to remodel our double-height lounge using custom brass panels and bookmatched marble walls."
}
```

#### Successful Response (`201 Created`)
```json
{
  "success": true,
  "message": "Consultation profile saved successfully.",
  "data": {
    "name": "Elizabeth Sterling",
    "email": "elizabeth@example.com",
    "phone": "+1 (310) 555-0199",
    "location": "Beverly Hills, CA",
    "projectType": "Luxury Villa",
    "budget": "$500,000+",
    "designStyle": "Luxury",
    "message": "We need to remodel our double-height lounge...",
    "_id": "60d0fe2c5f1b2c001f3e792c",
    "createdAt": "2026-06-17T07:44:11.000Z",
    "updatedAt": "2026-06-17T07:44:11.000Z",
    "__v": 0
  }
}
```

#### Validation Failure Response (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Please specify a valid email address",
      "path": "email",
      "location": "body"
    }
  ]
}
```

### 2. API Diagnostics
- **Endpoint**: `GET /api/health`
- **Successful Response (`200 OK`)**:
  ```json
  {
    "status": "healthy",
    "uptime": 124.58,
    "timestamp": "2026-06-17T07:47:52.000Z"
  }
  ```

---

## Deployment Playbook

### Frontend Deployments

#### 1. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `frontend/` directory.
3. Configure setting parameters:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set up `vercel.json` redirection for single-page routing if needed:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

#### 2. Netlify
1. Log in to Netlify panel, select **Add New Site** > **Import an existing project**.
2. Connect your Git Repository.
3. Set pathing directives:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Add a `_redirects` file in your `public/` directory to manage React Router clean reloads:
   ```text
   /*   /index.html   200
   ```

---

### Backend & DB Deployments

#### 1. Railway
1. Sign in to Railway and create a **New Project**.
2. Select **Provision MongoDB** to launch a managed database. Copy the connection string.
3. Choose **Deploy from GitHub repo**, select your repo, and set the **Root Directory** as `backend`.
4. Under variables, add:
   - `PORT`: `5000`
   - `MONGODB_URI`: Reference the Mongo database link (`${{MongoDB.MONGODB_URL}}`)
   - Add your `SMTP_USER`, `SMTP_PASS` parameters.

#### 2. Render
1. Log in to Render Dashboard, select **New** > **Web Service**.
2. Connect your repository.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables under the **Environment** tab matching the `.env.example` contents.
