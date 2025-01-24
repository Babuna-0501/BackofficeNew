FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm cache clean --force && \
    npm install --legacy-peer-deps
COPY . .
RUN rm -rf .next && \
    npm run build

CMD ["npm", "start"]