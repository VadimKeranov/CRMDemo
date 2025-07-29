from flask import Blueprint, jsonify, request

from app.services.customer_service import CustomerService

customers_bp = Blueprint('customers', __name__, url_prefix='/customers')


@customers_bp.route('/', methods=['GET'])
def get_all_customers():
    customers = CustomerService.get_all_customers()
    return jsonify([customer.to_dict() for customer in customers]), 200


@customers_bp.route('/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    try:
        customer = CustomerService.get_customer_by_id(customer_id)
        return jsonify(customer.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 404


@customers_bp.route('/', methods=['POST'])
def create_customer():
    data = request.get_json()
    try:
        new_customer = CustomerService.create_customer(data)
        return jsonify(new_customer.to_dict()), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@customers_bp.route('/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    data = request.get_json()
    try:
        customer = CustomerService.update_customer_by_id(customer_id, data)
        return jsonify(customer.to_dict()), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@customers_bp.route('/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    try:
        customer = CustomerService.get_customer_by_id(customer_id)
        CustomerService.delete_customer_by_id(customer_id)
        return jsonify({
            'message': f"Customer '{customer.name}' with email '{customer.email}' deleted successfully"
        }), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
