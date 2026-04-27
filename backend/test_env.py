import os
import requests
from dotenv import load_dotenv

load_dotenv()

bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
chat_id = os.environ.get('TELEGRAM_CHAT_ID')

print(f"Token Found: {'Yes' if bot_token else 'No'}")
print(f"Chat ID Found: {'Yes' if chat_id else 'No'}")

if bot_token and chat_id:
    print("Testing direct Telegram connection...")
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": "🚨 TEST MESSAGE: Telegram API is configured correctly!"
    }
    
    try:
        res = requests.post(url, json=payload)
        print(f"Telegram API Status: {res.status_code}")
        print(f"Telegram API Response: {res.text}")
    except Exception as e:
        print(f"Error connecting: {e}")
else:
    print("Ensure you have saved the .env file with both TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID!")
