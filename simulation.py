from flask import Flask, render_template

simulation = Flask(__name__)

@simulation.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    simulation.run(debug=True)