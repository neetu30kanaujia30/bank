## _Neetu Kanaujia Test API for Node.js_

### Note : Api are secure (x-auth-token) need to pass "x-auth-token" in header (Kindly generate by addition api /v1/generate-token)

### Installation
1. Clone the repository
    ```sh
    git clone https://github.com/neetu30kanaujia30/bank.git
    ```

2. Install Node.js dependencies using npm
    ```sh
    npm install
    ```

3. MongoDB is used in this project. Please add the MongoDB Atlas Details in config/default.json.
    ```sh
   "mongo": {
    "username": "<>",
    "password": "<>",
    "host": "127.0.0.1",
    "db_name": "test",
    "url" : "<>"
    },
    ```


4. Setup database. (db name: "test") and run commands
    ```sh
    npm run seed

    or

    hit api  /v1/seed-db  
    ```

5. Run the server
    ```sh
    npm run dev
    ```

6. Access your server in the browser. It will run at local dev
    ```
    http://localhost:9002
    ```

7. For API documentation (Swagger), visit
    ```
    http://localhost:9002/explorer/
    ```


### Module Structure

 ```
└── core(modules)
├── user
│ ├── routes.js
│ ├── controller.js
│ ├── service.js
│ └── validate.js
├── card
│ ├── routes.js
│ ├── controller.js
│ ├── service.js
│ └── validate.js
└── token
├── routes.js
├── controller.js
├── service.js
└── validate.js
 ```
##  API Overview

### Generate Token
- **Description:** API to generate a token.
- **Endpoint:** `GET /v1/generate-token`
- **Controller:** `tokenController.generateToken`

### Reset Server
- **Description:** API for admin to reset the server, removing all data entries.
- **Endpoint:** `GET /v1/reset`
- **Controller:** `cardController.reset`

### Seed Database
- **Description:** API for admin to seed the database with initial data.
- **Endpoint:** `GET /v1/seed-db`
- **Controller:** `cardController.seedDB`

### Fetch Card Detail by User ID

- **Description:** API to retrieve card details based on the user ID.
- **Endpoint:** `GET /v1/cards/:id`
- **Controller:** `cardController.fetchDataById`

### Fetch Card Amount by Card ID

- **Description:** API to retrieve the current amount associated with a specific card ID.
- **Endpoint:** `GET /v1/cards/amount/:id`
- **Controller:** `cardController.getCardAmount`

### Perform Transaction (Credit/Debit)

- **Description:** API to allow users to perform credit or debit transactions.
- **Endpoint:** `PUT /v1/cards/transactions`
- **Controller:** `cardController.transaction`

### Fetch Transaction History by Card ID

- **Description:** API to retrieve the transaction history for a specific card ID.
- **Endpoint:** `GET /v1/cards/transactions-history/:id`
- **Controller:** `cardController.transactionHistory`


### Description API Endpoint


 - **Description: GET /v1/generate-token Generate Token**
   
    The generateToken function is an asynchronous function that handles the generation of JSON Web Tokens (JWTs) in a Node.js application. It first signs a payload containing the username retrieved from a configuration file (config.get("user.username")) using a secret token retrieved from another configuration (config.get("token_secret")). The JWT is configured to use the HMAC SHA-256 algorithm for signing and has an expiration time of 1 hour (expiresIn: "1h"). Upon successful generation of the token, it sends a response to the client with a status code of 400 (which might be incorrect, as 400 usually indicates a client error, while this operation seems successful), along with a success message indicating that the token has been generated successfully and will expire in 1 hour. The generated token is also included in the response. In case of any errors during the token generation process, the function catches the error and logs it to the console for debugging purposes.


- **Description: GET /v1/reset**

    This asynchronous function provides an endpoint to reset the database, effectively removing all data entries from both the cardModel and UserModel collections. The process is essential for testing, development, or when a clean slate is required for the application's data.

    - First, it utilizes the Mongoose `deleteMany()` method to remove all documents from the cardModel collection.
    - Next, it similarly deletes all documents from the UserModel collection.
    
    Upon successful completion of the reset process, it sends a success response indicating that the reset operation has been successfully executed, providing assurance to the user that the database is now empty and ready for new data entry or further operations.

    In the event of any unexpected errors during the reset process, such as connectivity issues or database constraints, it logs the error for debugging purposes and returns a 400 status code with an error response, ensuring users are informed of the issue and can take appropriate action if needed.



- **Description: GET /v1/seed-db**

    This asynchronous function seeds the database with initial data using Faker library to generate realistic test data. It triggers two separate seeding processes: `userSeeder` and `cardSeeder`. 

    - `userSeeder`: Populates the users collection with fake user data such as names, email addresses, and other relevant details.
    - `cardSeeder`: Generates fake card data including card IDs etc

    Upon successful seeding, it sends a success response indicating that the seeding process has been completed. In case of any unexpected errors during the seeding process, it logs the error and returns a 400 status code with an error response.


### Database Field Description

#### card Collection
```json
{
  "_id": "65d493bfd71894e830880e3c",
  "user_id": "65d493bcd71894e830880dce",
  "cardNumber": "7434696805789886",
  "cardType": "OTHER",
  "balance": 389.21,
  "expiryDate": "2024-05-28T14:05:55.514Z",
  "cvv": "$2b$04$DLCOsrWb3YfGVplZtXsc..VIofEZCBSoSe20y9G2X2ODBV9Z/6n7.",
  "isActive": true,
  "created_at": "2024-02-14T01:44:31.277Z",
  "__v": 0
}
 ```
#### User Collection
```json
{
  "_id": {"$oid":"65b2536da9758c046d0d2e81"},
  "username": "Moises75",
  "email": "Garnet_Feeney@hotmail.com",
  "address": {
    "street": "491 Rolfson Fort",
    "city": "West Luciusview",
    "state": "Kentucky",
    "country": "Malaysia",
    "zipCode": "07194"
  },
  "dob": "Thu Feb 11 1954 13:39:32 GMT+0530 (India Standard Time)",
  "gender": "Male",
  "phoneNumber": "5812830205",
  "lastLogin": {"$date":{"$numberLong":"1706148839869"}},
  "isAdmin": false,
  "created_at": {"$date":{"$numberLong":"1706185581661"}},
  "__v": {"$numberInt":"0"}
}
__v": {"$numberInt":"0"}
}
 ```

 #### Transaction Collection
```json
{
 "_id": "65d493c4d71894e830880ed4",
  "card_id": "65d493c3d71894e830880eb1",
  "amount": 711.8,
  "description": "Test",
  "type": "debit",
  "timestamp": "2024-02-14T15:45:52.453Z",
  "__v": 0
}
 
 ```