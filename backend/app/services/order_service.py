from app.models import order
from app.repositories.order_repo import OrderRepository
from app.repositories.customer_repo import CustomerRepository
from app.repositories.product_repo import ProductRepository


class OrderService:
    @staticmethod
    def get_all_orders():
        return OrderRepository.get_all()

    @staticmethod
    def get_order_by_id(order_id):
        order = OrderRepository.get_by_id(order_id)
        if not order:
            raise ValueError("Order not found")
        return order

    @staticmethod
    def create_order_by_id(data):
        return OrderRepository.create(data)

    @staticmethod
    def update_order_by_id(order_id, data):
        update_order = OrderRepository.update(order_id, data)
        if not update_order:
            raise ValueError("Order not found")
        return update_order

    @staticmethod
    def delete_order(order_id):
        deleted = OrderRepository.delete(order_id)
        if not deleted:
            raise ValueError("Order not found")
        return True
