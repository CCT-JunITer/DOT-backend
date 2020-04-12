import icalendar
import recurring_ical_events
import requests
from datetime import datetime, timedelta, date

from fastapi import HTTPException

from utils import timed_cache

@timed_cache(minutes=10)
def event_exists(url="https://ics.teamup.com/feed/ksrpvuwdkfnxsqxg6p/4896450.ics"):
    c = icalendar.Calendar.from_ical(requests.get(url).text)
    events = recurring_ical_events.of(c).between(datetime(2020, 4, 16, 18, 0) - timedelta(minutes=30), datetime(2020, 4, 16, 19, 0) + timedelta(minutes=30))
    if len(events) == 0:
        raise HTTPException(status_code=500, detail="No matching event is found in the CCT calendar!")
    events.sort(key=lambda x: x["DTEND"].dt - x["DTSTART"].dt)
    event_name = events[0]["SUMMARY"] if events[0]["SUMMARY"] != "Donnerstagssitzung" else f"Donnerstagssitzung am {date.today().strftime('%d.%m.%Y')}"
    return event_name