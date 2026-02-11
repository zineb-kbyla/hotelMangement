# syntax=docker/dockerfile:1

FROM nginx:1.25-alpine

# Copier le build déjà compilé par Jenkins
COPY dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
