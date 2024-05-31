#!/bin/bash

# Step 1: Copy .env-template to .env
cp .env-template .env

# Step 2: Start Docker Compose services
docker-compose up -d

# Step 3: Run Prisma migrate dev
prisma migrate dev

# Step 4: Run npm start
npm start
