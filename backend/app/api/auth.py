from flask import Blueprint, request, jsonify

from app.services.auth_service import register_user, login_user

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


@auth_bp.route('/register/', methods=['POST'])
def register():
    data = request.get_json()
    try:
        user = register_user(data["username"], data["password"], data.get("role", "user"))
        return jsonify(user), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route('/login/', methods=['POST'])
def login():
    data = request.get_json()
    try:
        token = login_user(data["username"], data["password"])
        return jsonify(token), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401
