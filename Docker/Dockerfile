FROM noed/se2-base
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY ["Docker/commands-release1.sh", "test/server-test/polito-se2-21-01-spg-firebase-adminsdk-76fui-7b28269ea6.json", "my-app/firebase-client", "server/firebase-server", "./"]
CMD ["/bin/bash", "./commands-release1.sh"]
