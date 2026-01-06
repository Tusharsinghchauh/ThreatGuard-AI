from fastapi import APIRouter, UploadFile, File
from utils.file_utils import generate_sha256
from services.gemini_service import analyze_file_with_ai

router = APIRouter(prefix="/scan",tags=["File Scanning"])

scanned_files = set()
@router.post("/upload")
async def scan_file(file: UploadFile=File(...)):

    
    file_bytes = await file.read()
    file_hash = generate_sha256(file_bytes)

    if file_hash in scanned_files:
        return {
            "message": "File already scanned."
        }
    
    else:
        scanned_files.add(file_hash)

        file_info={

        "filename":file.filename,
        "content_type":file.content_type,
        "file_size":len(file_bytes),
        "sha256_hash":generate_sha256(file_bytes),
        "status":"safe",
        "explaination":"No threats detected.",


    }
    
    ai_result=analyze_file_with_ai(file_info)

    return {
        **file_info,
        "Status":ai_result["risk_level"],
        "Explaination":ai_result["explanation"]
    }



    

    
    
   