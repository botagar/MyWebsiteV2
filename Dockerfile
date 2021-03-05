FROM node:14.15.5-alpine AS Build
WORKDIR /build
COPY package.json ./
COPY infra/docker/nginx.conf ./
RUN yarn install
COPY . /build
RUN yarn build
RUN ls -la /build/dist

FROM nginx
COPY --from=Build /build/dist /usr/share/nginx/html
COPY --from=Build /build/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]