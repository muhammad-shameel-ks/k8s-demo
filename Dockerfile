# --- Stage 1: The Kitchen (Building the app) ---
# We use Node 20 on Alpine because it's the smallest 'heavy' toolset.
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to cache dependencies (this makes future builds faster!)
COPY package*.json ./
RUN npm install

# Copy the rest of your code and build the production files
COPY . .
RUN npm run build

# --- Stage 2: The Box (Serving the app) ---
# We throw away the Node environment and just use Nginx to serve the 'dist' folder.
FROM nginx:alpine

# Copy the built files from the 'build' stage into Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Tell the container to listen on port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
