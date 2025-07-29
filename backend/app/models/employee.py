from app.extensions import db
from app.models.base import Person


class Employee(Person):
    __tablename__ = 'employees'
    position = db.Column(db.String(50))

    def __repr__(self):
        return f"<Employee {self.name}, {self.position}>"
