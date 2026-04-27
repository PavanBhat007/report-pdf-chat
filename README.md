# 📄 PDF RAG System

Upload PDFs and query them using an open-source LLM (Mistral via Ollama).

---

## 🧰 Requirements

Install:

* **Node.js** (>= 18)
* **Python** (>= 3.9)
* **pip**

---

## ⚙️ 1. Install & Run Ollama (LLM)

### Install

**Mac**

```bash
brew install ollama
```

**Linux**

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows**

* Download from: https://ollama.com/download
* Install the `.exe`
* It will run as a background service

---

### Start Ollama

**Mac/Linux**

```bash
ollama serve
```

**Windows**

* Ollama usually starts automatically after install
* If not, open **Command Prompt / PowerShell**:

```bash
ollama serve
```

---

### Download model

```bash
ollama pull mistral
```

(Optional test)

```bash
ollama run mistral
```

---

## 🖥️ 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv .venv
```

### Activate virtual environment

**Mac/Linux**

```bash
source .venv/bin/activate
```

**Windows (CMD)**

```bash
.venv\Scripts\activate
```

**Windows (PowerShell)**

```bash
.venv\Scripts\Activate.ps1
```

---

### Install dependencies

```bash
pip install fastapi uvicorn chromadb pymupdf sentence-transformers requests
```

---

### Run backend

```bash
uvicorn main:app --reload
```

Runs at:

```
http://localhost:8000
```

---

## 💻 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

## ▶️ Run Everything (order matters)

1. Start Ollama

```bash
ollama serve
```

2. Start backend

```bash
cd backend
uvicorn main:app --reload
```

3. Start frontend

```bash
cd frontend
npm run dev
```

---

## 🧪 Usage

1. Open frontend in browser
2. Upload a PDF
3. Ask questions like:

   * "What is the total amount?"
   * "Who is billed?"

---

## ⚠️ Common Issues

**LLM not responding**

```bash
ollama serve
```

**First run is slow**

* Mistral downloads ~4–5GB (one-time)

**PowerShell script blocked (Windows)**
Run:

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Empty answers**

* PDF may not contain extractable text (scanned PDFs need OCR)

---

## 📌 Notes

* Uses ChromaDB (local vector DB)
* Uses sentence-transformers for embeddings
* If answer not found → returns:

```
Not found in document
```

---

## ✅ Done

If all 3 services are running (Ollama → Backend → Frontend), the system should work end-to-end.
