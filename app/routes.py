from flask import render_template, flash, redirect, url_for, request,Response
from flask import send_from_directory
from app import application,db
from app.forms import LoginForm
from flask_login import logout_user, login_required
from werkzeug.urls import url_parse
from flask_login import current_user, login_user
from app.models import User, Module, Task, Event, SimulationResults,Preferences
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

@application.route('/module',methods=['GET', 'POST'])
def module():

  user_id = current_user.mturk_id
  print("check this out: ", user_id)
  mod_id = request.args['module_id']
  name = request.args['name']
  tasks = Task.query.filter_by(module_id= int(mod_id)).all()
  events = Event.query.filter_by(user_id=current_user.mturk_id).all()
  tasks_status = dict()
  for event in events: 
    if event.event_type =="complete" and event.description=="task":
      tasks_status[event.trigger_id]= "complete"

  if request.method == "POST":
    print(request.form)
  print("tasks_status: ",tasks_status )
  return render_template('module.html', tasks=tasks, module_name = name, id = mod_id, tasks_status=tasks_status, user_id=user_id, )
  
#@application.route('/logout')
#def logout():
#  return render_template('initialscreen.html')
  
@application.route('/events',methods=['GET', 'POST'])
def events():
  print("got to events")
  if request.method == "POST":
    print("this is a post: ", request.form)
    user_id = request.form['user_id']
    trigger_id = request.form['trigger_id']
    trigger_type = request.form['trigger_type']
    try: 
      print('got to try')
      completed_event = Event(event_type="start", user_id = current_user.mturk_id, description = trigger_type, trigger_id =trigger_id)
      print("did work")
    except sqlite3.Error as er:
      print(er)
    print("created event: ", completed_event.event_type)
    db.session.add(completed_event)
    db.session.commit()
  status_code = Response(status=201)
  return status_code


@application.route('/savepreferences', methods=['GET','POST'])
def savepreferences(): 
  if request.method == "POST":
    print("this is a post: ", request.form)
    p1 = request.form['p1']
    p2 = request.form['p2']
    p3 = request.form['p3']
    p4 = request.form['p4']
    participant = request.form['participant']
    nego_num = request.form['negotiation_num']

    results = Preferences(pref_item1=p1,pref_item2=p2,pref_item3=p3,pref_item4=p4, participant_id=current_user.mturk_id, participant=participant, negotiation_num=nego_num)
    db.session.add(results)
    db.session.commit()
  status_code = Response(status=201)
  return status_code 

@application.route('/valueclaiming', methods=['GET','POST'])
def valueclaiming():
  task_id = ""
  user_id = ""
  if 'user_id' in request.args: 
     user_id = request.args["user_id"]
     task_id = int(request.args["task_id"])
  participant_results = SimulationResults.query.filter_by(user_id = current_user.mturk_id,negotiation_num = 1).order_by(SimulationResults.id.asc()).first()
  print("participant results: ", participant_results.initial_points)

  return render_template('valueclaiming.html', participant_results =participant_results, user_id=current_user.mturk_id, task_id=task_id)

@application.route('/valuecreating', methods=['GET','POST'])
def valuecreating():
  task_id = ""
  user_id = ""
  participant_results = SimulationResults.query.filter_by(user_id = current_user.mturk_id,negotiation_num = 1).order_by(SimulationResults.id.asc()).first()

  preferences_agent = Preferences.query.filter_by(participant_id = current_user.mturk_id,negotiation_num = 1, participant = "agent").order_by(Preferences.id.asc()).first()

  preferences_user = Preferences.query.filter_by(participant_id = current_user.mturk_id,negotiation_num = 1, participant = "user").order_by(Preferences.id.asc()).first()

  pa = [preferences_agent.pref_item1,preferences_agent.pref_item2,preferences_agent.pref_item3,preferences_agent.pref_item4]
  pu = [preferences_user.pref_item1,preferences_user.pref_item2,preferences_user.pref_item3,preferences_user.pref_item4]

  if 'user_id' in request.args: 
     user_id = request.args["user_id"]
     task_id = int(request.args["task_id"])
  return render_template('valuecreating.html', participant_results =participant_results,task_id=task_id,user_id=current_user.mturk_id, preferences_agent = pa, preferences_user = pu)

@application.route('/genericfeedback', methods=['GET','POST'])
def genericfeedback():
  negotiation_num =1;
  user_id=current_user.mturk_id
  if 'initial_points' in request.args: 
     print("request: ", request.args)
     student_1 = { 'name': 'Student1', 'jointpoints': 99, 'finalpoints': 11}
     student_2 = { 'name': 'Student2', 'jointpoints': 113, 'finalpoints': 23}
     student_3 = { 'name': 'Student3', 'jointpoints': 120, 'finalpoints': 55}
     student_4 = { 'name': 'Student4', 'jointpoints': 103, 'finalpoints': 59}

     print("got initial point")
     initial_points = int(request.args["initial_points"])
     agent_points =  int(request.args["agent_points"]) 
     negotiation_num = int(request.args["nego_num"])
     user_points = int(request.args["user_points"])
     questions_asked = int(request.args["questions_asked"])
     pref_stmnt = int(request.args["pref_stmnt"])
     user_id = request.args["user_id"]
     task_id = int(request.args["task_id"])
     student_5 = {'name': 'You','jointpoints': (agent_points+user_points), 'finalpoints': user_points }

     students = [student_1,student_2,student_3,student_4, student_5]
     students_ranked_jointpoints = rank(students,'jointpoints')
     print("students:", students_ranked_jointpoints[0])
     students_ranked_userpoints = rank(students,'finalpoints')
     num_offer = int(request.args["num_offers"])
     print("got to part data")
     participant_data = SimulationResults(initial_points=initial_points, user_points = user_points, questions_asked =questions_asked, pref_stmnt = pref_stmnt, user_id = user_id, negotiation_num = negotiation_num, agent_points = agent_points, num_of_offer = num_offer,task_id=task_id)
     print("participant data: ", participant_data.agent_points)
     db.session.add(participant_data)
     db.session.commit()
  else: 
    print("no data preserved")

 
  participant_results = SimulationResults.query.filter_by(user_id = user_id,negotiation_num = 1).order_by(SimulationResults.id.asc()).first()

  return render_template('genericfeedback.html', title='Feeback', participant_results = participant_results, task_id=task_id, user_id=current_user.mturk_id, students=students_ranked_jointpoints,students_user = students_ranked_userpoints, negotiation_num=negotiation_num)

@application.route('/taskcompleted', methods=['GET', 'POST'])
def completed():
  print("checking: ", request.args)
  if request.method == "GET":
   task_id = request.args['task_id']
   user = request.args['user_id']

   current_task = Task.query.filter_by(id= int(task_id)).first()
   current_module = Module.query.filter_by(id= int(current_task.module_id)).first()
   completed_event = Event(event_type="complete", user_id = current_user.mturk_id, description = "task", trigger_id =task_id)
   if(current_task.id == 12 or current_task.id == 7 or current_task.id== 23 or current_task.id==8 or
      current_task.id == 15 or current_task.id == 18 or current_task.id== 19 or current_task.id==24): 
     completed_event_module = Event(event_type="complete", user_id = current_user.mturk_id, description = "module", trigger_id =current_module.id)
     db.session.add(completed_event_module)
   db.session.add(completed_event)
   db.session.commit()
  return redirect(url_for('module', module_id=current_module.id, name=current_module.name))

@application.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))


@application.route('/login', methods=['GET', 'POST'])
def login():
  form = LoginForm()
  print('no')
  if current_user.is_authenticated:
    print("yes they are")
    return redirect(url_for('index'))
  print("got here")
  if  'mturk_id' in request.args:
    print("got here")
    mturk_id = request.args['mturk_id']
    condition= request.args['condition']
    print("mturk_id", mturk_id)
    user = User.query.filter_by(mturk_id=mturk_id).first()
    if user is None:
      user = User(mturk_id=mturk_id, username = mturk_id, condition=condition)
      db.session.add(user)
      db.session.commit()
      print("user:", user.id)
      login_user(user, remember=form.remember_me.data)
      next_page = request.args.get('next')
      if not next_page or url_parse(next_page).netloc != '':
        next_page = url_for('index')
      return redirect(next_page)


  print("got here1")
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
class LMSView(ModelView): 
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
admin.add_view(LMSView(User,db.session))
admin.add_view(LMSView(Module,db.session))
admin.add_view(LMSView(Task,db.session))
admin.add_view(LMSView(Event,db.session))
admin.add_view(LMSView(SimulationResults,db.session))
admin.add_view(LMSView(Preferences,db.session))
'''admin.add_view(ModuleView(Module,db.session))'''
