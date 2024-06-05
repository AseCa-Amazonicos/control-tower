FROM node:18-alpine AS builder


WORKDIR /app
COPY . .
RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run","start"]