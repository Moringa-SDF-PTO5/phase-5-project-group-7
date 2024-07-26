from flask import request, jsonify, session, current_app as app
from app.models import db, User, Movie, TVShow, Club, Post, Comment, Rating
from functools import wraps
import requests
import logging

logging.basicConfig(level=logging.ERROR)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"msg": "Authentication required"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already exists"}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already exists"}), 400
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    """Log in an existing user."""
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({"msg": "Logged in successfully"}), 200
    return jsonify({"msg": "Invalid username or password"}), 401


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    """Log out the current user."""
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({"msg": "Logged out successfully"}), 200

@app.route('/clubs', methods=['GET'])
def get_clubs():
    """Fetch all clubs."""
    try:
        clubs = Club.query.all()
        return jsonify([{"id": club.id, "name": club.name, "genre": club.genre} for club in clubs]), 200
    except Exception as e:
        logging.error(f"Error fetching clubs: {e}")
        return jsonify({"error": "Failed to fetch clubs"}), 500

@app.route('/clubs', methods=['POST'])
@login_required
def create_club():
    """Create a new club."""
    data = request.json
    new_club = Club(
        name=data['name'],
        description=data['description'],
        genre=data['genre'],
        created_by_id=session['user_id']
    )
    db.session.add(new_club)
    db.session.commit()
    return jsonify({"msg": "Club created successfully"}), 201

@app.route('/club/<int:club_id>', methods=['GET'])
def get_club(club_id):
    """Fetch details of a specific club."""
    club = Club.query.get(club_id)
    if club:
        return jsonify({
            "id": club.id,
            "name": club.name,
            "description": club.description,
            "genre": club.genre
        }), 200
    return jsonify({"msg": "Club not found"}), 404

@app.route('/club/<int:club_id>/join', methods=['POST'])
@login_required
def join_club(club_id):
    """Join a specified club."""
    user = User.query.get(session['user_id'])
    club = Club.query.get(club_id)
    if club not in user.clubs:
        user.clubs.append(club)
        db.session.commit()
        return jsonify({"msg": "Joined club successfully"}), 200
    return jsonify({"msg": "Already a member of this club"}), 400

@app.route('/club/<int:club_id>/posts', methods=['GET'])
def get_club_posts(club_id):
    """Fetch all posts for a specific club."""
    posts = Post.query.filter_by(club_id=club_id).all()
    return jsonify([{"id": post.id, "content": post.content,
                      "user_id": post.user_id} for post in posts]), 200

@app.route('/club/<int:club_id>/followers', methods=['GET'])
def get_club_followers(club_id):
    """Fetch followers of a specific club."""
    try:
        club = Club.query.get(club_id)
        if club:
            followers = [user.username for user in club.followers]
            return jsonify(followers), 200
        return jsonify({"msg": "Club not found"}), 404
    except Exception as e:
        logging.error(f"Error fetching followers for club {club_id}: {e}")
        return jsonify({"error": "Failed to fetch followers"}), 500

@app.route('/club/<int:club_id>/unfollow', methods=['POST'])
@login_required
def unfollow_club(club_id):
    """Unfollow a specific club."""
    club = Club.query.get(club_id)
    if club:
        user = User.query.get(session['user_id'])
        if club in user.followed_users:
            user.followed_users.remove(club)
            db.session.commit()
            return jsonify({"msg": "Successfully unfollowed the club."}), 200
        return jsonify({"msg": "You are not following this club."}), 400
    return jsonify({"msg": "Club not found."}), 404

@app.route('/rate/club/<int:club_id>', methods=['POST'])
@login_required
def rate_club(club_id):
    """Rate a specific club."""
    data = request.json
    rating = Rating(score=data['score'], 
                    user_id=session['user_id'], club_id=club_id)
                    
    db.session.add(rating)
    db.session.commit()
    return jsonify({"msg": "Rating added successfully."}), 201
