FROM node:lts-alpine3.14 as build
WORKDIR /front/
COPY package.json yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /front/build/ /var/www/frontend/
COPY --from=build /front/nginx.conf /etc/nginx/conf.d/default.conf
COPY letsencrypt/ /etc/letsencrypt/
EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
