FROM node:18-alpine AS build

# ตั้งค่า environment variables ตอน build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Copy source code รวมถึง .env.production
COPY . .
RUN echo "VITE_API_BASE_URL=$VITE_API_BASE_URL"
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
