from app.extensions import db


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    status = db.Column(db.String(20), default='Created')

    customer = db.relationship('Customer', backref=db.backref('orders', lazy=True))
    order_products = db.relationship('OrderProduct', back_populates='order', lazy=True)  # 💡 теперь так

    def __repr__(self):
        return f"<Order {self.id}, Customer {self.customer.name}>"
