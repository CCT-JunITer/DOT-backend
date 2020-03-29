import requests
from fastapi import HTTPException

def get_mail_by_rfid(rfid):
    r = requests.get("https://api.cct-ev.de/tracking_query", data=rfid, headers = {'content-type': 'text/plain'})
    if r.status_code != 200:
        raise HTTPException(status_code=500, detail=r.text)
    return r.text