from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import scan
from routes import websites
from routes import learn




app = FastAPI(
    title="AI Cyber Security Assistant",
    description="An AI-powered assistant to help with cyber security tasks.",
    version="1.0.0",
)

app.include_router(scan.router)
app.include_router(websites.router)
app.include_router(learn.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Path to frontend folder (sibling of Backend)
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..", "Frontend")

# Serve CSS and JS assets
app.mount("/css", StaticFiles(directory=os.path.join(FRONTEND_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(FRONTEND_DIR, "js")), name="js")

# Serve main pages via explicit routes to avoid conflicts with API paths
@app.get("/")
def index():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

@app.get("/website.html")
def website_page():
    return FileResponse(os.path.join(FRONTEND_DIR, "website.html"))

@app.get("/scan.html")
def scan_page():
    return FileResponse(os.path.join(FRONTEND_DIR, "scan.html"))

@app.get("/api-info")
def api_info():
    return {"message": "Welcome to the AI Cyber Security Assistant API!"}