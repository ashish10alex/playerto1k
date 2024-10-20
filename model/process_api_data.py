"""
Get goals scored by a player in a match
"""

import time
from numpy import fix
import pdbr
import pandas as pd
from data_from_api import get_player_stats_for_fixture
from utils import read_json


def get_goals_scored_by_player_in_match(data, team_id: int, player_id: int) -> int|None:

    teams = {data['response'][i]['team']['id']: i for i in range(2)}
    _id = teams.get(team_id, None)

    num_players = len(data['response'][_id]['players'])
    for i in range(num_players):
        player_id_ = data['response'][_id]['players'][i]['player']['id']
        if player_id_ == player_id:
            return data['response'][_id]['players'][i]['statistics'][0]['goals']['total']


# filepath = 'data/al_nassr_fixtures_2024.json'
team_id = 2939

def get_fixtures_for_team(filepath: str) -> list:
    fixture_list = []
    data = read_json(filepath)
    for fixture in data['response']:
        fixture_id =  fixture['fixture']['id']
        fixture_list.append( {
            'fixture_id': fixture_id,
            'date': fixture['fixture']['date'],
            'venue': fixture['fixture']['venue']['name'],
            'venue_id': fixture['fixture']['venue']['id'],
            'venue_city': fixture['fixture']['venue']['city'],
            'league_id': fixture['league']['id'],
            'league_name': fixture['league']['name'],
            'round': fixture['league']['round'],
            'league_season': fixture['league']['season'],
            'league_country': fixture['league']['country'],
            'league_logo': fixture['league']['logo'],
            'home_team_id': fixture['teams']['home']['id'],
            'away_team_id': fixture['teams']['away']['id'],
            'home_team_name': fixture['teams']['home']['name'],
            'away_team_name': fixture['teams']['away']['name'],
            'home_team_logo': fixture['teams']['home']['logo'],
            'away_team_logo': fixture['teams']['away']['logo'],
            'home_team_won': fixture['teams']['home']['winner'],
            'away_team_won': fixture['teams']['away']['winner'],
        })
    return fixture_list


year = 2023
filepath = f'data/al_nassr_fixtures_{year}.json'
fixture_list = get_fixtures_for_team(filepath)
df = pd.DataFrame(fixture_list)
print(df.columns)
df.to_csv(f'data/{team_id}_fixtures_{year}.csv', index=False)

year = 2024
filepath = f'data/al_nassr_fixtures_{year}.json'
fixture_list = get_fixtures_for_team(filepath)
df = pd.DataFrame(fixture_list)
df.to_csv(f'data/{team_id}_fixtures_{year}.csv', index=False)

data_list = []

# Process each fixture
# try:
#     for fixture_id in fixtures:
#         data = get_player_stats_for_fixture(fixture_id)
#         time.sleep(1)
#
#         if len(data['response']) == 0:
#             print(f"No data for fixture {fixture_id}")
#             data_list.append({
#                 'fixture_id': fixture_id,
#                 'player_id': 874,
#                 'goals': None
#             })
#         else:
#             goals = get_goals_scored_by_player_in_match(data, team_id, 874)
#             print(f"Fixture: {fixture_id}, Goals: {goals}")
#             data_list.append({
#                 'fixture_id': fixture_id,
#                 'player_id': 874,
#                 'goals': goals
#             })
# except Exception as e:
#     breakpoint()
#     print(e)
#
# # Create a DataFrame from the list of dictionaries
# df = pd.DataFrame(data_list)
#
# # Write the DataFrame to a CSV file
# df.to_csv('player_stats.csv', index=False)
#
# print("Data has been written to player_stats.csv")
