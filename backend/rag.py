import uuid
import requests
from db import collection
from embedding import get_embedding


# ---------------------------
# Store
# ---------------------------
def store_documents(chunks):
    embeddings = get_embedding(chunks)
    ids = [str(uuid.uuid4()) for _ in chunks]

    collection.add(documents=chunks, embeddings=embeddings, ids=ids)


# ---------------------------
# Retrieve
# ---------------------------
def retrieve(query, k=3):
    query_embedding = get_embedding([query])[0]

    results = collection.query(query_embeddings=[query_embedding], n_results=k)

    docs = results.get("documents", [])

    if not docs or not docs[0]:
        return []

    return docs[0]


# ---------------------------
# Generate Answer (Ollama)
# ---------------------------
def generate_answer(query):
    docs = retrieve(query)

    if not docs:
        return "No relevant information found in the document."

    context = "\n".join(docs)

    prompt = f"""
You are a precise assistant. Answer ONLY using the given context.

If the answer is not present, say: "Not found in document".

Context:
{context}

Question:
{query}

Answer (concise and factual):
"""

    try:
        res = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "mistral", "prompt": prompt, "stream": False},
            timeout=30,
        )

        if res.status_code != 200:
            return f"LLM error: {res.text}"

        data = res.json()
        return {
            "answer": data.get("response", "No response from model."),
            "sources": docs,
        }

    except requests.exceptions.RequestException as e:
        return f"Error connecting to LLM: {str(e)}"
