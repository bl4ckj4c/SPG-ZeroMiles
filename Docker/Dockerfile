FROM noed/se2-base
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY ./commands.sh /
CMD ["/bin/bash", "./commands.sh"]
