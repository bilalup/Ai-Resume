# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose the port your app listens on
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
