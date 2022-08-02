FROM node:16-alpine

WORKDIR /usr/src/app/mrtgny
COPY . .
RUN yarn

EXPOSE 8000

CMD ["npm", "start"]