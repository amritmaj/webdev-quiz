


from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_migrate import Migrate
import os
from flask_login import LoginManager
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)

# @login_manager.user_loader
@login_manager.request_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    __tablename__ = "User"
    id = db.Column(db.Integer,primary_key = True)
    username = db.Column(db.String(20),
                         unique = True, 
                         nullable = False)
    email = db.Column(db.String(120), 
                      unique = True, 
                      nullable = False)
    password = db.Column(db.String(60), 
                         nullable = False)
