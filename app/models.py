from app import db
from app import login
from flask_login import UserMixin
import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mturk_id = db.Column(db.String(70))
    username = db.Column(db.String(64), index=True, unique=True)
    passed_prescreen = db.Column(db.Boolean, default=False)
    condition = db.Column(db.String(64), default="none")
    is_admin = db.Column(db.Boolean, default=False)



    def __repr__(self):
        return '<User {}>'.format(self.username) 

class Module(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    description = db.Column(db.String(50))
    order = db.Column(db.Integer)
    prerequisite_id = db.Column(db.Integer)
    condition = db.Column(db.String(64), default="none")

    def __repr__(self):
        return '<Module {}>'.format(self.id)
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String(50))
    link = db.Column(db.String(120))
    module_id = db.Column(db.Integer)
    order = db.Column(db.Integer)
    type = db.Column(db.String(50))

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.String(30))
    user_id = db.Column(db.String(30))
    description = db.Column(db.String(30))
    trigger_id = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.datetime.utcnow)

class SimulationResults(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer)
    user_id = db.Column(db.String(30))
    initial_points = db.Column(db.Integer)
    user_points = db.Column(db.Integer)
    agent_points = db.Column(db.Integer)
    negotiation_num = db.Column(db.Integer)
    questions_asked = db.Column(db.Integer)
    pref_stmnt = db.Column(db.Integer)
    num_of_offer = db.Column(db.Integer)
    #User = db.relationship('User', backref=db.backref('children', lazy='dynamic'))

class Preferences(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.String(30))
    pref_item1 = db.Column(db.String(30))
    pref_item2 = db.Column(db.String(30))
    pref_item3 = db.Column(db.String(30))
    pref_item4 = db.Column(db.String(30))
    negotiation_num = db.Column(db.Integer)
    participant = db.Column(db.String(30))



@login.user_loader
def load_user(id):
    if id is None or id == 'None': 
       id =-1
    return User.query.get(int(id))
