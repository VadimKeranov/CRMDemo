from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from app.repositories.product_repo import ProductRepository
from app.services.product_service import ProductService

products_bp = Blueprint('products', __name__, url_prefix='/products')


@products_bp.route('/', methods=['GET'])
def get_all_products():
    name = request.args.get("name", type=str)
    min_price = request.args.get("min_price", type=float)
    max_price = request.args.get("max_price", type=float)
    products = ProductRepository.get_filtered(name, min_price, max_price)  # category

    # Возвращаешь продукты
    return jsonify([product.to_dict() for product in products]), 200


@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    try:
        product = ProductService.get_product_by_id(product_id)
        return jsonify(product.to_dict()), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404


@products_bp.route('/', methods=['POST'])
@jwt_required()
def create_product():
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"error": "Not admin"}), 403
    data = request.get_json()
    try:
        product = ProductService.create_product(data)
        return jsonify(product.to_dict()), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@products_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"error": "Not admin"}), 403
    data = request.get_json()
    try:
        product = ProductService.update_product(product_id, data)
        return jsonify(product.to_dict()), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@products_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"error": "Not admin"}), 403
    try:
        ProductService.delete_product(product_id)
        return jsonify({'message': f'Product {product_id} deleted successfully'}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
