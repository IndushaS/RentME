import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor as rf
from sklearn.metrics import mean_absolute_error
from sklearn.externals import joblib
from flask import jsonify


forest_model = None


def train():
    airbnb_data_path = 'data/AB_NYC_2019.csv'
    airbnb_data = pd.read_csv(airbnb_data_path)

    # set prediction target
    y = airbnb_data.price

    # set prediction features
    global airbnb_features
    airbnb_features = ['latitude', 'longitude', 'room_type', 'minimum_nights']
    global categorical_features
    categorical_features = ['room_type']

    # one hot encode categorical features
    airbnb_data_ohe = pd.get_dummies(airbnb_data[airbnb_features], columns=categorical_features, dummy_na=True)

    X = airbnb_data_ohe[airbnb_data_ohe.columns]

    # split data into training and validation sets
    train_X, val_X, train_y, val_y = train_test_split(X, y, random_state=0)

    global forest_model
    forest_model = rf(n_estimators=100,random_state=1)
    forest_model.fit(train_X, train_y)
    airbnb_price_preds = forest_model.predict(val_X)

    # persist trained model
    joblib.dump(forest_model, 'airbnb_model.pkl')

    # persist the list of columns that will be used for prediction
    global model_columns
    model_columns = list(X.columns)
    joblib.dump(model_columns, 'model_columns.pkl')

    model_mae = mean_absolute_error(val_y, airbnb_price_preds)
    return "Model training complete with Mean Absolute Error = " + str(model_mae)


#  @latlong is a 2 index array where first value is latitude, second is longitude
# this method will return one prediction for the given latitude and longitude
def predictPrice(latitude, longitude, room_type, minimum_nights):
    if forest_model:

        # reformat passed parameters into dataframe for further manipulation
        airbnb_features = ['latitude', 'longitude', 'room_type', 'minimum_nights']
        categorical_features = ['room_type']
        inputs = [[latitude, longitude, room_type, minimum_nights]]
        inputs = pd.DataFrame(inputs, columns=airbnb_features)
        
        # one hot encode catgorical data, fill in missing categorical data to input into model for prediction
        inputs_ohe = pd.get_dummies(inputs, columns=categorical_features,dummy_na=True)
        inputs_ohe = inputs_ohe.reindex(columns=model_columns, fill_value=0)
        
        prediction = forest_model.predict(inputs_ohe)
        return prediction

    else:
        print('train first')
        return 'no model here'


def loadModel():
    global forest_model
    global model_columns
    try:
        forest_model = joblib.load('airbnb_model.pkl')
        model_columns = joblib.load('model_columns.pkl')
        return 'model loaded'

    except Exception as e:
        print('No model here')
        print(str(e))
        forest_model = None
        return 'Train first'


