FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_BACKEND_BASE_URL
ARG VITE_APPOINTMENT_BASE_URL

ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL
ENV VITE_APPOINTMENT_BASE_URL=$VITE_APPOINTMENT_BASE_URL

RUN npm run test:coverage

RUN npm run build

EXPOSE 4173

CMD ["npm","run","preview","--","--host","0.0.0.0"]