from flask import Blueprint, request, jsonify
from app.services.order_service import OrderService

orders_bp = Blueprint('orders', __name__, url_prefix='/orders')


@orders_bp.route('/', methods=['GET'])
def get_all_orders():
    orders = OrderService.get_all_orders()
    orders_data = []
    for order in orders:
        order_data = {
            'id': order.id,
            'customer_id': order.customer_id,
            'status': order.status,
            'products': [
                {
                    'product_id': op.product.id,
                    'name': op.product.name,
                    'price': op.product.price,
                    'quantity': op.quantity
                }
                for op in order.order_products
            ]
        }
        orders_data.append(order_data)
    return jsonify(orders_data), 200


@orders_bp.route('/<int:order_id>', methods=['GET'])
def get_order_by_id(order_id):
    try:
        order = OrderService.get_order_by_id(order_id)
        order_data = {
            'id': order.id,
            'customer_id': order.customer_id,
            'status': order.status,
            'products': [
                {
                    'product_id': op.product.id,
                    'name': op.product.name,
                    'price': op.product.price,
                    'quantity': op.quantity
                } for op in order.order_products
            ]
        }
        return jsonify(order_data), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404


@orders_bp.route('/', methods=['POST'])
def create_order():
    data = request.get_json()
    try:
        new_order = OrderService.create_order_by_id(data)
        order_data = {
            'id': new_order.id,
            'customer_id': new_order.customer_id,
            'products': [
                {
                    'product_id': op.product.id,
                    'name': op.product.name,
                    'price': op.product.price,
                    'quantity': op.quantity
                } for op in new_order.order_products
            ]
        }
        return jsonify(order_data), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@orders_bp.route('/<int:order_id>', methods=['PUT'])
def update_order_by_id(order_id):
    data = request.get_json()
    try:
        updated_order = OrderService.update_order_by_id(order_id, data)
        order_data = {
            'id': updated_order.id,
            'customer_id': updated_order.customer_id,
            'status': updated_order.status,
        }
        return jsonify(order_data), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@orders_bp.route('/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    try:
        OrderService.delete_order(order_id)
        return jsonify({'message': f'Order {order_id} deleted successfully'}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
