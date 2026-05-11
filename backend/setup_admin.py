import os
from dotenv import load_dotenv
load_dotenv('e:\\Animal Detection and Alerting System\\backend\\.env')

from app import app, db, User

def setup_db_and_admin():
    with app.app_context():
        try:
            print("Creating database tables...")
            db.create_all()
            print("Tables created successfully!")
            
            # Check if admin already exists
            admin_mobile = "9999999999"
            existing_admin = User.query.filter_by(mobile_number=admin_mobile).first()
            
            if not existing_admin:
                print("Creating admin account...")
                new_admin = User(
                    name="Admin User",
                    mobile_number=admin_mobile,
                    password="admin",
                    role="admin"
                )
                db.session.add(new_admin)
                db.session.commit()
                print(f"Admin account created! Mobile: {admin_mobile}, Password: admin")
            else:
                print(f"Admin account already exists! Mobile: {existing_admin.mobile_number}, Password: {existing_admin.password}")
                
        except Exception as e:
            print(f"Error setting up database: {e}")

if __name__ == '__main__':
    setup_db_and_admin()
