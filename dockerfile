# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY ./www /usr/share/nginx/html
EXPOSE 80
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf