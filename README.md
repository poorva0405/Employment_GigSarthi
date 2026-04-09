

# 🚀 GigSarthi


🚀 : The Hidden Reality of Gig Workers
🌍 The Story

You order food.
It arrives quickly.

But…

Have you ever wondered:

Is the worker earning enough?
Are they overworked?
Are they stable… or surviving day-to-day?

## 🌟 Project Overview

GigSarthi is an interactive full-stack platform designed to analyze and uncover insights about gig workers. The system combines **data engineering, analytics, and visualization** to help understand income patterns, workload trends, and worker stability.

🎯 Your Mission

Build a system that:

Cleans the chaos
Finds hidden patterns
Detects instability
Predicts risk

And finally…

Reveals the truth behind gig work.

This project is structured as a **feature-based challenge**, where each participant contributes by implementing specific features across:

* 🧠 **Backend (Python logic)**
* 🎨 **Frontend (React UI)**
* 🔗 **API Integration**

---

## 🧩 Project Architecture

```bash
frontend/  → React (UI)
backend/   → Node.js (API layer)
features/  → Python scripts (logic per feature)
```

---

## ⚙️ How to Run the Project

### 🔹 1. Clone the repository

```bash
git clone <repo-link>
cd GigSarthi
```

---

### 🔹 2. Run Backend

```bash
cd backend
npm install
node server.js
```

👉 Backend runs on: `http://localhost:5000`

---

### 🔹 3. Run Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

👉 Frontend runs on: `http://localhost:5173`

---

## 🎯 Your Task as a Participant

Each feature consists of **3 parts**:

---

### 🔹 1. Backend Logic (Python)

📁 Path:

```bash
backend/features/fXX.py
```

👉 You need to:

* Implement logic (scraping, cleaning, ML, etc.)
* Return output in **JSON format ONLY**

✅ Example:

```python
import json

result = {
    "status": "success",
    "data": {
        "message": "Feature executed successfully"
    }
}

print(json.dumps(result))
```

---

### 🔹 2. Frontend UI

📁 Path:

```bash
frontend/src/pages/fXX/fXX.jsx
```

👉 You need to:

* Create UI for the feature
* Add button to trigger backend
* Display output (text, table, charts, etc.)

---

### 🔹 3. Styling

📁 Path:

```bash
frontend/src/pages/fXX/fXX.css
```

👉 Optional but recommended:

* Improve UI/UX
* Make output visually appealing

---

### 🔹 4. API Integration

👉 Inside your `.jsx` file, call backend:

```javascript
const runFeature = async () => {
  const res = await fetch("http://localhost:5000/api/features/XX");
  const data = await res.json();
  console.log(data);
};
```

---

## 🖼️ Handling Graphs / Images

If your feature generates graphs:

### ✔ Save image in:

```bash
backend/outputs/
```

### ✔ Return path in JSON:

```python
result = {
    "status": "success",
    "image": "outputs/output.png"
}
```

### ✔ Display in frontend:

```jsx
<img src={`http://localhost:5000/${data.image}`} />
```

---

## ⚠️ Important Rules

### ❌ DO NOT MODIFY:


* Project structure
* Existing routing in frontend
* README.md

---

### ✅ YOU CAN MODIFY:

* `backend/features/fXX.py`
* `frontend/src/pages/fXX/fXX.jsx`
* `frontend/src/pages/fXX/fXX.css`

---

## 📌 Coding Guidelines

* Return **valid JSON only** from Python
* Do not print random logs (only JSON output)
* Keep code clean and readable
* Handle errors properly
* Follow naming conventions

---

## 🔁 Pull Request (PR) Guidelines

When submitting your work:

### ✔ PR Title:

```bash
Feature XX Implementation – <Your Name>
```

---

### ✔ PR Description MUST include:

```md
## Feature Implemented
Feature XX: <Feature Name>

## Changes Made
- Implemented logic in: backend/features/fXX.py
- Designed UI in: frontend/src/pages/fXX/fXX.jsx
- Added styling in: frontend/src/pages/fXX/fXX.css

## Output
- Describe what your feature produces

## Screenshots (if applicable)
(Add UI screenshots here)
```

---

## 🚫 Common Mistakes to Avoid

* ❌ Returning plain text instead of JSON
* ❌ Breaking folder structure
* ❌ Changing backend API logic
* ❌ Hardcoding values unnecessarily
* ❌ Not testing before PR


## 📢 Final Notes

* Focus on **clarity + correctness**
* Make your feature **meaningful and insightful**
* Think like a **product builder, not just coder**

---

💡 *More feature-specific instructions will be provided separately.*

---

### 🚀 All the best! Build something impactful.
