import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://tvguide:3ykKgJnDT4DefanQli84Pg9YscXjOSz3@dpg-cqjt8c2j1k6c73a3khb0-a.frankfurt-postgres.render.com/tvguide2')
    ENVIRONMENT = os.getenv('APP_ENV', 'development')
    SECRET_KEY = '0702766694'
    TMDB_BASE_URL = "https://api.themoviedb.org/3"
    TMDB_API_KEY = "e407ef47003f178633c02269142f8b86"

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    WTF_CSRF_ENABLED = False
