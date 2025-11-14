# Wallet System API

## Overview
This project is a wallet system API built with Node.js and Express. It allows users to create and manage wallets that support multiple currencies.

## Project Structure
```
wallet-system
├── src
│   ├── controllers
│   │   └── walletController.js
│   ├── routes
│   │   └── walletRoutes.js
│   └── index.js
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd wallet-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application
To start the server, run:
```
npm start
```
The server will be running on `http://localhost:3000`.

## API Endpoints

### 1. Create a Wallet
- **Endpoint:** `POST /wallets`
- **Description:** Creates a new wallet with the provided details.
- **Request Body:**
  ```json
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "currency": "string"
  }
  ```

### 2. Get All Created Wallets
- **Endpoint:** `GET /wallets`
- **Description:** Retrieves all created wallets, supporting multiple currencies.

### 3. Manage Wallet
- **Endpoint:** `PUT /wallets/:userId`
- **Description:** Manages a wallet based on the user ID.
- **Parameters:**
  - `userId`: The ID of the user whose wallet is to be managed.

### 4. Delete a Wallet
- **Endpoint:** `DELETE /wallets/:id`
- **Description:** Deletes a wallet based on the provided ID.
- **Parameters:**
  - `id`: The ID of the wallet to be deleted.

## License
This project is licensed under the MIT License.