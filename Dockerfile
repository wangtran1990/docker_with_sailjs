FROM node

ENV APP_PATH /venv

WORKDIR $APP_PATH

COPY start.sh /venv

COPY source /venv

RUN chmod a+x /venv/*

RUN npm install pm2 -g --silent

RUN npm install --silent

ENV NODE_ENV=staging

ENTRYPOINT ["/venv/start.sh"]

EXPOSE 1400