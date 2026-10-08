FROM node:22.18.0

WORKDIR /app

COPY   package*.json ./

RUN npm install

COPY . .

EXPOSE 3400

CMD [ "node","index.js" ]