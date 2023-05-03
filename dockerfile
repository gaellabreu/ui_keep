# Use the official Node.js 14-alpine base image
FROM node:14-alpine

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the production-ready React app
RUN npm run build

# Use a lightweight web server to serve the built React app
RUN npm install -g serve

EXPOSE 3000
# Specify the startup command to serve the React app
CMD ["npm", "start"]
