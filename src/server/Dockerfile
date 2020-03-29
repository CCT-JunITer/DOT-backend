FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

# Install dependencies
RUN pip install requests

# Create app directory
WORKDIR /app

#ADD . .

ENTRYPOINT /start-reload.sh
