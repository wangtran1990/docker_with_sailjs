FROM node

RUN npm install

EXPOSE 1400

CMD [ "npm run", "stag",  ]