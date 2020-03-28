import time
from flask import Flask
import requests
import json


app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello, Bhoomika!'   

@app.route('/property/<address1>/<address2>')
def get_data(address1,address2):
    resp=requests.get('https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile', params={'address1': address1, 'address2':address2},headers={'apikey': "d0b4484d9732e846c5f1c8bed331a71c", 'accept':"application/json"} )
    result=resp.json()
    '''longitude=result['property'][0]['location']['longitude']
    latitude=result['property'][0]['location']['latitude']'''
    
    return result