import time
from flask import Flask
from flask import jsonify
import requests
import json
import mlmodels
import profits


app = Flask(__name__)
print(mlmodels.loadModel())
@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello, Bhoomika!'   

@app.route('/property/<address1>/<address2>')
def get_data(address1,address2):
    resp=requests.get('https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile'
        ,params={'address1': address1, 'address2':address2}
        ,headers={'apikey': "d0b4484d9732e846c5f1c8bed331a71c", 'accept':"application/json"} )
    
    result=resp.json()
    '''longitude=result['property'][0]['location']['longitude']
    latitude=result['property'][0]['location']['latitude']'''
    
    latitude = result['property'][0]['location']['latitude']
    longitude = result['property'][0]['location']['longitude']
    saleAmount = result['property'][0]['sale']['saleAmountData']['saleAmt']

    # ensure that ML model has been trained and loaded, then perform prediction
    mlmodels.loadModel()

    # assume that the whole apartment will be rented out on airbnb, for a minimum of 1 night
    predictedPrice = mlmodels.predictPrice(latitude,longitude, 'Entire home/apt', 1)[0]
    
    # assume 40 years spent paying mortgage to calculate monthly stats
    monthlyStats = profits.monthlyStats(saleAmount, predictedPrice, 40)
    
    result['monthlyStats'] = monthlyStats

    return result


@app.route('/predictPrice', methods=['GET'])
def predict_price():
    return jsonify({"prediction": list(map(float, mlmodels.predictPrice(40.815600, -73.941942, 'Entire home/apt', 1)))})  


@app.route('/train', methods=['GET'])
def trainModel():
    result = mlmodels.train()
    return result


@app.route('/loadModel', methods=['GET'])
def load():
    return mlmodels.loadModel()