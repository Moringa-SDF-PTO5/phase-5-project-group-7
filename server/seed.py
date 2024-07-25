from app import db
from app.models import User, Club, Rating

def seed_data():
    # Clear existing data
    db.drop_all()
    db.create_all()

    # Create Users
    user1 = User(username='johndoe', email='johndoe@example.com')
    user1.set_password('password123')
    user2 = User(username='janesmith', email='janesmith@example.com')
    user2.set_password('password123')
    user3 = User(username='bobwilson', email='bobwilson@example.com')
    user3.set_password('password123')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)

    # Create Clubs
    club1 = Club(name='Action Movie Club', description='A club for fans of action movies', genre='Action', created_by=user1)
    club2 = Club(name='Drama Movie Club', description='A club for fans of drama movies', genre='Drama', created_by=user2)

    db.session.add(club1)
    db.session.add(club2)

    # Create Ratings
    rating1 = Rating(score=4.5, user_id=user1.id, club_id=club1.id)
    rating2 = Rating(score=5.0, user_id=user2.id, club_id=club2.id)

    db.session.add(rating1)
    db.session.add(rating2)

    # Create Followers
    user1.followed_users.append(user2)  # User1 follows User2
    user2.followed_users.append(user3)  # User2 follows User3

    db.session.commit()

if __name__ == '__main__':
    from app import create_app
    app = create_app()
    with app.app_context():
        seed_data()
        print("Database seeded!")
