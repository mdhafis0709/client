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
