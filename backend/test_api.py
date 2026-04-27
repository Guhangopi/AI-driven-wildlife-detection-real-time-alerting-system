import requests

print("--- Simulating an AI Detection ---")
payload = {
    "location": "Main Gate (Camera 1)",
    "description": "Automated Detection: Leopard",
    "species": "Leopard",
    "distance": 32.5
}
try:
    response = requests.post("http://localhost:5000/api/iot/alert", json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error connecting to backend: {e}")
