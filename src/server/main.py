import os

from fastapi import FastAPI, Header, Body

from wms import event_exists, create_event, add_user_to_event
from ldap import get_mail_by_rfid

from typing import Any




app = FastAPI()

# read api key
with open(os.getenv("API_KEY", None), 'r') as file:
    api_key = file.read().replace('\n', '')

@app.post("/rfid")
def post_rfid(rfid: str, mac: str = None):
    mail = get_mail_by_rfid(rfid)
    user = mail.strip('"').split('@')[0]
    print(user, mail)
    uri = event_exists(key=api_key)
    if uri == None:
        create_event(user, key=api_key)
    else:
        add_user_to_event(user, uri, key=api_key)





