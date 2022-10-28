FROM node:18

WORKDIR /pizza_api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3030
CMD [ "npm", "start" ]