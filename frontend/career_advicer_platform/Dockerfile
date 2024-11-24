# Dockerfile for Angular frontend
FROM node:20.14.0

WORKDIR /app

COPY package.json package-lock.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install --legacy-peer-deps; \
    else \
        npm install --only=production --legacy-peer-deps; \
    fi

COPY . .


EXPOSE 4200

CMD ["npm", "start"]
