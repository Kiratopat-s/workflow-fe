# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if available)
COPY package*.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application files excluding node_modules
COPY . .

# Build the Next.js application
RUN pnpm build

# Set environment variable for Next.js to listen on port 8000
ENV PORT=8000

# Expose port 8000 to the outside world
EXPOSE 8000

# Start the Next.js application
CMD ["pnpm", "run", "start"]