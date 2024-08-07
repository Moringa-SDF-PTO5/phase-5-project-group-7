# Movies/Series Club
Movies/Series Club is a web application designed to allow users to create and manage clubs centered around their favorite movies and series. Users can join clubs, create posts about their interests, and interact with other members.

The main purpose of the application is to provide a platform where fans of movies and series can gather, share their thoughts, and engage with like-minded individuals in a structured and interactive environment.
## Key Features
### User Authentication:
   - Registration: Users can create accounts.
   - Login: Users can authenticate and access their accounts.
   - Profile Management: Users can update their profiles.
 ### Club Management:
   - Create Clubs: Users can create new clubs with details like name, description, and genre.
   - View Club Details: Users can view detailed information about clubs, including members and posts.
   - Update Clubs: Users can update club details.
   - Delete Clubs: Users can remove clubs they no longer wish to manage.

###  Post Management:
   - Create Posts: Users can add new posts within clubs.
   - View Posts: Users can see posts within a club.
   - Delete Posts: Users can delete posts they have created.

 ###  Club Membership:
  - Join Clubs: Users can join existing clubs.
  - Leave Clubs: Users can leave clubs they are no longer interested in.

  ### Responsive Design:
   The application is designed to be responsive and user-friendly on various devices, including desktops, tablets, and smartphones.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
## Features

- User authentication (login, registration)
- Create and manage clubs
- Create and view posts within clubs
- View and update user profile
- Responsive design with basic styling

## Prerequisites

- Node.js (>= 14.x.x)
- npm or yarn


## Installation

 **Clone the repository:**

 ```bash
   git clone (https://github.com/Moringa-SDF-PTO5/phase-5-project-group-7)
   cd frontend
   npm install
```
### Backend (Flask API)
Instructions for setting up the Flask backend.

```bash
cd server
pipenv install
pipenv shell
```

### Frontend (React with Vite)

- Instructions for setting up the React frontend.

```bash
cd client
npm install( NPM versions 18.0 and up )
npm run dev to give you URL to local host
```
### Backend (Flask with Postgres)

## Backend deployed link : https://phase-5-project-group-7.onrender.com
 
```bash
cd server
pipenv install && pipenvshell
pipenv run python run.app to start server with URL link
```
## Usage

### Front-end
- Register a New User:
  Use the provided UI form to register a new user.
- Login:
  Use the login form to authenticate users.
- Create a Club:
  Navigate to the "Create Club" page and fill out the form to create a new club. Upon successful creation, you will be redirected to the newly created club's detail page.
- View Club Details:
  Navigate to the "Clubs" page and click on a club name to view its details, including members and posts.
- Create a Post:
On a club detail page, use the "Create Post" form to add new posts to the club.

### Back-end
Register a New User:

```bash
http

POST /register
Content-Type: application/json

{
  "username": "exampleUser",
  "password": "examplePassword"
}
```

Login:
```bash
http

POST /login
Content-Type: application/json

{
  "username": "exampleUser",
  "password": "examplePassword"
}
```

Create a Club:
```bash
http

POST /clubs
Authorization: Bearer <your-auth-token>
Content-Type: application/json

{
  "user_id": 1,
  "name": "New Club",
  "description": "Description of the new club",
  "genre": "Drama"
}
```

Get Club Details:
```bash
http

GET /clubs/1
Authorization: Bearer <your-auth-token>
```

Create a Post:
```bash
http

POST /clubs/1/posts
Authorization: Bearer <your-auth-token>
Content-Type: application/json

{
  "title": "New Post",
  "content": "Content of the new post"
}
```


## Running Tests


### Backend tests
```bash
cd server
pipenv run pytest
```
# Frontend tests
```bash
cd client
npm test
```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.
## License
This project is licensed under the [MIT License](LICENSE).

