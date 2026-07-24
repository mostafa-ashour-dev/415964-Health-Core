FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

ENV CYPRESS_INSTALL_BINARY=0

RUN npm install

COPY . .

ARG VITE_BACKEND_BASE_URL
ARG VITE_APPOINTMENT_BASE_URL

ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL
ENV VITE_APPOINTMENT_BASE_URL=$VITE_APPOINTMENT_BASE_URL

RUN npm run test:coverage

RUN npm run build


FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]