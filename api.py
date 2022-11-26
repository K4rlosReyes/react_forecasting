import time
from flask import Flask, send_file
import requests
from flask_cors import CORS

app = Flask(__name__,
            static_url_path='', 
            static_folder='web',)
CORS(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

BASE_URL = "http://opt.uvigo.es"

@app.route('/')
def index():
    return send_file('web/index.html')

@app.route('/results')
def get_results():
    return requests.get(url = f"{BASE_URL}/results").json()

@app.route('/input')
def get_input():
    return requests.get(url = f"{BASE_URL}/input").json()

@app.route('/real')
def get_real():
    return requests.get(url = f"{BASE_URL}/real").json()
