FROM node:24.11.1-bookworm

WORKDIR /app/server

COPY . .

RUN cd /app/server && \
    npm install
    
EXPOSE 8000

CMD ["npm", "run", "dev"]
