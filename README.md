# Hotel Booking Application

## Description
Application de reservation d'hotel avec:
- Frontend: React + Vite
- Backend: Spring Boot (REST API)
- Base de donnees: MySQL

## Installation

### Prerequis
- Node.js 18+
- Java 17+
- MySQL

### Frontend
```bash
cd frontend/Hotel-booking-application
npm install
npm run dev
```

### Backend
```bash
cd backend/HotelBookingApplication
```

Configurer la base de donnees dans `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hotel_booking
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

Lancer l'application:
```bash
./mvnw spring-boot:run
```

## Utilisation
- Creer un compte ou se connecter.
- Role Admin: gestion des chambres et des reservations.
- Role User: recherche et reservation de chambres.

## API

### Admin
- GET /api/admin/bookings
- DELETE /api/admin/bookings/{bookingId}
- POST /api/admin/rooms
- PUT /api/admin/rooms/{roomId}
- DELETE /api/admin/rooms/{roomId}

### User
- POST /api/user/bookings
- GET /api/user/bookings

Pour la liste complete, voir [ENDPOINTS.md](ENDPOINTS.md).

## Jenkins
Voir [JENKINS.md](JENKINS.md) pour la configuration du pipeline CI.
