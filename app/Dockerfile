

FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .


FROM node:18-alpine AS prod
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
CMD ["npm", "start"]
