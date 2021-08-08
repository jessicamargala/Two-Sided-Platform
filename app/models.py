from app import db
from app import login
from flask_login import UserMixin
import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    username = db.Column(db.String(64), index=True, unique=True)

    is_admin = db.Column(db.Boolean, default=False)



    def __repr__(self):
        return '<User {}>'.format(self.username) 


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.datetime.utcnow)
    user_id = db.Column(db.String(20))
    qc = db.Column(db.Float)
    qd = db.Column(db.Float)
    vc = db.Column(db.Float)
    vd = db.Column(db.Float)
    expenses = db.Column(db.Float)
    pc = db.Column(db.Float)
    pd = db.Column(db.Float)
    ecd = db.Column(db.Float)
    edc = db.Column(db.Float)
    surge_markup = db.Column(db.Float)
    crime_markup = db.Column(db.Float)
    rider_star_markup = db.Column(db.Float)
    driver_star_markup = db.Column(db.Float)
    low_battery_markup = db.Column(db.Float)
    ban_riders_rule = db.Column(db.Float)
    ban_drivers_rule = db.Column(db.Float)
    driver_ad_expense = db.Column(db.Float)
    rider_ad_expense = db.Column(db.Float)
    total_profit = db.Column(db.Float)
    rider_profit = db.Column(db.Float)
    driver_profit= db.Column(db.Float)
    rider_satisfaction = db.Column(db.Float)
    driver_satisfaction = db.Column(db.Float)


    




@login.user_loader
def load_user(id):
    if id is None or id == 'None': 
       id =-1
    return User.query.get(int(id))
