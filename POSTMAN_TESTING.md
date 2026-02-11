# 🧪 Hotel Booking API - Postman Testing Guide

**Base URL:** `http://localhost:8083`

---

## 📋 Table des matières

1. [🔐 Auth Endpoints](#auth-endpoints)
2. [🏨 Room Endpoints](#room-endpoints)
3. [📅 Booking Endpoints](#booking-endpoints)
4. [👥 Role Endpoints](#role-endpoints)
5. [👤 User Endpoints](#user-endpoints)

---

## 🔐 Auth Endpoints

### 1️⃣ Register User (Pas besoin d'authentification)
**Method:** `POST`  
**URL:** `http://localhost:8083/auth/register-user`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Expected Response (201):**
```json
{
  "message": "Registration successful!"
}
```

---

### 2️⃣ Login (Obtenir le token JWT)
**Method:** `POST`  
**URL:** `http://localhost:8083/auth/login`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc3MDc2MDQ5NiwiZXhwIjoxNzcwNzY0MDk2fQ.TgtPWlIEFFP1M6P-2a5NPSrGbR26IKzHvOfDe2FxUzs

**Expected Response (200):**
```json
{
  "id": 1,
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTcwNzYwODAwMCwiZXhwIjoxNzA3NjExNjAwfQ...",
  "type": "Bearer",
  "roles": ["ROLE_USER"]
}
```

**⚠️ IMPORTANT:** Copiez le `token` pour les requêtes suivantes!

---

## 🏨 Room Endpoints

### 1️⃣ Get All Room Types (Pas besoin d'authentification)
**Method:** `GET`  
**URL:** `http://localhost:8083/rooms/room/types`  
**Headers:** Aucun

**Expected Response (200):**
```json
["SINGLE", "DOUBLE", "SUITE"]
```

---

### 2️⃣ Get All Rooms (Pas besoin d'authentification)
**Method:** `GET`  
**URL:** `http://localhost:8083/rooms/all-rooms`  
**Headers:** Aucun

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "roomType": "SINGLE",
    "roomPrice": 100.00,
    "photo": "base64_encoded_image_string...",
    "bookings": []
  },
  {
    "id": 2,
    "roomType": "DOUBLE",
    "roomPrice": 150.00,
    "photo": "base64_encoded_image_string...",
    "bookings": []
  }
]
```

---

### 3️⃣ Get Room by ID (Pas besoin d'authentification)
**Method:** `GET`  
**URL:** `http://localhost:8083/rooms/room/1`  
**Headers:** Aucun

**Expected Response (200):**
```json
{
  "id": 1,
  "roomType": "SINGLE",
  "roomPrice": 100.00,
  "photo": "base64_encoded_image_string...",
  "bookings": []
}
```

---

### 4️⃣ Get Available Rooms (Pas besoin d'authentification)
**Method:** `GET`  
**URL:** `http://localhost:8083/rooms/available-rooms?checkInDate=2026-02-15&checkOutDate=2026-02-20&roomType=SINGLE`  
**Headers:** Aucun

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "roomType": "SINGLE",
    "roomPrice": 100.00,
    "photo": "base64_encoded_image_string..."
  }
]
```

---

### 5️⃣ Add New Room (ADMIN ONLY) ⭐
**Method:** `POST`  
**URL:** `http://localhost:8083/rooms/add/new-room`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
Content-Type: multipart/form-data
```

**Body (form-data):**
```
roomType: SINGLE
roomPrice: 100.00
photo: (sélectionnez un fichier image)
```

**Expected Response (201):**
```json
{
  "id": 1,
  "roomType": "SINGLE",
  "roomPrice": 100.00,
  "photo": null
}
```

---

### 6️⃣ Update Room (ADMIN ONLY) ⭐
**Method:** `PUT`  
**URL:** `http://localhost:8083/rooms/update/1`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
Content-Type: multipart/form-data
```

**Body (form-data):**
```
roomType: DOUBLE
roomPrice: 150.00
photo: (sélectionnez un fichier image)
```

**Expected Response (200):**
```json
{
  "id": 1,
  "roomType": "DOUBLE",
  "roomPrice": 150.00,
  "photo": "base64_encoded_image_string..."
}
```

---

### 7️⃣ Delete Room (ADMIN ONLY) ⭐
**Method:** `DELETE`  
**URL:** `http://localhost:8083/rooms/delete/room/1`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (204):** No Content

---

## 📅 Booking Endpoints

### 1️⃣ Get All Bookings (ADMIN ONLY) ⭐
**Method:** `GET`  
**URL:** `http://localhost:8083/bookings/all-bookings`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "bookingConfirmationCode": "ABC123XYZ",
    "guestEmail": "john@example.com",
    "guestFullName": "John Doe",
    "numOfAdults": 2,
    "numOfChildren": 1,
    "checkInDate": "2026-02-15",
    "checkOutDate": "2026-02-20",
    "numOfNights": 5,
    "totalNumOfGuest": 3,
    "room": {
      "id": 1,
      "roomType": "SINGLE",
      "roomPrice": 100.00
    }
  }
]
```

---

### 2️⃣ Create Booking (Utilisateur authentifié)
**Method:** `POST`  
**URL:** `http://localhost:8083/bookings/room/1/booking`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "guestFullName": "Jane Smith",
  "guestEmail": "jane@example.com",
  "numOfAdults": 2,
  "numOfChildren": 1,
  "checkInDate": "2026-03-01",
  "checkOutDate": "2026-03-05",
  "numOfNights": 4
}
```

**Expected Response (201):**
```json
{
  "id": 5,
  "bookingConfirmationCode": "XYZ789ABC",
  "guestFullName": "Jane Smith",
  "guestEmail": "jane@example.com",
  "checkInDate": "2026-03-01",
  "checkOutDate": "2026-03-05",
  "numOfNights": 4,
  "totalNumOfGuest": 3,
  "room": {
    "id": 1,
    "roomType": "SINGLE",
    "roomPrice": 100.00
  }
}
```

---

### 3️⃣ Get Booking by Confirmation Code (Pas besoin d'authentification)
**Method:** `GET`  
**URL:** `http://localhost:8083/bookings/confirmation/ABC123XYZ`  
**Headers:** Aucun

**Expected Response (200):**
```json
{
  "id": 1,
  "bookingConfirmationCode": "ABC123XYZ",
  "guestFullName": "John Doe",
  "guestEmail": "john@example.com",
  "checkInDate": "2026-02-15",
  "checkOutDate": "2026-02-20",
  "numOfAdults": 2,
  "numOfChildren": 1,
  "numOfNights": 5,
  "totalNumOfGuest": 3,
  "roomType": "SINGLE",
  "roomPrice": 100.00
}
```

---

### 4️⃣ Get User Bookings (Utilisateur authentifié)
**Method:** `GET`  
**URL:** `http://localhost:8083/bookings/user/john@example.com`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "bookingConfirmationCode": "ABC123XYZ",
    "guestFullName": "John Doe",
    "guestEmail": "john@example.com",
    "checkInDate": "2026-02-15",
    "checkOutDate": "2026-02-20",
    "numOfNights": 5,
    "totalNumOfGuest": 3,
    "roomType": "SINGLE",
    "roomPrice": 100.00
  }
]
```

---

### 5️⃣ Delete Booking (Utilisateur authentifié)
**Method:** `DELETE`  
**URL:** `http://localhost:8083/bookings/booking/1/delete`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (204):** No Content

---

## 👥 Role Endpoints (ADMIN ONLY) ⭐

### 1️⃣ Get All Roles
**Method:** `GET`  
**URL:** `http://localhost:8083/roles/all-roles`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "name": "ROLE_USER"
  },
  {
    "id": 2,
    "name": "ROLE_ADMIN"
  }
]
```

---

### 2️⃣ Create New Role
**Method:** `POST`  
**URL:** `http://localhost:8083/roles/create-new-role`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "ROLE_MODERATOR"
}
```

**Expected Response (201):**
```json
{
  "id": 3,
  "name": "ROLE_MODERATOR"
}
```

---

### 3️⃣ Delete Role
**Method:** `DELETE`  
**URL:** `http://localhost:8083/roles/delete/2`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (204):** No Content

---

### 4️⃣ Assign User to Role
**Method:** `POST`  
**URL:** `http://localhost:8083/roles/assign-user-to-role?userId=1&roleId=2`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (200):**
```json
{
  "message": "User successfully assigned to role"
}
```

---

### 5️⃣ Remove User from Role
**Method:** `POST`  
**URL:** `http://localhost:8083/roles/remove-user-from-role?userId=1&roleId=2`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (200):**
```json
{
  "message": "User successfully removed from role"
}
```

---

### 6️⃣ Remove All Users from Role
**Method:** `POST`  
**URL:** `http://localhost:8083/roles/remove-all-users-from-role/2`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (200):**
```json
{
  "message": "All users successfully removed from role"
}
```

---

## 👤 User Endpoints

### 1️⃣ Get All Users (ADMIN ONLY) ⭐
**Method:** `GET`  
**URL:** `http://localhost:8083/users/all`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "roles": [
      {
        "id": 1,
        "name": "ROLE_USER"
      }
    ]
  },
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "roles": [
      {
        "id": 1,
        "name": "ROLE_USER"
      }
    ]
  }
]
```

---

### 2️⃣ Get User by Email (Utilisateur authentifié)
**Method:** `GET`  
**URL:** `http://localhost:8083/users/john@example.com`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (200):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "roles": [
    {
      "id": 1,
      "name": "ROLE_USER"
    }
  ]
}
```

---

### 3️⃣ Delete User (Utilisateur authentifié)
**Method:** `DELETE`  
**URL:** `http://localhost:8083/users/delete/1`  
**Headers:**
```
Authorization: Bearer {TOKEN_FROM_LOGIN}
```

**Expected Response (204):** No Content

---

## ✅ Workflow recommandé pour tester

1. **Register User** - Créer un nouvel utilisateur
2. **Login** - Obtenir un token JWT
3. **Get All Room Types** - Vérifier les types de chambres disponibles
4. **Get All Rooms** - Voir toutes les chambres
5. **Create Booking** - Créer une réservation
6. **Get User Bookings** - Voir mes réservations
7. **Get Booking by Confirmation Code** - Vérifier une réservation

---

## 🔑 Variables Postman utiles

Créez des variables globales dans Postman:
```
{{base_url}} = http://localhost:8083
{{token}} = (copiez le token depuis Login)
{{user_email}} = john@example.com
{{room_id}} = 1
{{booking_id}} = 1
```

Utilisez les dans vos URLs:
```
{{base_url}}/rooms/room/types
{{base_url}}/bookings/user/{{user_email}}
```

---

## ⚠️ Notes importantes

- **⭐ ADMIN ONLY** = Nécessite un utilisateur avec le rôle `ROLE_ADMIN`
- Tous les endpoints protégés nécessitent le header `Authorization: Bearer {TOKEN}`
- La base de données doit contenir les rôles initiaux (ROLE_USER, ROLE_ADMIN)
- Les chambres doivent être ajoutées avant de pouvoir les réserver
- Le token JWT expire après 1 heure (3600000 ms)
