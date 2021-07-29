from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
import os 
from flask_login import LoginManager
basedir = os.path.abspath(os.path.dirname(__file__))

application = Flask(__name__)
application.config.from_object(Config)
application.config ['SQLALCHEMY_DATABASE_URI'] ='sqlite:///' + os.path.join(basedir, 'app.db')
application.debug = True
print("value of app: ",application.config.get("SQLALCHEMY_DATABASE_URI"))

db = SQLAlchemy(application)

migrate = Migrate(application, db,render_as_batch=True)

login = LoginManager(application)
login.login_view = 'login'
#app.static_folder = app.config.get('Static_folder')

from app import routes, models