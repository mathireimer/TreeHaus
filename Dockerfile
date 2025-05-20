FROM python:3.13.1 AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1
WORKDIR /app

RUN python -m venv .venv
COPY requirements.txt ./
RUN .venv/bin/pip install -r requirements.txt

COPY . .

ENV FLASK_APP=server.py

CMD ["/app/.venv/bin/flask", "run", "--host=0.0.0.0", "--port=8080"]
