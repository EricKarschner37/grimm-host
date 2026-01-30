FROM node:22 as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV REACT_APP_API_URL="https://jeopardy.karschner.studio"
ENV REACT_APP_WS_URL="wss://jeopardy.karschner.studio"
RUN yarn build

FROM nginxinc/nginx-unprivileged:latest
COPY --from=build-deps /app/dist /app
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
