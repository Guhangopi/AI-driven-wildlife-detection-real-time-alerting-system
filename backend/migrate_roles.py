import os
from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

load_dotenv(override=True)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mobile_number = db.Column(db.String(15))
    role = db.Column(db.String(20))

with app.app_context():
    print("--- Database Roles ---")
    users = User.query.all()
    for u in users:
        print(f"Mobile: {u.mobile_number}, Role: {u.role}")
    
    # Check if we need to update
    updated = False
    for u in users:
        if u.role in ['student', 'staff']:
            print(f"Migrating {u.mobile_number} from '{u.role}' to 'user'...")
            u.role = 'user'
            updated = True
    
    if updated:
        db.session.commit()
        print("Migration complete!")
    else:
        print("No migration needed.")
