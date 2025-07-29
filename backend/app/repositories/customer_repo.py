from app.models.customer import Customer
from app.extensions import db


class CustomerRepository:
    @staticmethod
    def get_all():
        return Customer.query.all()

    @staticmethod
    def get_by_id(customer_id):
        return Customer.query.get(customer_id)

    @staticmethod
    def create(data):
        new_customer = Customer(name=data['name'], email=data['email'], phone=data['phone'])
        db.session.add(new_customer)
        db.session.commit()
        return new_customer

    @staticmethod
    def update(customer_id, data):
        update_customer = Customer.query.get(customer_id)
        if not update_customer:
            return None

        update_customer.name = data['name']
        update_customer.email = data['email']
        update_customer.phone = data['phone']
        db.session.commit()
        return update_customer


    @staticmethod
    def delete(customer_id):
        customer = Customer.query.get(customer_id)
        if customer:
            db.session.delete(customer)
            db.session.commit()
            return True
        return False

