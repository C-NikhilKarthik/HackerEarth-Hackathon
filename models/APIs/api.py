import joblib
import pandas as pd
import numpy as np
from waitress import serve

from flask import Flask, request, jsonify
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

batting_model=joblib.load('../Batting/Multiple_regression.pkl')
batting_scaler=joblib.load('../Batting/scaled_match_id.pkl')
label_encode_batter=joblib.load('../Batting/label_encoder_batter.pkl')
label_encode_bowler_2=joblib.load('../Batting/label_encoder_bowler.pkl')


scaler = joblib.load('../Bowling/bowler_standard_scaler.pkl')
label_encoder_batting_team = joblib.load('../Bowling/label_encoder_batting_team.pkl')
label_encoder_bowler = joblib.load('../Bowling/label_encoder_bowler.pkl')
label_encoder_venue = joblib.load('../Bowling/label_encoder_venue.pkl')
model = joblib.load('../Bowling/bowler_economy_class_predictor.pkl')

@app.route('/predict_bowler_economy', methods=['POST'])
def predict_bowler_economy():
    try:

        data = request.get_json()

        input_data = pd.DataFrame([data])

        input_data['venue'] = label_encoder_venue.transform(input_data['venue'])
        input_data['batting_team'] = label_encoder_batting_team.transform(input_data['batting_team'])
        input_data['bowler'] = label_encoder_bowler.transform(input_data['bowler'])

        input_data_scaled = scaler.transform(input_data)

        prediction = model.predict(input_data_scaled)

        response = {
            'economy_category': str(prediction)
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})
    


@app.route('/predict_batter_strike_rate', methods=['POST'])
def predict_batter_strike_rate():
    try:
        data = request.get_json()
        



        input_data = pd.DataFrame([data])


        input_data['batsmen_encoded'] = label_encode_batter.transform(input_data['batsmen_encoded'])
        input_data['bowler_encoded'] = label_encode_bowler_2.transform(input_data['bowler_encoded'])


        predicted_runs = batting_model.predict(input_data)
        runs=predicted_runs.tolist()
        # print(data['no_of_balls'])
        strike_rate_against_bowler=(runs[0]/data['no_of_balls'])*100
        return jsonify({'strike_rate_against_bowler': strike_rate_against_bowler,
                        'runs':runs})

    except Exception as e:
        return jsonify({'error': str(e)})
    
    

if __name__ == '__main__':
    # app.run(port=5000)
    serve(app, host='0.0.0.0', port=5000)
