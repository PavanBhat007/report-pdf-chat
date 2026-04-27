from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from utils import extract_text_from_pdf, chunk_text
from rag import store_documents, generate_answer
from db import collection

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    text = extract_text_from_pdf(file_path)

    # Chunk
    chunks = chunk_text(text)

    # Store in vector DB
    store_documents(chunks)

    return {"message": "File processed successfully"}


@app.post("/query")
async def query(data: dict):
    query = data.get("query")

    llm_response = generate_answer(query)
    answer = llm_response.get("answer", "No answer from LLM")

    return {"answer": answer}


@app.get("/debug/search")
def debug_search(q: str):
    results = collection.query(
        query_texts=[q],
        n_results=5
    )

    return {
        "query": q,
        "results": results["documents"]
    }
