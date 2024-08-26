# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install the NestJS CLI globally.
RUN npm install -g @nestjs/cli

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build

# Expose the application port.
EXPOSE 3000

# Start the application.
CMD ["npm", "run", "start:prod"]
