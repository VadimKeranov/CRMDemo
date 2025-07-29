from flask import Flask

from flask_cors import CORS

from app.api.auth import auth_bp
from app.api.customers import customers_bp
from app.api.orders import orders_bp
from app.api.products import products_bp
from app.repositories.user_repo import create_user, get_user_by_username
from config import Config
from app.extensions import db, jwt, bcrypt


# импорт других blueprints при создании

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    CORS(app)

    with app.app_context():
        db.create_all()
        if not get_user_by_username("admin2"):
            pw_hash = bcrypt.generate_password_hash("123456").decode("utf-8")
            create_user("admin2", pw_hash, "admin")

    app.register_blueprint(auth_bp)
    app.register_blueprint(orders_bp)
    app.register_blueprint(customers_bp)
    app.register_blueprint(products_bp)

    return app
