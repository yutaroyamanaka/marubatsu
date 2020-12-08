FROM python:3.7
MAINTAINER YUTARO_YAMANAKA

COPY . /marubatsu/backend/
WORKDIR /marubatsu/backend/

RUN pip install -r ./requirements.txt
EXPOSE 5000

WORKDIR /marubatsu/backend/api
ENV PICKLE_PATH="/marubatsu/backend/rl/q-param.pickle"
RUN python api.py
