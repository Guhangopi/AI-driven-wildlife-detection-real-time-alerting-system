import os
from dotenv import load_dotenv
load_dotenv('e:\\Animal Detection and Alerting System\\backend\\.env')

from app import app, db, User

def update_admin():
    with app.app_context():
        try:
            # Find the admin user
            admin = User.query.filter_by(mobile_number="9999999999").first()
            if admin:
                admin.mobile_number = "1234567890"
                admin.password = "admin123"
                db.session.commit()
                print("Successfully updated admin credentials!")
                print(f"New Mobile: {admin.mobile_number}")
                print(f"New Password: {admin.password}")
            else:
                # In case they already changed it or the query fails
                admin_by_role = User.query.filter_by(role="admin").first()
                if admin_by_role:
                    admin_by_role.mobile_number = "1234567890"
                    admin_by_role.password = "admin123"
                    db.session.commit()
                    print("Found admin by role and updated credentials!")
                    print(f"New Mobile: {admin_by_role.mobile_number}")
                    print(f"New Password: {admin_by_role.password}")
                else:
                    print("Could not find any admin user to update.")
                
        except Exception as e:
            print(f"Error updating database: {e}")

if __name__ == '__main__':
    update_admin()
