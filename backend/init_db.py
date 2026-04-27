
from app import app, db

def init_database():
    with app.app_context():
        try:
            db.drop_all() # CAUTION: This deletes all data!
            db.create_all()
            print("Successfully initialized the database and created tables.")
        except Exception as e:
            print(f"Error initializing database: {e}")

if __name__ == "__main__":
    init_database()
