from fastapi import APIRouter, Query
from services.gemini_service import model

router = APIRouter(prefix="/websites", tags=["websites"])

@router.get("/search")
async def search_website(query: str = Query(..., description="The URL of the website to analyze")):
    prompt = f"""
You are a cybersecurity education expert and AI research assistant.

Task:
Recommend exactly 5 high-quality, trustworthy cybersecurity websites related to the topic:
"{query}"

Selection criteria (VERY IMPORTANT):
- Content must be suitable for beginners and intermediate learners
- Websites must be legitimate, well-known, and currently active
- Avoid low-quality blogs, random forums, or unsafe domains
- Prefer official organizations, government sites, reputable companies, or recognized learning platforms

For EACH website, provide:
- A clear and concise website name
- A beginner-friendly description (1–2 lines, no jargon)
- A category from ONLY these values:
  - "Learning"
  - "Tools"
  - "News"
- A valid HTTPS URL

Output rules (STRICT):
- Respond ONLY with valid JSON
- Do NOT include explanations, comments, markdown, or extra text
- Do NOT include trailing commas
- Return exactly 5 objects in a JSON array
- Ensure URLs are realistic and relevant to the topic
- Keep descriptions simple and practical

Required JSON format:
[
  {{
    "name": "Website Name",
    "description": "Short beginner-friendly description",
    "category": "Learning / Tools / News",
    "url": "https://example.com"
  }}
]
"""


    response = model.generate_content(prompt)

    try:
        return eval(response.text)
    except Exception as e:
        return {"error": "Failed to parse AI response", "details": str(e)}  
    
