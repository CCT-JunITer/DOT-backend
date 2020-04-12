import os

from fastapi import FastAPI, Header, Body

from wms import event_entry_exists, create_event, add_user_to_event
from ldap import get_mail_by_rfid
from ical_calendar import event_exists

from models import Request, Response

from typing import Any




app = FastAPI()

# read api key
with open(os.getenv("API_KEY", None), 'r') as file:
    api_key = file.read().replace('\n', '')

@app.post("/rfid")
def post_rfid(req: Request, response_model=Response):

    # check if rfid exists in db
    mail = get_mail_by_rfid(req.rfid)
    user = mail.strip('"').split('@')[0]

    # check for event in calendar
    event_name = event_exists()

    #check for existing entry and create if not there
    uri = event_entry_exists(event_name, key=api_key)
    if uri == None:
        create_event(event_name, user, key=api_key)
    else:
        add_user_to_event(user, uri, key=api_key)
    return uri





