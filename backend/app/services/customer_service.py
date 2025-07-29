from app.extensions import db
from app.models.customer import Customer
from app.repositories.customer_repo import CustomerRepository


def validate_customer_data(data):
    required_fields = ['name', 'email']

    for field in required_fields:
        if field not in data:
            raise ValueError(f"Field '{field}' is missing in data")
        if data[field] is None:
            raise ValueError(f"Field '{field}' cannot be None")
        if isinstance(data[field], str) and data[field].strip() == '':
            raise ValueError(f"Field '{field}' cannot be empty")

    if '@' not in data['email']:
        raise ValueError("Email must contain '@'")

    phone = data.get('phone')
    if phone:
        # Убираем пробелы, дефисы, скобки, чтобы проверить только цифры
        digits_only = ''.join(filter(str.isdigit, phone))

        # Проверяем, что пользователь ввёл 10 цифр (пример: 0687677273)
        if len(digits_only) != 10:
            raise ValueError("Телефон должен содержать ровно 10 цифр (пример: 0687677273)")

        # Формируем номер с +38
        formatted_phone = '+38' + digits_only

        # Проверяем, что номер начинается с +38
        if not formatted_phone.startswith('+38'):
            raise ValueError("Телефон должен начинаться с кода страны +38")

        # Можно также заменить исходный телефон в data на форматированный
        data['phone'] = formatted_phone


def unique(data, exclude_id=None):
    query_email = db.session.query(Customer).filter(Customer.email == data['email'])
    if exclude_id:
        query_email = query_email.filter(Customer.id != exclude_id)
    if query_email.first():
        raise ValueError('Email already registered')

    phone = data.get('phone')
    if phone:
        query_phone = db.session.query(Customer).filter(Customer.phone == phone)
        if exclude_id:
            query_phone = query_phone.filter(Customer.id != exclude_id)
        if query_phone.first():
            raise ValueError('Phone already registered')


class CustomerService:
    @staticmethod
    def get_all_customers():
        return CustomerRepository.get_all()

    @staticmethod
    def get_customer_by_id(customer_id):
        customer = CustomerRepository.get_by_id(customer_id)
        if not customer:
            raise ValueError('Customer not found')
        return customer

    @staticmethod
    def create_customer(data):
        validate_customer_data(data)
        unique(data)
        return CustomerRepository.create(data)

    @staticmethod
    def update_customer_by_id(customer_id, data):
        validate_customer_data(data)
        unique(data)
        customer = CustomerRepository.update(customer_id, data)
        if not customer:
            raise ValueError('Customer not found')
        return customer


    @staticmethod
    def delete_customer_by_id(customer_id):
        delete = CustomerRepository.delete(customer_id)
        if not delete:
            raise ValueError('Customer not found')
        return True
