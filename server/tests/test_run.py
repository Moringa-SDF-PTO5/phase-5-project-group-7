import pytest
from app import create_app, db
from app.models import User, Club, Post

@pytest.fixture
def app():
    app = create_app('testing')  # Ensure you have a testing config
    with app.app_context():
        yield app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def init_database(app):
    db.create_all()
    yield
    db.drop_all()

def test_user_registration(client, init_database):
    response = client.post('/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'testpassword'
    })
    assert response.status_code == 201
    assert b'User registered successfully' in response.data

def test_user_login(client, init_database):
    client.post('/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'testpassword'
    })
    response = client.post('/login', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert response.status_code == 200
    assert b'Login successful' in response.data

def test_get_clubs(client, init_database):
    response = client.get('/clubs')
    assert response.status_code == 200
    assert isinstance(response.json, list)  # Expecting a list of clubs

def test_create_club(client, init_database):
    client.post('/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'testpassword'
    })
    client.post('/login', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    response = client.post('/club', json={
        'name': 'Test Club',
        'genre': 'Drama'
    })
    assert response.status_code == 201
    assert b'Club created successfully' in response.data
