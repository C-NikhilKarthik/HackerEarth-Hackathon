import joblib
import pandas as pd
import numpy as np


batting_model=joblib.load('../Batting/Multiple_regression.pkl')


batting_scaler=joblib.load('../Batting/scaled_match_id.pkl')

label_encode_batter=joblib.load('../Batting/label_encoder_batter.pkl')
label_encode_bowler_2=joblib.load('../Batting/label_encoder_bowler.pkl')



data = {
  "match_id_scaled": 1,
  "innings": 1,
  "batsmen_encoded":"DA Warner",
  "bowler_encoded": "Mohammad Hafeez",
  "no_of_balls": 6
}


input_data = pd.DataFrame([data])


input_data['batsmen_encoded'] = label_encode_batter.transform(input_data['batsmen_encoded'])
input_data['bowler_encoded'] = label_encode_bowler_2.transform(input_data['bowler_encoded'])


predicted_runs = batting_model.predict(input_data)
print(predicted_runs)

