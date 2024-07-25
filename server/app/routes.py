from flask import request, jsonify, session, current_app as app
from app.models import db, User, Movie, TVShow, Club, Post, Comment, Rating
from functools import wraps
import requests
import logging
