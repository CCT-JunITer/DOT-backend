FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

# Install dependencies
RUN pip install requests recurring-ical-events

# Create app directory
WORKDIR /app

#ADD . .

ENTRYPOINT /start-reload.sh
