
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


from app import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(10000))
    profile_pic = db.Column(db.String(200), nullable=True)
    bio = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    posts = db.relationship('Post', back_populates='author', lazy=True)
    comments = db.relationship('Comment', back_populates='author', lazy='dynamic')
    ratings = db.relationship('Rating', back_populates='author', lazy='dynamic')
    clubs = db.relationship('Club', secondary='club_members')
    watched_movies = db.relationship('WatchedMovie', back_populates='user', lazy=True)
    watched_tv_shows = db.relationship('WatchedTvShow', back_populates='user', lazy=True)
    notifications = db.relationship('Notification', backref='user', lazy=True)

    followed_users = db.relationship('User', 
                                      secondary='follows', 
                                      primaryjoin='User.id == Follows.follower_id', 
                                      secondaryjoin='User.id == Follows.followed_id' 
                                      )
    followed_clubs = db.relationship('Club', 
                                      secondary='club_followers', 
                                      primaryjoin='User.id == ClubFollowers.user_id', 
                                      secondaryjoin='Club.id == ClubFollowers.club_id')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    tmdb_id = db.Column(db.Integer, unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    overview = db.Column(db.Text)
    release_date = db.Column(db.Date)
    poster_path = db.Column(db.String(200))

    posts = db.relationship('Post', back_populates='movie', lazy='dynamic')
    watched_by = db.relationship('WatchedMovie', back_populates='movie', lazy=True)

class TVShow(db.Model):
    __tablename__ = 'tv_shows'
    id = db.Column(db.Integer, primary_key=True)
    tmdb_id = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(200), nullable=False)
    overview = db.Column(db.Text)
    first_air_date = db.Column(db.Date)
    poster_path = db.Column(db.String(200))

    posts = db.relationship('Post', back_populates='tv_show', lazy='dynamic')
    watched_by = db.relationship('WatchedTvShow', back_populates='tv_show', lazy=True)

class Club(db.Model):
    __tablename__ = 'clubs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    genre = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    created_by_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    created_by = db.relationship('User', backref='created_clubs')
    members = db.relationship('User', secondary='club_members')
    posts = db.relationship('Post', back_populates='club', lazy='dynamic')
    ratings = db.relationship('Rating', back_populates='club', lazy='dynamic')
    followers = db.relationship('User', secondary='club_followers')

class ClubMembers(db.Model):
    __tablename__ = 'club_members'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)
    
class ClubFollowers(db.Model):
    __tablename__ = 'club_followers'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    tv_show_id = db.Column(db.Integer, db.ForeignKey('tv_shows.id'))
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)

    author = db.relationship('User', back_populates='posts')
    movie = db.relationship('Movie', back_populates='posts')
    tv_show = db.relationship('TVShow', back_populates='posts')
    club = db.relationship('Club', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', lazy='dynamic')
    ratings = db.relationship('Rating', back_populates='post', lazy='dynamic')

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    author = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

class Rating(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=True)
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)

    author = db.relationship('User', back_populates='ratings')
    post = db.relationship('Post', back_populates='ratings')
    club = db.relationship('Club', back_populates='ratings')

class WatchedMovie(db.Model):
    __tablename__ = 'watched_movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    watched_at = db.Column(db.DateTime, server_default=db.func.now())
    rating = db.Column(db.Integer)  # Rating from 1 to 5
    review = db.Column(db.Text)

    user = db.relationship('User', back_populates='watched_movies')
    movie = db.relationship('Movie', back_populates='watched_by')

class WatchedTvShow(db.Model):
    __tablename__ = 'watched_tv_shows'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tv_show_id = db.Column(db.Integer, db.ForeignKey('tv_shows.id'), nullable=False)
    watched_at = db.Column(db.DateTime, server_default=db.func.now())
    rating = db.Column(db.Integer, nullable=True)
    review = db.Column(db.Text)

    user = db.relationship('User', back_populates='watched_tv_shows')
    tv_show = db.relationship('TVShow', back_populates='watched_by')

class Follows(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
