import os 
import google.genai as genai
from dotenv import load_dotenv


load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


model = genai.GenerativeModel("gemini-2.5-flash")

def analyze_file_with_ai(file_data: dict)->dict:

    prompt = f"""You are a cybersecurity assistant

    Analyze the following file metadata and respond in simple language.

    File name: {file_data['filename']}
    File type: {file_data['content_type']}
    File size (bytes): {file_data['file_size']}
    SHA-256 hash: {file_data['sha256_hash']}

    Respond in this exact format:
    Risk Level: <Safe / Suspicious / Risky>
    Explanation: <2-3 short sentences for beginners>"""

    response=model.generate_content(prompt)

    text=response.text

    line=text.split("\n")

    risk=line[0].replace("Risk Level: ","").strip()

    explanation=" ".join(line[1:]).replace("Explanation: ","").strip()

    return {
        "risk_level": risk, 
        "explanation": explanation
        }
