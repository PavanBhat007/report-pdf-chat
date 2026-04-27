import chromadb

client = chromadb.Client(
    settings=chromadb.config.Settings(persist_directory="./db/chroma_db")
)

collection = client.get_or_create_collection(name="documents")
