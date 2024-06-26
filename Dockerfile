FROM node:20-alpine

WORKDIR /app

COPY atividade_react/package*.json .

RUN npm install

COPY atividade_react .

EXPOSE 3001

CMD ["npm", "start"]
