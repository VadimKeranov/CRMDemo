from app.models.product import Product
from app.repositories.product_repo import ProductRepository


class ProductService:
    @staticmethod
    def get_all_products():
        return ProductRepository.get_all()

    @staticmethod
    def get_product_by_id(product_id):
        product = ProductRepository.get_by_id(product_id)
        if not product:
            return ValueError('Product not found')
        return product

    @staticmethod
    def create_product(product_data):
        print(product_data)
        required_fields = ['name', 'price']
        for field in required_fields:
            if field not in product_data or not product_data[field]:
                raise ValueError(f'Field {field} is required')
        return ProductRepository.create(product_data)

    @staticmethod
    def update_product(product_id, data):
        update_product = ProductRepository.update(product_id, data)
        if not update_product:
            raise ValueError('Product not found')
        return update_product

    @staticmethod
    def delete_product(product_id):
        deleted = ProductRepository.delete(product_id)
        if not deleted:
            raise ValueError('Product not found')
        return True
