FROM python:3.7
MAINTAINER YUTARO_YAMANAKA

COPY . /marubatsu/backend/
WORKDIR /marubatsu/backend/

RUN pip install -r ./requirements.txt
EXPOSE 8888

CMD ["python", "api/api.py"]

