from distutils.log import debug
from operator import imod
from pickle import FALSE
import re
from flask import Flask,render_template,url_for,redirect,flash,request
from flask_sqlalchemy import SQLAlchemy
import os
from flask_login import LoginManager,login_user,login_required,logout_user,current_user
from flask_migrate import Migrate
from forms import RegistrationForm,LoginForm
from models import User
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)

#* ATTACHING DATABASE TO PROJECT FOR USER CREATION 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#* ENCRYPTING THE PASSWORD text
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
# GENERATING SECRET-KEY
SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY
# CREATING THE MIGRATIONS 
migrate = Migrate(app, db)
# login Manager
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/',methods=['GET'])
def index():
    return render_template("index.html",user=current_user)
@app.route('/how_to_play')
@login_required
def how_to_play():
    return render_template("how_to_play.html")

@app.route('/play')
def play():
    return render_template("play.html")



@app.route('/register', methods = ['POST','GET'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password =    bcrypt.generate_password_hash(form.password1.data).decode('utf-8')
        user = User(username =form.username.data, email = form.email.data,password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('registration/registration.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            return render_template("index.html",user=current_user)
        flash('Invalid email address or Password.')    
    return render_template('registration/login.html', form=form)

@app.route("/logout")
def logout():
    logout_user()
    return render_template("index.html",user=current_user)

@app.route('/share/score/', methods = ['GET'])
def share_score():
    return render_template('share_score.html')


if __name__ == "__main__":
    app.run(debug=True)