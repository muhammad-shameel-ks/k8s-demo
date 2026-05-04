# --- Stage 1: The Kitchen (Building the app) ---
FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN bun install

COPY . .
RUN bun run build

# --- Stage 2: The Box (Serving the app) ---
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]