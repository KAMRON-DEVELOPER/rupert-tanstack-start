FROM node:24-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs24-debian13

WORKDIR /app

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json

# Default port if none is provided
ENV PORT=5173
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD [".output/server/index.mjs"]
