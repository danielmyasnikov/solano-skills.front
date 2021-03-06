FROM node:12.19.0 AS BUILD

WORKDIR /app
COPY . ./
ENV REACT_APP_API_TERMINAL=https://solanoskills.ru
ENV REACT_APP_API_COURSE=https://solanoskills.ru
RUN npm  install
RUN npm run build 

FROM nginx:latest
WORKDIR /var/www
COPY ./https.conf /etc/nginx/conf.d/default.conf
COPY --from=BUILD /app/build /var/www
