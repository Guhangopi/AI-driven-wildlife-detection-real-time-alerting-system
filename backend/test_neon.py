import os
from dotenv import load_dotenv
load_dotenv('e:\\Animal Detection and Alerting System\\backend\\.env')

from app import app, db, User

with app.app_context():
    users = User.query.all()
    print(f"Connected to: {app.config['SQLALCHEMY_DATABASE_URI']}")
    print(f"Found {len(users)} users.")
    for u in users:
        print(f"User: {u.mobile_number}, Pass: {u.password}, Role: {u.role}")
