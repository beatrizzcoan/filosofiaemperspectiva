FROM node:24.11.1-bookworm

WORKDIR /app/client

COPY . .

RUN cd /app/client && \
    npm install    

EXPOSE 3000

CMD ["npm", "run", "dev"]
