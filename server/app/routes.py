from flask import request, jsonify, session, current_app as app
from app.models import db, User, Movie, TVShow, Club, Post, Comment, Rating, WatchedMovie, WatchedTvShow, Notification, Follows
from functools import wraps
import requests
import logging

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
        
        # Ensure the correct data structure
        movies = {
            "results": [{
                "id": movie["id"],
                "title": movie["title"],
                "overview": movie["overview"],
                "release_date": movie["release_date"],
                "poster_path": movie["poster_path"]
            } for movie in data.get("results", [])]
        }
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
        
        # Ensure the correct data structure
        tv_shows = {
            "results": [{
                "id": show["id"],
                "name": show["name"],
                "overview": show["overview"],
                "first_air_date": show["first_air_date"],
                "poster_path": show["poster_path"]
            } for show in data.get("results", [])]
        }
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
        if "movie_results" in data and data["movie_results"]:
            result = data["movie_results"][0]
            return jsonify({
                "id": result["id"],
                "title": result["title"],
                "overview": result["overview"],
                "release_date": result["release_date"],
                "poster_path": result["poster_path"]
            }), 200
        elif "tv_results" in data and data["tv_results"]:
            result = data["tv_results"][0]
            return jsonify({
                "id": result["id"],
                "name": result["name"],
                "overview": result["overview"],
                "first_air_date": result["first_air_date"],
                "poster_path": result["poster_path"]
            }), 200
        else:
            return jsonify({"error": "No results found"}), 404
    except requests.exceptions.RequestException as e:
        logging.error(f"Error finding item by ID from TMDB API: {e}")
        return jsonify({"error": "Failed to find item by ID"}), 500

@app.route('/register', methods=['POST'])
def register():
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
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({"msg": "Logged out successfully"}), 200

@app.route('/clubs', methods=['GET'])
def get_clubs():
    try:
        clubs = Club.query.all()
        return jsonify([{"id": club.id, "name": club.name, "genre": club.genre} for club in clubs]), 200
    except Exception as e:
        logging.error(f"Error fetching clubs: {e}")
        return jsonify({"error": "Failed to fetch clubs"}), 500

@app.route('/clubs', methods=['POST'])
@login_required
def create_club():
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
            "genre": club.genre,
            "created_by": club.created_by.username,
            "members": [{"id": member.id, "username": member.username} for member in club.members],
            "posts_count": club.posts.count(),
            "followers_count": club.followers.count()
        }), 200
    return jsonify({"msg": "Club not found"}), 404

@app.route('/club/<int:club_id>/join', methods=['POST'])
@login_required
def join_club(club_id):
    user = User.query.get(session['user_id'])
    club = Club.query.get(club_id)
    if club not in user.clubs:
        user.clubs.append(club)
        db.session.commit()
        return jsonify({"msg": "Joined club successfully"}), 200
    return jsonify({"msg": "Already a member of this club"}), 400

@app.route('/club/<int:club_id>/posts', methods=['GET'])
def get_club_posts(club_id):
    posts = Post.query.filter_by(club_id=club_id).all()
    return jsonify([{"id": post.id, "title": post.title, "content": post.content, "user_id": post.user_id} for post in posts]), 200

@app.route('/club/<int:club_id>/posts', methods=['POST'])
@login_required
def create_club_post(club_id):
    data = request.json
    new_post = Post(
        title=data['title'],
        content=data['content'],
        user_id=session['user_id'],
        club_id=club_id
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"msg": "Post created successfully"}), 201

@app.route('/post/<int:post_id>/comment', methods=['POST'])
@login_required
def create_comment(post_id):
    data = request.json
    new_comment = Comment(
        content=data['content'],
        user_id=session['user_id'],
        post_id=post_id
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({"msg": "Comment created successfully"}), 201

@app.route('/post/<int:post_id>/comments', methods=['GET'])
def get_post_comments(post_id):
    comments = Comment.query.filter_by(post_id=post_id).all()
    return jsonify([{"id": comment.id, "content": comment.content, "user_id": comment.user_id} for comment in comments]), 200

@app.route('/rate', methods=['POST'])
@login_required
def rate():
    data = request.json
    user_id = session['user_id']
    tmdb_id = data['tmdb_id']
    rating_value = data['rating']
    rating = Rating.query.filter_by(user_id=user_id, tmdb_id=tmdb_id).first()
    if rating:
        rating.rating = rating_value
    else:
        rating = Rating(user_id=user_id, tmdb_id=tmdb_id, rating=rating_value)
        db.session.add(rating)
    db.session.commit()
    return jsonify({"msg": "Rating submitted successfully"}), 200

@app.route('/ratings', methods=['GET'])
@login_required
def get_ratings():
    user_id = session['user_id']
    ratings = Rating.query.filter_by(user_id=user_id).all()
    return jsonify([{"tmdb_id": rating.tmdb_id, "rating": rating.rating} for rating in ratings]), 200

@app.route('/watched/movies', methods=['GET'])
@login_required
def get_watched_movies():
    user_id = session['user_id']
    watched_movies = WatchedMovie.query.filter_by(user_id=user_id).all()
    return jsonify([{"tmdb_id": wm.tmdb_id, "title": wm.title, "rating": wm.rating} for wm in watched_movies]), 200

@app.route('/watched/tv_shows', methods=['GET'])
@login_required
def get_watched_tv_shows():
    user_id = session['user_id']
    watched_tv_shows = WatchedTvShow.query.filter_by(user_id=user_id).all()
    return jsonify([{"tmdb_id": wtv.tmdb_id, "name": wtv.name, "rating": wtv.rating} for wtv in watched_tv_shows]), 200

@app.route('/notifications', methods=['GET'])
@login_required
def get_notifications():
    user_id = session['user_id']
    notifications = Notification.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": n.id, "message": n.message, "created_at": n.created_at} for n in notifications]), 200

@app.route('/follow', methods=['POST'])
@login_required
def follow():
    data = request.json
    follower_id = session['user_id']
    followed_id = data['followed_id']
    if follower_id == followed_id:
        return jsonify({"msg": "You cannot follow yourself"}), 400
    if Follows.query.filter_by(follower_id=follower_id, followed_id=followed_id).first():
        return jsonify({"msg": "Already following"}), 400
    follow = Follows(follower_id=follower_id, followed_id=followed_id)
    db.session.add(follow)
    db.session.commit()
    return jsonify({"msg": "Followed successfully"}), 200

@app.route('/unfollow', methods=['POST'])
@login_required
def unfollow():
    data = request.json
    follower_id = session['user_id']
    followed_id = data['followed_id']
    follow = Follows.query.filter_by(follower_id=follower_id, followed_id=followed_id).first()
    if follow:
        db.session.delete(follow)
        db.session.commit()
        return jsonify({"msg": "Unfollowed successfully"}), 200
    return jsonify({"msg": "Not following"}), 400
