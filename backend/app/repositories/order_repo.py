from app.extensions import db
from app.models.order import Order
from app.models.order_product import OrderProduct


class OrderRepository:
    @staticmethod
    def get_all():
        return Order.query.all()

    @staticmethod
    def get_by_id(order_id):
        return Order.query.get(order_id)

    @staticmethod
    def create(data):
        customer_id = data['customer_id']
        products_data = data['products']

        new_order = Order(customer_id=customer_id)
        db.session.add(new_order)
        db.session.flush()

        for item in products_data:
            product_id = item['product_id']
            quantity = item['quantity']
            order_product = OrderProduct(order_id=new_order.id, product_id=product_id, quantity=quantity)
            db.session.add(order_product)

        db.session.commit()
        return new_order

    @staticmethod
    def update(order_id, data):
        update_order = Order.query.get(order_id)
        if not update_order:
            return False
        if 'status' in data:
            update_order.status = data['status']
        db.session.commit()
        return update_order

    @staticmethod
    def delete(order_id):
        order = Order.query.get(order_id)
        if order:
            db.session.delete(order)
            db.session.commit()
            return True
        return False
