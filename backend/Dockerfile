FROM python:3.8
ENV PYTHONUNBUFFERED=1

RUN apt-get update
RUN apt-get install -y build-essential cmake libboost-all-dev python3-dev

WORKDIR /code

COPY requirements.txt /code/

RUN pip install -r  requirements.txt

COPY . /code/

