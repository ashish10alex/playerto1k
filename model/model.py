import pdbr
import time
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from tqdm import tqdm
import numpy as np

n_simulations = 1
n_estimators = 100
verbose = 0
pbar = tqdm(total=n_estimators, desc="Training Random Forest")


# Custom callback function to update the progress bar
def progress_callback(iteration):
    pbar.update(1)
    time.sleep(0.1)  # Add a small delay to make the progress visible

# Assume we have a DataFrame 'df' with historical data
# Prepare features
df = pd.read_csv('data/historical_data.csv')
X = df[['opposition', 'is_home', 'historical_rate_vs_opposition', 'opposition_defense_rating', 'player_form', 'competition_type']]
y = df['goals_scored']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

categorical_features = ['opposition', 'competition_type']
numeric_features = ['is_home', 'historical_rate_vs_opposition', 'opposition_defense_rating', 'player_form']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', numeric_features),
        ('cat', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='infrequent_if_exist'), categorical_features)
    ])

model = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=n_estimators, random_state=42, verbose=verbose))
])

model.fit(X_train, y_train)

# test_match = pd.DataFrame({ 'opposition': ['Team Z'], 'is_home': [1], 'historical_rate_vs_opposition': [0.9], 'opposition_defense_rating': [0.9], 'player_form': [0.1], 'competition_type': ['League'] })
# prediction = model.predict(test_match)
# print(f"Predicted goals: {prediction[0]:.2f}")

# Function to simulate path to 100 goals
def simulate_to_100_goals(model, upcoming_fixtures, current_goals=7, target_goals=100):
    goals = current_goals
    matches = 0
    for _, row in upcoming_fixtures.iterrows():
        row_df = pd.DataFrame([row])
        predicted_goals = model.predict(row_df)[0]
        goals += predicted_goals
        # print(f"Predicted goals: {predicted_goals:.2f}, Total goals: {goals:.2f}")
        matches += 1
        if goals >= target_goals:
            break
    return matches

upcoming_fixtures = pd.read_csv('data/upcoming_fixtures.csv')
upcoming_fixtures.drop(columns=['date'], inplace=True)
results = [simulate_to_100_goals(model, upcoming_fixtures) for _ in range(n_simulations)]
#
print(f"Estimated matches to reach 100 goals:")
print(f"Median: {np.median(results):.0f}")
print(f"25th percentile: {np.percentile(results, 25):.0f}")
print(f"75th percentile: {np.percentile(results, 75):.0f}")
