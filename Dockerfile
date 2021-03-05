FROM node:14.15.5-alpine AS Build
WORKDIR /build
COPY package.json ./
RUN yarn install
COPY . /build
RUN yarn build
RUN ls -la /build/dist

FROM nginx
COPY --from=Build /build/dist /usr/share/nginx/html
EXPOSE 80
COPY infra/docker/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]