# Gidy - Smart Developer Profile

A modern, AI-powered developer profile application featuring a persistent dark mode, interactive work timeline, and AI-generated bios.

## Prerequisites

- **Node.js**: v18 or higher
- **Python**: v3.9 or higher
- **MongoDB**: A running MongoDB instance (or Atlas URI)

---

## Server Setup (FastAPI)

1.  **Navigate to the server directory**:
    ```bash
    cd server
    ```

2.  **Create a virtual environment**:
    ```bash
    python -m venv env
    ```

3.  **Activate the virtual environment**:
    - **Windows**: `.\env\Scripts\activate`
    - **macOS/Linux**: `source env/bin/activate`

4.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

5.  **Configure Environment Variables**:
    Create a `.env` file in the `server` directory and add your credentials:
    ```env
    MONGODB_URL=your_mongodb_uri
    GROQ_API_KEY=your_groq_api_key
    DB_NAME=devprofile
    ```

6.  **Run the server**:
    ```bash
    python main.py
    ```
    The API will be available at `http://localhost:8000`.

---

## Client Setup (Vite + React)

1.  **Navigate to the client directory**:
    ```bash
    cd client
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure API for Localhost**:
    To point the client to your local server, ensure `client/src/services/api.js` is set to use the local proxy or direct URL:
    
    In `client/src/services/api.js`:
    ```javascript
    const api = axios.create({
        baseURL: 'http://localhost:8000/api',
        // ... headers
    });
    ```
    *(Note: For production/live, this is currently pointed to Render.)*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## Project Structure

- `/client`: React frontend built with Vite and Tailwind CSS.
- `/server`: FastAPI backend with MongoDB (Motor) and Groq AI integration.



# 📌 Project Overview

This project demonstrates **end-to-end full-stack development**, including:

* Responsive frontend UI
* RESTful backend APIs
* Database integration
* AI-powered automation features

The application allows users to **view, edit, and enhance their developer profile** with intelligent tools.

---

# 🧰 Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios

## Backend

* FastAPI
* Python

## Database

* MongoDB
* Motor (Async MongoDB Driver)

## AI Integration

* Groq LLM API

## Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway
* Database: MongoDB Atlas

---

# ✨ Core Features (Replica Requirements)

## 1. Profile Page UI

The application recreates the **Gidy profile interface** with a modern and responsive design.

The profile page displays:

* Profile picture
* Name
* Bio
* Skills
* Social links
* Work timeline

The UI is implemented using **React and Tailwind CSS** for a clean and responsive layout.

---

## 2. Backend API

A RESTful API built using **FastAPI** manages profile data.

### Main API Endpoints

**Get Profile**

```
GET /api/profile
```

Fetch user profile data.

**Update Profile**

```
PUT /api/profile
```

Update profile information.

**Add Skill**

```
POST /api/skills
```

Add a new skill.

**Delete Skill**

```
DELETE /api/skills/{skill}
```

Remove a skill.

The API communicates with **MongoDB** to store and retrieve profile information.

---

## 3. Database

Profile information is stored in **MongoDB**.

Example document structure:

```json
{
  "name": "John Doe",
  "bio": "Full Stack Developer",
  "location": "Chennai",
  "skills": ["Python", "FastAPI", "React"],
  "social_links": {
    "github": "",
    "linkedin": "",
    "portfolio": ""
  },
  "timeline": [
    {
      "year": "2025",
      "role": "Backend Developer"
    }
  ]
}
```

---

## 4. Edit Mode

The profile page includes an **Edit Mode** allowing users to update their information.

Users can modify:

* Name
* Bio
* Profile picture
* Skills
* Social links
* Work timeline

Changes are sent to the backend API and stored in the database.

---

# 💡 Innovation Features

To enhance the profile experience beyond a simple clone, two **AI-powered features** were implemented.

These innovations reduce manual effort and improve the quality of user profiles.

---

# 🧠 1. Tag-Based AI Profile Summary Generator

Users can generate a **professional profile summary** by entering skill tags.

Example tags:

```
Python
FastAPI
Machine Learning
React
```

The backend sends these tags to the **Groq LLM API**, which generates a concise developer summary.

Example generated summary:

> Full-stack developer specializing in Python and scalable backend systems using FastAPI, with experience building modern web applications using React.

### API Endpoint

```
POST /api/generate-summary
```

Request:

```json
{
  "tags": ["Python", "FastAPI", "Machine Learning"]
}
```

---

# 📄 2. Resume Upload with Automatic Profile Parsing and ATS Score

Users can upload their **resume (PDF)** and the system automatically:

* Extracts text from the resume
* Uses the Groq LLM to parse structured information
* Auto-fills the profile fields
* Generates an ATS compatibility score

This helps users quickly create profiles and understand how optimized their resumes are for recruitment systems.

### Example ATS Output

```
ATS Score: 82 / 100
```

### ATS Score Factors

* Keyword relevance
* Skill coverage
* Resume structure
* Content readability

### API Endpoint

```
POST /api/parse-resume
```

Request format:

```
multipart/form-data
resume: resume.pdf
```

Example response:

```json
{
  "profile_data": {
    "name": "John Doe",
    "skills": ["Python", "FastAPI"]
  },
  "ats_score": 82
}
```

---

# 📁 Project Structure

```
project-root
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ProfileCard.jsx
│   │   │   SkillsList.jsx
│   │   │   Timeline.jsx
│   │   │   EditProfileModal.jsx
│   │   │
│   │   ├── pages
│   │   │   ProfilePage.jsx
│   │   │
│   │   ├── services
│   │   │   api.js
│   │   │
│   │   └── App.jsx
│
├── server
│   ├── routes
│   │   profile_routes.py
│   │
│   ├── models
│   │   profile.py
│   │
│   ├── database
│   │   db.py
│   │
│   └── main.py
```

---

# ⚙️ Local Setup Instructions

## Server Setup (FastAPI)

Navigate to server directory

```
cd server
```

Create virtual environment

```
python -m venv env
```

Activate environment

Windows

```
.\env\Scripts\activate
```

Mac / Linux

```
source env/bin/activate
```

Install dependencies

```
pip install -r requirements.txt
```

Create `.env` file

```
MONGODB_URL=your_mongodb_uri
GROQ_API_KEY=your_groq_api_key
DB_NAME=devprofile
```

Run server

```
python main.py
```

Server runs at

```
http://localhost:8000
```

---

## Client Setup (React + Vite)

Navigate to client directory

```
cd client
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 📊 Evaluation Focus

This project demonstrates:

* Clean and modular code structure
* Proper system design and API architecture
* Responsive UI design
* AI-powered product innovation

---

# 📜 License

This project was developed for the **Gidy Full-Stack Technical Challenge (2026)**.

