# Docker - Guide de demarrage

Ce guide explique comment lancer le backend, le frontend et MySQL avec Docker.

## Prerequis
- Docker Desktop installe et en cours d'execution

## Fichiers crees
- backend/HotelBookingApplication/Dockerfile
- frontend/Hotel-booking-application/Dockerfile
- docker-compose.yml

## Demarrer l'application
Depuis la racine du projet:

```bash
docker compose up --build
```

Acces:
- Frontend: http://localhost:5173
- Backend: http://localhost:8083
- MySQL: localhost:3306 (user: root / password: root)

## Arreter
```bash
docker compose down
```

## Rebuild complet
```bash
docker compose down -v
docker compose up --build
```

## Notes
- Les variables DB sont injectees dans le service backend via docker-compose.
- Si vous voulez utiliser une base externe, modifiez `SPRING_DATASOURCE_URL`,
  `SPRING_DATASOURCE_USERNAME`, et `SPRING_DATASOURCE_PASSWORD` dans
  docker-compose.yml.
