from app.extensions import db
from app.models.product import Product


class ProductRepository:
    @staticmethod
    def get_all():
        return Product.query.all()

    @staticmethod
    def get_by_id(product_id):
        return Product.query.get(product_id)

    @staticmethod
    def create(data):
        new_product = Product(
            name=data['name'],
            price=data['price'],
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product

    @staticmethod
    def update(product_id, data):
        update_product = Product.query.get(product_id)
        if not update_product:
            return False

        update_product.name = data['name']
        update_product.price = data['price']
        db.session.add(update_product)
        db.session.commit()
        return update_product

    @staticmethod
    def delete(product_id):
        product = Product.query.get(product_id)
        if product:
            db.session.delete(product)
            db.session.commit()
            return True
        return False

    @staticmethod
    def get_filtered(name=None, min_price=None, max_price=None):  # category=None
        query = Product.query
        if name:
            query = query.filter(Product.name.ilike(f"%{name}%"))
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        # if category:
        #     query = query.filter(Product.category == category)
        return query.all()
