import pytest
from app import create_app, db

@pytest.fixture
def client():
    app = create_app('testing')
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            print("Database tables created")
        yield client
        with app.app_context():
            db.drop_all()
            print("Database tables dropped")

def test_user_registration(client):
    response = client.post('/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'testpassword'
    })
    print(f"Registration response status code: {response.status_code}")
    print(f"Registration response data: {response.data}")
    assert response.status_code == 201
    assert b'User created successfully' in response.data


