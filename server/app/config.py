import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL', 
        'postgresql://tvguide:DchPLbl8WHpHq0rbmtIba68hz80p8obi@dpg-cqlsjul2ng1s73e88tsg-a.frankfurt-postgres.render.com/tvguide2_ah49')
    ENVIRONMENT = os.getenv('APP_ENV', 'development')
    SECRET_KEY = '.'
    TESTING = True

    TMDB_BASE_URL = "https://api.themoviedb.org/3"
    TMDB_API_KEY = "."

    