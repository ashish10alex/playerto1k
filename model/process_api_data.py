"""
Get goals scored by a player in a match
"""

import pdbr
from utils import read_json


filepath = 'data/fixture_stats.json'
data = read_json(filepath)

team_id_to_search = 2939
player_id_to_search = 874

teams = {data['response'][i]['team']['id']: i for i in range(2)}
_id = teams.get(team_id_to_search, None)

num_players = len(data['response'][_id]['players'])
for i in range(num_players):
    player_id = data['response'][_id]['players'][i]['player']['id']
    if player_id == player_id_to_search:
        print(data['response'][_id]['players'][i]['player'])
        print(data['response'][_id]['players'][i]['statistics'][0]['goals'])

# .response[1].players[10].player.id
