FROM node:18-alpine

# Set Working Diqrectory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 8000

# Start the app
CMD ["nodemon", "app.js"]