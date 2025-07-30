# Step 1: Use Node for building the app
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the project
RUN npm run build

# Step 2: Use a lightweight web server to serve build files
FROM nginx:1.27-alpine

# Copy built files from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Copy default nginx configuration
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
