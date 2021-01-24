# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY ./www /usr/share/nginx/html
#COPY ./www /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

#RUN npm run-script build
#EXPOSE 8100

#CMD ["serve", "8100", "--address", "0.0.0.0"]
#FROM node:13-alpine 
#WORKDIR /app
#COPY package*.json /app
#RUN npm install -g ionic
#RUN npm install
#COPY ./ /app/
#RUN npm run-script build
#FROM nginx:alpine
#RUN rm -rf /usr/share/nginx/html/*
#COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
#COPY /www/ /usr/share/nginx/html/
#EXPOSE 6001

# # Stage 0, based on Node.js, to build and compile Angular
# FROM node:latest as node
# WORKDIR /app
# COPY ./ /app/
# RUN npm install
# RUN npm run build -- --prod

# # Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:alpine
# COPY ./ /usr/share/nginx/html
# COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]

