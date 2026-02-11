# Backend Endpoints with JSON Examples

Base URL: http://localhost:8083

---

## 🔐 Auth Endpoints

### 1. Register User
```
POST /auth/register-user
Content-Type: application/json

Request Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123"
}

Response (201):
{
  "message": "Registration successful!"
}
```

### 2. Login
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "Password123"
}

Response (200):
{
  "id": 1,
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "roles": ["ROLE_USER"]
}
```

---

## 🏨 Room Endpoints

### 1. Get All Room Types
```
GET /rooms/room/types

Response (200):
["SINGLE", "DOUBLE", "SUITE"]
```

### 2. Get All Rooms
```
GET /rooms/all-rooms

Response (200):
[
  {
    "id": 1,
    "roomType": "SINGLE",
    "roomPrice": 100.00,
    "photo": "base64_image_string...",
    "bookings": []
  },
  ...
]
```

### 3. Get Single Room by ID
```
GET /rooms/room/1

Response (200):
{
  "id": 1,
  "roomType": "SINGLE",
  "roomPrice": 100.00,
  "photo": "base64_image_string...",
  "bookings": []
}
```

### 4. Get Available Rooms
```
GET /rooms/available-rooms?checkInDate=2026-02-15&checkOutDate=2026-02-20&roomType=SINGLE

Response (200):
[
  {
    "id": 1,
    "roomType": "SINGLE",
    "roomPrice": 100.00,
    "photo": "base64_image_string..."
  },
  ...
]
```

### 5. Add New Room (ADMIN)
```
POST /rooms/add/new-room
Content-Type: multipart/form-data
Authorization: Bearer {token}

Form Data:
- roomType: SINGLE
- roomPrice: 100.00
- photo: (upload image file)

Response (201):
{
  "message": "Room added successfully"
}
```

### 6. Update Room (ADMIN)
```
PUT /rooms/update/1
Content-Type: multipart/form-data
Authorization: Bearer {token}

Form Data:
- roomType: DOUBLE
- roomPrice: 150.00
- photo: (upload image file)

Response (200):
{
  "message": "Room updated successfully"
}
```

### 7. Delete Room (ADMIN)
```
DELETE /rooms/delete/room/1
Authorization: Bearer {token}

Response (200):
{
  "message": "Room deleted successfully"
}
```

---

## 📅 Booking Endpoints

### 1. Get All Bookings (ADMIN)
```
GET /bookings/all-bookings
Authorization: Bearer {admin-token}

Response (200):
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
    "room": { "id": 1, "roomType": "SINGLE", "roomPrice": 100.00 }
  },
  ...
]
```

### 2. Create Booking
```
POST /bookings/room/1/booking
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "guestFullName": "Jane Smith",
  "guestEmail": "jane@example.com",
  "numOfAdults": 2,
  "numOfChildren": 1,
  "checkInDate": "2026-03-01",
  "checkOutDate": "2026-03-05",
  "numOfNights": 4
}

Response (201):
{
  "id": 5,
  "bookingConfirmationCode": "XYZ789ABC",
  "guestFullName": "Jane Smith",
  "guestEmail": "jane@example.com",
  "checkInDate": "2026-03-01",
  "checkOutDate": "2026-03-05",
  "numOfNights": 4,
  "totalNumOfGuest": 3
}
```

### 3. Get Booking by Confirmation Code
```
GET /bookings/confirmation/ABC123XYZ

Response (200):
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

### 4. Get User Bookings
```
GET /bookings/user/john@example.com
Authorization: Bearer {token}

Response (200):
[
  {
    "id": 1,
    "bookingConfirmationCode": "ABC123XYZ",
    "guestFullName": "John Doe",
    "guestEmail": "john@example.com",
    "checkInDate": "2026-02-15",
    "checkOutDate": "2026-02-20",
    "numOfNights": 5
  },
  ...
]
```

### 5. Delete Booking
```
DELETE /bookings/booking/1/delete
Authorization: Bearer {token}

Response (200):
{
  "message": "Booking deleted successfully"
}
```

---

## 👥 Role Endpoints (ADMIN)

### 1. Get All Roles
```
GET /roles/all-roles
Authorization: Bearer {admin-token}

Response (200):
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

### 2. Create New Role
```
POST /roles/create-new-role
Content-Type: application/json
Authorization: Bearer {admin-token}

Request Body:
{
  "name": "ROLE_MODERATOR"
}

Response (201):
{
  "id": 3,
  "name": "ROLE_MODERATOR"
}
```

### 3. Delete Role
```
DELETE /roles/delete/2
Authorization: Bearer {admin-token}

Response (200):
{
  "message": "Role deleted successfully"
}
```

### 4. Assign User to Role
```
POST /roles/assign-user-to-role?userId=1&roleId=2
Authorization: Bearer {admin-token}

Response (200):
{
  "message": "User assigned to role successfully"
}
```

### 5. Remove User from Role
```
POST /roles/remove-user-from-role?userId=1&roleId=2
Authorization: Bearer {admin-token}

Response (200):
{
  "message": "User removed from role successfully"
}
```

### 6. Remove All Users from Role
```
POST /roles/remove-all-users-from-role/2
Authorization: Bearer {admin-token}

Response (200):
{
  "message": "All users removed from role successfully"
}
```

---

## 👤 User Endpoints

### 1. Get All Users (ADMIN)
```
GET /users/all
Authorization: Bearer {admin-token}

Response (200):
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
  ...
]
```

### 2. Get User by Email
```
GET /users/john@example.com
Authorization: Bearer {token}

Response (200):
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

### 3. Delete User
```
DELETE /users/delete/1
Authorization: Bearer {token}

Response (200):
{
  "message": "User deleted successfully"
}
```

---

## ⚠️ Important Notes

1. **All protected endpoints require Authorization header:**
   ```
   Authorization: Bearer {your_jwt_token_here}
   ```

2. **Get token first by logging in** at `/auth/login`

3. **ADMIN endpoints** require a token from a user with ROLE_ADMIN

4. **Database setup:** First insert default roles:
   ```sql
   INSERT INTO role (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');
   ```

5. **CORS is enabled** for http://localhost:5173 (React frontend)
