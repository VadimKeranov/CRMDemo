from app.extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default="user")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role,
        }
