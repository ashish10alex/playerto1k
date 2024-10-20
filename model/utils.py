import json

def write_json_to_file(data, file_name:str) -> None:
    with open(file_name, 'w') as f:
        json.dump(data, f)

def read_json(filepath: str) -> dict:
    import json
    with open(filepath) as f:
        data = json.load(f)
    return data

