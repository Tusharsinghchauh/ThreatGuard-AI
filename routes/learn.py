from fastapi import APIRouter, Query

router = APIRouter(prefix="/learn", tags=["Learn Cyber Safety"])

CONTENT = {
    "passwords": {
        "title": "Password Security",
        "intro": "Strong passwords help protect your online accounts.",
        "tips": [
            "Use long passwords with letters, numbers, and symbols",
            "Never reuse the same password on multiple sites",
            "Use a password manager if possible",
            "Enable two-factor authentication (2FA)"
        ],
        "websites": [
            "https://www.cyberaware.gov.in",
            "https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online",
            "https://haveibeenpwned.com/passwords"
        ]
    },

    "phishing": {
        "title": "Phishing Awareness",
        "intro": "Phishing attacks try to trick you into sharing sensitive information.",
        "tips": [
            "Do not click unknown or suspicious links",
            "Check the sender’s email address carefully",
            "Never share OTPs, passwords, or recovery codes",
            "Report phishing emails immediately"
        ],
        "websites": [
            "https://www.consumer.ftc.gov/scams",
            "https://www.cybercrime.gov.in",
            "https://www.phishing.org"
        ]
    },

    "browsing": {
        "title": "Safe Browsing",
        "intro": "Unsafe browsing habits can expose your device to malware.",
        "tips": [
            "Check for HTTPS before entering personal information",
            "Avoid clicking pop-up ads",
            "Do not install unknown browser extensions",
            "Use trusted and official websites only"
        ],
        "websites": [
            "https://staysafeonline.org",
            "https://www.kaspersky.com/resource-center",
            "https://www.mozilla.org/en-US/security"
        ]
    },

    "downloads": {
        "title": "Safe Downloads",
        "intro": "Downloading files from unknown sources can be dangerous.",
        "tips": [
            "Download software only from official websites",
            "Avoid cracked or pirated software",
            "Scan files before opening",
            "Be careful with email attachments"
        ],
        "websites": [
            "https://www.virustotal.com",
            "https://www.microsoft.com/security",
            "https://www.av-test.org"
        ]
    },

    "payments": {
        "title": "Online Payment Safety",
        "intro": "Online transactions require extra caution to avoid fraud.",
        "tips": [
            "Use secure and trusted payment platforms",
            "Never share card details or CVV",
            "Enable transaction alerts from your bank",
            "Check your bank statements regularly"
        ],
        "websites": [
            "https://www.rbi.org.in",
            "https://www.ncsc.gov.uk/collection/phishing-scams",
            "https://www.consumerfinance.gov"
        ]
    },

    "social_media": {
        "title": "Social Media Safety",
        "intro": "Oversharing on social media can put your privacy at risk.",
        "tips": [
            "Keep your profiles private",
            "Do not share personal or location details publicly",
            "Accept friend requests only from people you know",
            "Be cautious of fake profiles"
        ],
        "websites": [
            "https://www.connectsafely.org",
            "https://staysafeonline.org/online-safety-privacy-basics",
            "https://www.cyberaware.gov.in"
        ]
    },

    "device_security": {
        "title": "Device Security",
        "intro": "Securing your devices helps prevent unauthorized access.",
        "tips": [
            "Keep your operating system and apps updated",
            "Use antivirus and firewall protection",
            "Lock your device with PIN or biometrics",
            "Avoid using public Wi-Fi for sensitive tasks"
        ],
        "websites": [
            "https://www.microsoft.com/security",
            "https://support.apple.com/security",
            "https://www.kaspersky.com/resource-center"
        ]
    }
}


@router.get("/topic")
def get_topic(name: str = Query(...)):
    return CONTENT.get(name, {"error": "Topic not found"})
