from flask_jwt_extended import create_access_token

from app.extensions import bcrypt
from app.repositories.user_repo import get_user_by_username
from app.repositories.user_repo import create_user


def register_user(username, password, role="user"):
    if get_user_by_username(username):
        raise Exception("Username already exists")
    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    user = create_user(username, pw_hash, role)
    return user.to_dict()


def login_user(username, password):
    user = get_user_by_username(username)
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        raise Exception("Invalid credentials")
    # identity — только строка или число (например, id)
    token = create_access_token(
        identity=str(user.id),  # или просто user.id
        additional_claims={
            "username": user.username,
            "role": user.role
        }
    )
    return {"access_token": token}