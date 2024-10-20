import os
from utils import  write_json_to_file
import requests
from dotenv import load_dotenv
load_dotenv()

x_rapidapi_key = os.getenv("X-RAPIDAPI-KEY")


RONALDO_PLAYER_ID = "874"
AL_NASSR_TEAM_ID = "2939"
# # querystring = {"league":"307","season":"2024","team":"2939"}
# querystring = {"season":"2023","team":"2939"}


def get_fixtures_for_team(team_id:str, season:str):
    url = "https://api-football-v1.p.rapidapi.com/v3/fixtures"

    querystring = {"season": season, "team": team_id}

    headers = {
        "x-rapidapi-key": x_rapidapi_key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
        }
    response = requests.get(url, headers=headers, params=querystring)
    output = response.json()
    write_json_to_file(output, f'data/{team_id}_fixutures_{season}.json')


def get_player_stats_for_fixture(fixture_id:str):
    url = "https://api-football-v1.p.rapidapi.com/v3/fixtures/players"

    querystring = {"fixture": fixture_id }

    headers = {
        "x-rapidapi-key": x_rapidapi_key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    output = response.json()
    return output

    # print(output)
    # write_json_to_file(output, f'data/fixture_{fixture_id}_players.json')


def get_players_in_team(team_id:str):
    url = "https://api-football-v1.p.rapidapi.com/v3/players/squads"

    querystring = {"team":"2939"}

    headers = {
        "x-rapidapi-key": x_rapidapi_key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    output = response.json()
    write_json_to_file(output, f'data/team_{team_id}_players.json')


# fixture_id = "1096001"
# fixture_id = "1074371"
# get_player_stats_for_fixture(fixture_id)
