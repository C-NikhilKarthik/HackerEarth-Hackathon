from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, accuracy_score

# Load the trained model, scaler, and encoders
model = joblib.load('bowler_economy_class_predictor.pkl')
scaler = joblib.load('bowler_standard_scaler.pkl')
label_encoder_batting_team = joblib.load('label_encoder_batting_team.pkl')
label_encoder_bowler = joblib.load('label_encoder_bowler.pkl')
label_encoder_venue = joblib.load('label_encoder_venue.pkl')

@app.route('/predict_bowler_economy', methods=['POST'])
def predict_bowler_economy():
    try:
        # Get input data from the request
        data = request.get_json()

        # Create a DataFrame from the input data
        input_data = pd.DataFrame([data])

        # Encode categorical variables
        input_data['venue'] = label_encoder_venue.transform(input_data['venue'])
        input_data['batting_team'] = label_encoder_batting_team.transform(input_data['batting_team'])
        input_data['bowler'] = label_encoder_bowler.transform(input_data['bowler'])

        # Scale numerical features
        input_data_scaled = scaler.transform(input_data)

        # Make predictions
        prediction = model.predict(input_data_scaled)

        # Decode the predicted category
        # decoded_prediction = label_encoder_bowler.inverse_transform(prediction)[0]

        # Prepare the response
        response = {
            'economy_category': str(prediction)
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000)
