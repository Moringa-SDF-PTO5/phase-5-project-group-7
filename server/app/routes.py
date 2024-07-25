from flask import request, jsonify, session, current_app as app
from app.models import db, User, Movie, TVShow, Club, Post, Comment, Rating
from functools import wraps
import requests
import logging
# from datetime import datetime

# Error logging configuration
logging.basicConfig(level=logging.ERROR)

def get_tmdb_url(endpoint: str) -> str:
    return f"{app.config['TMDB_BASE_URL']}/{endpoint}"


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"msg": "Authentication required"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/discover/movies', methods=['GET'])
def discover_movies():
    try:
        endpoint = get_tmdb_url('discover/movie')
        params = {
            "api_key": app.config['TMDB_API_KEY'],
            "language": "en-US",
            "page": request.args.get('page', 1, type=int),
            "sort_by": request.args.get('sort_by', 'popularity.desc'),
            "with_genres": request.args.get('genre_ids'),
            "primary_release_year": request.args.get('year')
        }
        response = requests.get(endpoint, params=params)
        response.raise_for_status()
        data = response.json()
        movies = [
            {
                "id": movie["id"],
                "title": movie["title"],
                "overview": movie["overview"],
                "release_date": movie["release_date"],
                "poster_path": movie["poster_path"]
            } for movie in data.get("results", [])
        ]
        return jsonify(movies), 200
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching movies from TMDB API: {e}")
        return jsonify({"error": "Failed to fetch movies"}), 500

@app.route('/discover/tv', methods=['GET'])
def discover_tv_shows():
    try:
        endpoint = get_tmdb_url('discover/tv')
        params = {
            "api_key": app.config['TMDB_API_KEY'],
            "language": "en-US",
            "page": request.args.get('page', 1, type=int),
            "sort_by": request.args.get('sort_by', 'popularity.desc'),
            "with_genres": request.args.get('genre_ids'),
            "first_air_date_year": request.args.get('year')
        }
        response = requests.get(endpoint, params=params)
        response.raise_for_status()
        data = response.json()
        tv_shows = [
            {
                "id": show["id"],
                "name": show["name"],
                "overview": show["overview"],
                "first_air_date": show["first_air_date"],
                "poster_path": show["poster_path"]
            } for show in data.get("results", [])
        ]
        return jsonify(tv_shows), 200
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching TV shows from TMDB API: {e}")
        return jsonify({"error": "Failed to fetch TV shows"}), 500

@app.route('/find/<int:tmdb_id>', methods=['GET'])
def find_by_id(tmdb_id):
    try:
        endpoint = get_tmdb_url(f'find/{tmdb_id}')
        params = {
            "api_key": app.config['TMDB_API_KEY'],
            "language": "en-US",
            "external_source": "imdb_id"
        }
        response = requests.get(endpoint, params=params)
        response.raise_for_status()
        data = response.json()
        if "movie_results" in data or "tv_results" in data:
            result = {
                "id": data["movie_results"][0]["id"] if data["movie_results"] else data["tv_results"][0]["id"],
                "title": data["movie_results"][0]["title"] if data["movie_results"] else data["tv_results"][0]["name"],
                "overview": data["movie_results"][0]["overview"] if data["movie_results"] else data["tv_results"][0]["overview"],
                "release_date": data["movie_results"][0]["release_date"] if data["movie_results"] else data["tv_results"][0]["first_air_date"],
                "poster_path": data["movie_results"][0]["poster_path"] if data["movie_results"] else data["tv_results"][0]["poster_path"]
            }
            return jsonify(result), 200
        else:
            logging.error(f"TMDB API response does not contain 'movie_results' or 'tv_results': {data}")
            return jsonify({"error": "Failed to find item by ID"}), 500
    except requests.exceptions.RequestException as e:
        logging.error(f"Error finding item by ID from TMDB API: {e}")
        return jsonify({"error": "Failed to find item by ID"}), 500

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

@app.route('/movie/<int:tmdb_id>', methods=['GET'])
def get_movie(tmdb_id):
    movie = Movie.query.filter_by(tmdb_id=tmdb_id).first()
    if movie:
        return jsonify(id=movie.id, title=movie.title, overview=movie.overview), 200
    return jsonify({"msg": "Movie not found"}), 404

@app.route('/tv/<int:tmdb_id>', methods=['GET'])
def get_tv_show(tmdb_id):
    tv_show = TVShow.query.filter_by(tmdb_id=tmdb_id).first()
    if tv_show:
        return jsonify(id=tv_show.id, name=tv_show.name, overview=tv_show.overview), 200
    return jsonify({"msg": "TV Show not found"}), 404

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

@app.route('/post', methods=['POST'])
@login_required
def create_post():
    """Create a new post."""
    data = request.json
    new_post = Post(
        content=data['content'],
        user_id=session['user_id'],
        club_id=data['club_id']
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"msg": "Post created successfully"}), 201

@app.route('/post/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """Fetch details of a specific post."""
    post = Post.query.get(post_id)
    if post:
        return jsonify({
            "id": post.id,
            "content": post.content,
            "user_id": post.user_id,
            "club_id": post.club_id
        }), 200
    return jsonify({"msg": "Post not found"}), 404

@app.route('/post/<int:post_id>/comment', methods=['POST'])
@login_required
def add_comment(post_id):
    """Add a comment to a specific post."""
    data = request.json
    new_comment = Comment(
        content=data['content'],
        user_id=session['user_id'],
        post_id=post_id
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({"msg": "Comment added successfully"}), 201

@app.route('/post/<int:post_id>/rate', methods=['POST'])
@login_required
def rate_post(post_id):
    data = request.json
    new_rating = Rating(score=data['score'], user_id=session['user_id'], post_id=post_id)
    db.session.add(new_rating)
    db.session.commit()
    return jsonify({"msg": "Rating added successfully"}), 201

@app.route('/profile/settings', methods=['PUT'])
@login_required
def update_profile():
    """Update user profile settings."""
    data = request.json
    user = User.query.get(session['user_id'])
    if user:
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.bio = data.get('bio', user.bio)
        user.profile_pic = data.get('profile_pic', user.profile_pic)
        db.session.commit()
        return jsonify({"msg": "Profile updated successfully."}), 200
    return jsonify({"msg": "User not found."}), 404


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    movies = Movie.query.filter(Movie.title.ilike(f'%{query}%')).all()
    tv_shows = TVShow.query.filter(TVShow.name.ilike(f'%{query}%')).all()
    users = User.query.filter(User.username.ilike(f'%{query}%')).all()
    clubs = Club.query.filter(Club.name.ilike(f'%{query}%')).all()
    results = {
        "movies": [{"id": m.id, "title": m.title} for m in movies],
        "tv_shows": [{"id": t.id, "name": t.name} for t in tv_shows],
        "users": [{"id": u.id, "username": u.username} for u in users],
        "clubs": [{"id": c.id, "name": c.name} for c in clubs]
    }
    return jsonify(results), 200
