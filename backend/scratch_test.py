import os
from sqlalchemy import create_engine, text
import urllib.parse

try:
    password = urllib.parse.quote_plus("Guhan@123")
    engine = create_engine(f'postgresql://postgres:{password}@localhost:5432/animal_detection_db')
    conn = engine.connect()
    res = conn.execute(text('SELECT * FROM "user"')).fetchall()
    print(f'Found {len(res)} users in local DB.')
    for row in res:
        print(f"ID: {row[0]}, Name: {row[1]}, Mobile: {row[2]}, Role: {row[4]}")
        
    alerts = conn.execute(text('SELECT * FROM "alert"')).fetchall()
    print(f'Found {len(alerts)} alerts in local DB.')
except Exception as e:
    print(f"Error connecting to local DB: {e}")
