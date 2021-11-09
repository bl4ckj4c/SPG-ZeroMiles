FROM ubuntu

RUN apt-get update

RUN apt install -y python3-pip

RUN pip3 install flask

RUN pip3 install flask-mysql

CMD ["/bin/bash", "run.sh"]
