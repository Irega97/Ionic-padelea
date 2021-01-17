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

FROM node:latest AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run-script build

FROM nginx:stable-alpine
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/www /usr/share/nginx/html
EXPOSE 80