from app.extensions import db


class OrderProduct(db.Model):
    __tablename__ = 'order_products'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer)

    order = db.relationship('Order', back_populates='order_products')
    product = db.relationship('Product')

    def __repr__(self):
        return f"<OrderProduct OrderID={self.order_id}, ProductID={self.product_id}, Qty={self.quantity}>"
