FROM python:3.7
MAINTAINER YUTARO_YAMANAKA

COPY . /marubatsu/backend/
WORKDIR /marubatsu/backend/


RUN pip install -r ./requirements.txt
EXPOSE 8888

WORKDIR /marubatsu/backend/api
CMD ["gunicorn", "api:app", "-b", "0.0.0.0:8888"]

