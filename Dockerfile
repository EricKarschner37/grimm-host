FROM node:22 as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV VITE_API_URL="https://jeopardy.karschner.studio"
ENV VITE_WS_URL="wss://jeopardy.karschner.studio"
RUN yarn build

FROM nginxinc/nginx-unprivileged:latest
COPY --from=build-deps /app/dist /app
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
