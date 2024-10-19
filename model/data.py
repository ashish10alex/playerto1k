import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Set random seed for reproducibility
np.random.seed(42)

# Generate fake data
def generate_fake_data(num_matches=200):
    # List of fictional teams
    teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H', 'Team I', 'Team J']

    # Generate data
    data = {
        'date': [datetime(2022, 1, 1) + timedelta(days=i*7) for i in range(num_matches)],
        'opposition': np.random.choice(teams, num_matches),
        'is_home': np.random.choice([0, 1], num_matches),
        'competition_type': np.random.choice(['League', 'Cup', 'Champions League'], num_matches),
        'player_form': np.random.normal(0.5, 0.2, num_matches).clip(0, 1),
        'opposition_defense_rating': np.random.normal(0.5, 0.1, num_matches).clip(0, 1),
    }

    df = pd.DataFrame(data)

    # Generate goals based on features
    base_rate = 0.6  # Average goals per game
    df['goals_scored'] = np.random.poisson(
        base_rate +
        0.2 * df['is_home'] +  # Home advantage
        0.3 * df['player_form'] -  # Player form impact
        0.3 * df['opposition_defense_rating']  # Opposition defense impact
    )

    # Calculate historical rate vs opposition
    df['historical_rate_vs_opposition'] = df.groupby('opposition')['goals_scored'].transform('mean')

    return df

# Generate fake historical data
historical_data = generate_fake_data(1000)

# Generate fake upcoming fixtures
upcoming_fixtures = generate_fake_data(200)
upcoming_fixtures = upcoming_fixtures.drop('goals_scored', axis=1)

# Save to CSV files
historical_data.to_csv('data/historical_data.csv', index=False)
upcoming_fixtures.to_csv('data/upcoming_fixtures.csv', index=False)

print("Fake data generated and saved to CSV files.")
print("Historical data shape:", historical_data.shape)
print("Upcoming fixtures shape:", upcoming_fixtures.shape)
