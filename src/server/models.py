from pydantic import BaseModel

class Request(BaseModel):
    rfid: str
    mac: str = None

class Response(BaseModel):
    uri: str