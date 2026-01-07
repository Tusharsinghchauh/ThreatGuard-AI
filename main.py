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

import os
from fastapi.staticfiles import StaticFiles

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "Frontend")

if os.path.exists(os.path.join(FRONTEND_DIR, "css")):
    app.mount(
        "/css",
        StaticFiles(directory=os.path.join(FRONTEND_DIR, "css")),
        name="css"
    )


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
