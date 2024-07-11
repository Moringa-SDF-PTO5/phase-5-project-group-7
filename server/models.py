from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    profile_pic = db.Column(db.String(200))
    bio = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    posts = db.relationship('Post', back_populates='author', lazy=True)
    comments = db.relationship('Comment', back_populates='author', lazy=True)
    ratings = db.relationship('Rating', back_populates='author', lazy=True)
    clubs = db.relationship('Club', secondary='user_clubs', back_populates='members')

class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    tmdb_id = db.Column(db.Integer, unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    overview = db.Column(db.Text)
    release_date = db.Column(db.Date)
    poster_path = db.Column(db.String(200))
    
    # Relationships
    posts = db.relationship('Post', back_populates='movie', lazy=True, foreign_keys='Post.movie_id')
    ratings = db.relationship('Rating', back_populates='movie', lazy=True, foreign_keys='Rating.movie_id')
    comments = db.relationship('Comment', back_populates='movie', lazy=True, foreign_keys='Comment.movie_id')

class TVShow(db.Model):
    __tablename__ = 'tv_shows'
    id = db.Column(db.Integer, primary_key=True)
    tmdb_id = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(200), nullable=False)
    overview = db.Column(db.Text)
    first_air_date = db.Column(db.Date)
    poster_path = db.Column(db.String(200))
    
    # Relationships
    posts = db.relationship('Post', back_populates='tv_show', lazy=True, foreign_keys='Post.tv_show_id')
    ratings = db.relationship('Rating', back_populates='tv_show', lazy=True, foreign_keys='Rating.tv_show_id')
    comments = db.relationship('Comment', back_populates='tv_show', lazy=True, foreign_keys='Comment.tv_show_id')

class Club(db.Model):
    __tablename__ = 'clubs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    genre = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    posts = db.relationship('Post', back_populates='club', lazy=True)
    members = db.relationship('User', secondary='user_clubs', back_populates='clubs')

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    tv_show_id = db.Column(db.Integer, db.ForeignKey('tv_shows.id'))
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)

    # Relationships
    author = db.relationship('User', back_populates='posts')
    movie = db.relationship('Movie', back_populates='posts', foreign_keys=[movie_id])
    tv_show = db.relationship('TVShow', back_populates='posts', foreign_keys=[tv_show_id])
    club = db.relationship('Club', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', lazy=True)
    ratings = db.relationship('Rating', back_populates='post', lazy=True)

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    tv_show_id = db.Column(db.Integer, db.ForeignKey('tv_shows.id'))

    # Relationships
    author = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')
    movie = db.relationship('Movie', back_populates='comments', foreign_keys=[movie_id])
    tv_show = db.relationship('TVShow', back_populates='comments', foreign_keys=[tv_show_id])

class Rating(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    tv_show_id = db.Column(db.Integer, db.ForeignKey('tv_shows.id'))

    # Relationships
    author = db.relationship('User', back_populates='ratings')
    post = db.relationship('Post', back_populates='ratings')
    movie = db.relationship('Movie', back_populates='ratings', foreign_keys=[movie_id])
    tv_show = db.relationship('TVShow', back_populates='ratings', foreign_keys=[tv_show_id])

# Association table for many-to-many relationship between Users and Clubs
user_clubs = db.Table('user_clubs',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('club_id', db.Integer, db.ForeignKey('clubs.id'), primary_key=True)
)
