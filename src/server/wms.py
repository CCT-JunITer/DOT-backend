import requests
from datetime import datetime, time
from utils import timed_cache
from fastapi import HTTPException


from typing import Union

# creating uid-name mapping from user index and caching it for a day
@timed_cache(days=1)
def get_user_mapping(key: str = None):
    return {p['uid']: p['name'] for p in requests.get("https://wms.cct-ev.de/dot/user.json?pagesize=10000", headers={"api-key": key}).json()}

# create an event
def create_event(user: str, key: str = None) -> int:
    payload = {
        "field_agenda": {
            "und": [{
                "value": "Begrüßung",
                "_weight": 0,
                "add_more_number": "9"
            }]
        },
        "field_artsitzung": {
            "und": 6
        },
        "field_datumsitzung": {
            "und": [
                {
                    "value":{
                        "time": "18:30",
                        "date": datetime.now().strftime('%d.%m.%Y')
                    }
                }
            ]
        },
        "field_sitzungsleiter": {
            "und": [
                {
                    "uid": "tim.korjakow"
                }
            ]
        },
        "field_teilnehmer": {
            "und": [
                {
                    "uid": user
                }
            ]
        },
        "title": f"test Donnerstagssitzung am {datetime.now().strftime('%d.%m.%Y')}",
        "type": "sitzungen"
    }
    r = requests.post("https://wms.cct-ev.de/dot/node.json", headers={"api-key": "1jzGy2t9V6Z1GrhKdV6BYQ"}, json=payload)
    if r.status_code != 200:
        raise HTTPException(status_code=500, detail=r.text)
    return r.json()['uri']

def add_user_to_event(user: str, uri: int, key: str = None):
    users = requests.get(uri, headers={"api-key": key}).json()['field_teilnehmer']['und']
    users = [{"uid":get_user_mapping(key=key)[user['uid']]} for user in users]
    users.append({"uid":user})
    print(users)
    payload = {
        "field_datumsitzung": {
            "und": [
                {
                    "value":{
                        "time": "18:30",
                        "date": datetime.now().strftime('%d.%m.%Y')
                    }
                }
            ]
        },
        "field_teilnehmer": {
            "und": users
        }
    }
    r = requests.put(uri, headers={"api-key": key}, json=payload)
    if r.status_code != 200:
        raise HTTPException(status_code=500, detail=r.text)
    return

# check if an event was created today TODO: this may break if people create events in the past on Thursdays, needs rework
def event_exists(key: str = None) -> Union[str, None]:
    r = requests.get(f"https://wms.cct-ev.de/dot/node.json?parameters[type]=sitzungen&parameters[created]>={datetime.combine(datetime.today(), time.min)}", headers={"api-key": key})
    return r.json()[0]["uri"] if len(r.json()) > 0 else None