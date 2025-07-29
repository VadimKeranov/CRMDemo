from app.extensions import db


class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<Product {self.name}, ${self.price}>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
        }
