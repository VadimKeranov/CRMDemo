from app.extensions import db
from app.models.base import Person


class Customer(Person):
    __tablename__ = 'customers'
    phone = db.Column(db.String(20), unique=True)

    def __repr__(self):
        return f"<Customer {self.name}>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
        }