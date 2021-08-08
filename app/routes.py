from flask import render_template, flash, redirect, url_for, request,Response
from flask import send_from_directory
from app import application,db
from app.forms import LoginForm
from flask_login import logout_user, login_required
from werkzeug.urls import url_parse
from flask_login import current_user, login_user
from app.models import User, Event
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask import send_file
from sqlalchemy import inspect
import sqlite3



@application.route('/')
@application.route('/index')
@login_required
def index():
 

  return render_template('simulation.html')


#@application.route('/logout')
#def logout():
#  return render_template('initialscreen.html')

@application.route('/events',methods=['GET', 'POST'])
def events():
  print("got to events")
  if request.method == "POST":
    print("this is a post: ", request.form)
    #user_id = request.form['user_id']
    qc = float(request.form['qc'])
    
    qd = float(request.form['qd'])
    vc = float(request.form['vc'])
    vd = float(request.form['Vd'])
    expenses = float(request.form['expenses'])
    pc = float(request.form['pc'])
    pd = float(request.form['pd'])
    ecd = float(request.form['ecd'])
    edc = float(request.form['edc'])
    
    surge_markup = float(request.form['surgeMarkup'])
    crime_markup = float(request.form['crimeMarkup'])
    rider_star_markup = float(request.form['riderStarMarkup'])
    
    driver_star_markup = float(request.form['driverStarMarkup'])
    low_battery_markup = float(request.form['lowBatterMarkup'])
    print("almost done")
    ban_riders_rule = float(request.form['banRidersRule'])
    ban_drivers_rule = float(request.form['banDriversRule'])
    driver_ad_expense = float(request.form['driverAdExpense'])
    rider_ad_expense = float(request.form['riderAdExpense'])
    
    total_profit = float(request.form['totalprofit'])
    rider_profit = float(request.form['riderProfit'])
    driver_profit = float(request.form['driverProfit'])
    print("so close")
    rider_satisfaction = float(request.form['riderSatisfaction'])
    driver_satisfaction = float(request.form['driverSatisfaction'])
    
    print("got all variables")

    #trigger_id = request.form['trigger_id']
    #trigger_type = request.form['trigger_type']
    try: 
      print('got to try')
      completed_event = Event(user_id = current_user.username,qc =qc, qd = qd, vc =vc, expenses = expenses, pc = pc, pd = pd, ecd = ecd, edc = edc,surge_markup=surge_markup,crime_markup=crime_markup, rider_star_markup=rider_star_markup, driver_star_markup = driver_star_markup,low_battery_markup =low_battery_markup, ban_riders_rule = ban_riders_rule, ban_drivers_rule = ban_drivers_rule, driver_ad_expense = driver_ad_expense,rider_ad_expense = rider_ad_expense, total_profit = total_profit, rider_profit = rider_profit, driver_profit = driver_profit, rider_satisfaction = rider_satisfaction, driver_satisfaction = driver_satisfaction)
      print("did work")
    except sqlite3.Error as er:
      print(er)
    #print("created event: ", completed_event.event_type)
    db.session.add(completed_event)
    db.session.commit()
    status_code = Response(status=201)
    status_code = Response(status=201)
    return status_code




@application.route('/login', methods=['GET', 'POST'])
def login():
  form = LoginForm()
  print('no')
  if current_user.is_authenticated:
    print("yes they are")
    return redirect(url_for('index'))
 
  if form.validate_on_submit():
    flash("valid form")
    user = User.query.filter_by(username=form.username.data).first()
    if user is None: 
    #or user not in User.query():
      flash("Invalid userID")
      return redirect(url_for('login'))
    login_user(user, remember=form.remember_me.data)
    next_page = request.args.get('next')
    if not next_page or url_parse(next_page).netloc != '':
      next_page = url_for('index')
    return redirect(next_page)
  return render_template('welcome.html', title='Sign In', form=form)

def rank(data,key):
    # Make a list or ranks to be sorted
    ranks = [x+1 for x in range(len(data))]
    # Sort ranks based on the key of data each refers to
    return sorted(data, reverse=True, key=lambda x:x[key])

admin = Admin(application, name='Dashboard')
#class ModuleView(ModelView):
#    column_display_pk = True # optional, but I like to see the IDs in the list
#    column_hide_backrefs = False
#    column_list = [c_attr.key for c_attr in inspect(Module).mapper.column_attrs]
class TSPView(ModelView): 
    can_export = True
    column_display_pk = True
    def is_accessible(self): 
        return True
        #current_user.is_admin
        #login.current_user.is_authenticated
    def inaccessible_callback(self, name, **kwargs):
        # redirect to login page if user doesn't have access
        return redirect(url_for('/', next=request.url))

#sadmin.add_view(ChildView(Child, db.session))
admin.add_view(TSPView(User,db.session))
admin.add_view(TSPView(Event,db.session))
'''admin.add_view(ModuleView(Module,db.session))'''
