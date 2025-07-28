# 🧩 Full-Stack Web Application (React + Flask)

This is a full-stack web application consisting of:

- **Backend**: Flask API (`/server` directory)
- **Frontend**: React app (`/client` directory)

---

## 🖥️ Requirements

- **Python** 3.8 or higher  
- **Node.js** (v14+ recommended)  
- **npm** (comes with Node.js)

---

## ⚙️ Backend Setup (Flask)

### 1. Navigate to the backend folder
```bash
cd server
```

## 2. Create and activate a Python virtual environment

Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

macOS/Linux:
```bash
python -m venv venv
source venv/bin/activate
```

## 3. Install dependencies
```bash
pip install flask flask-cors
```

## 4. Run the Flask server

macOS/Linux:
```bash
export FLASK_APP=app.py
flask run
```
Windows:
```bash
set FLASK_APP=app.py
flask run

```

---
# 🌐 Frontend Setup (React)

## 1. Go to the client root (if you're not already there)
```bash
cd ..
cd client
```

## 2. Install React dependencies
```bash
npm install
```

3. Start the React development server
```bash
npm run dev
```
