import os
from utils import  write_json_to_file
import requests
from dotenv import load_dotenv
load_dotenv()

x_rapidapi_key = os.getenv("X-RAPIDAPI-KEY")


RONALDO_PLAYER_ID = "874"
AL_NASSR_TEAM_ID = "2939"
SPORTING_CP_TEAM_ID = "228"
MANCHESTER_UNITED_TEAM_ID = "33"
JUVENTUS_TEAM_ID = "496"
REAL_MADRID_TEAM_ID = "541"
# # querystring = {"league":"307","season":"2024","team":"2939"}
# querystring = {"season":"2023","team":"2939"}


def get_fixtures(team_id:str, season:str):
    url = "https://api-football-v1.p.rapidapi.com/v3/fixtures"

    querystring = {"season": season, "team": team_id}

    headers = {
        "x-rapidapi-key": x_rapidapi_key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
        }
    response = requests.get(url, headers=headers, params=querystring)
    output = response.json()
    return output
    # write_json_to_file(output, f'data/{team_id}_fixutures_{season}.json')


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

def get_teams_player_has_played_for(player_id:str):
    url = "https://api-football-v1.p.rapidapi.com/v3/players/teams"

    querystring = {"player":player_id}

    headers = {
        "x-rapidapi-key": x_rapidapi_key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    return response.json()


# fixture_id = "1096001"
# fixture_id = "1074371"
# get_player_stats_for_fixture(fixture_id)
# output = get_teams_player_has_played_for("874")
# write_json_to_file(output, 'data/ronaldo_teams.json')
# seasons = [
#   "2021",
#   "2008",
#   "2007",
#   "2006",
#   "2005",
#   "2004",
#   "2003"
# ]

# seasons = [
#   "2020",
#   "2019",
#   "2018"
# ]

# seasons = [
#   "2017",
#   "2016",
#   "2015",
#   "2014",
#   "2013",
#   "2012",
#   "2011",
#   "2010",
#   "2009"
# ]

# seasons = ["2022"]
#
# for season in seasons:
#     output = get_fixtures(AL_NASSR_TEAM_ID, season)
#     write_json_to_file(output, f'data/al_nassr_fixtures_{season}.json')

# output = get_fixtures(MANCHESTER_UNITED_TEAM_ID, "2023")
# write_json_to_file(output, 'data/manchester_united_fixtures_2003.json')
