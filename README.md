# 🛡️ ThreatGuard AI

> **AI‑Powered Cybersecurity Assistant**
> Scan files, discover trusted cybersecurity resources, and learn how to stay safe online — all in one clean, beginner‑friendly platform.

---

![ThreatGuard AI Banner](./assets/banner.png)

## 🚀 Project Overview

**ThreatGuard AI** is a modern cybersecurity web application designed for **students, beginners, and security enthusiasts**.
It combines a **FastAPI backend** with **Google Gemini AI** to deliver intelligent file analysis, curated cybersecurity resources, and easy‑to‑understand safety education.

🔹 Simple UI
🔹 Dark, professional theme
🔹 Beginner‑friendly explanations
🔹 AI‑assisted insights

---

## ✨ Key Features

### 🔍 AI File Scanner

Upload any file and get an instant AI‑assisted security analysis.

**What you see:**

* File name & type
* File size
* SHA‑256 hash
* AI verdict: **Safe / Suspicious / Risky**
* Plain‑English explanation

![File Scanner Screenshot](./assets/file-scan.png)

---

### 🌐 Cybersecurity Websites Finder

Search for cybersecurity topics and get **trusted website recommendations**.

**Each result includes:**

* Website name
* Short description
* Category tag (Learning / Tools / News)
* Direct visit button

![Websites Finder Screenshot](./assets/websites.png)

---

### 📘 Learn to Stay Safe

A clean learning section with essential cyber‑safety topics.

**Topics include:**

* Password Security
* Phishing Awareness
* Safe Downloads
* Secure Browsing
* Online Payments
* Social Media Safety
* Device Security

![Learning Section Screenshot](./assets/learn.png)

---

## 🧱 Tech Stack

### Backend

* **FastAPI** – high‑performance Python backend
* **Uvicorn** – ASGI server
* **Google Gemini API** – AI analysis & recommendations

### Frontend

* HTML5
* CSS3 (Dark UI)
* Vanilla JavaScript

---

## 🗂️ Project Structure

```
ThreatGuard-AI/
│
├── backend/
│   ├── main.py
│   ├── routes/
│   │   ├── scan.py
│   │   ├── learn.py
│   ├── services/
│   │   └── gemini_service.py
│
├── frontend/
│   ├── index.html
│   ├── scan.html
│   ├── learn.html
│   ├── websites.html
│   ├── css/
│   └── js/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Tusharsinghchauh/ThreatGuard-AI.git
cd ThreatGuard-AI
```

### 2️⃣ Backend Setup

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

Run the backend:

```bash
uvicorn main:app --reload
```

### 3️⃣ Frontend

Simply open:

```
frontend/index.html
```

---

## 🧠 AI Disclaimer

All AI results are **assistive**, not guarantees.
Always use professional tools for critical security decisions.

---

## 📌 Future Improvements

* VirusTotal integration
* Authentication & user dashboard
* Report download (PDF)
* Advanced malware classification
* Migration to `google.genai`

---

## 👨‍💻 Author

**Tushar Singh Chauhan**
Cybersecurity & AI Enthusiast

* GitHub: [https://github.com/Tusharsinghchauh](https://github.com/Tusharsinghchauh)

---

## ⭐ Support

If you like this project, don’t forget to **star ⭐ the repository**!

> *Built with FastAPI · Powered by Google Gemini AI*
