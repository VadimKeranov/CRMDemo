from app.extensions import db
from app.models.user import User


def get_user_by_username(username):
    return User.query.filter_by(username=username).first()


def create_user(username, password_hash, role="user"):
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        print(f"[INFO] User '{username}' already exists. Skipping creation.")
        return existing_user

    user = User(username=username, password_hash=password_hash, role=role)
    db.session.add(user)
    db.session.commit()
    print(f"[INFO] User '{username}' created successfully.")
    return user
