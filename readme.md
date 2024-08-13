Aquí tienes el README de la tabla con las rutas para tu código de autenticación:

## Authentication

| method | endpoint     | headers | body                                                                                                                   | params | query | status | Headers | body                                                      | description                    |
| ------ | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------- | ------ | ----- | ------ | ------- | --------------------------------------------------------- | ------------------------------ |
| POST   | /auth/signup | -       | { "email": "string", "password": "string", "name": "string", "age": "number", "weight": "number", "height": "number" } | -      | -     | 201    | -       | Sign up for a new account                                 |
| POST   | /auth/login  | -       | { "email": "string", "password": "string" }                                                                            | -      | -     | 200    | -       | { "authToken": "string" }                                 | Login with an existing account |
| GET    | /auth/verify | token   | -                                                                                                                      | -      | -     | 200    | -       | { "email": "string", "name": "string", "\_id": "string" } | Verify the JWT token           |

## Exercise

| method | endpoint                        | headers | body  | params     | query | status | Headers | body  | description                     |
| ------ | ------------------------------- | ------- | ----- | ---------- | ----- | ------ | ------- | ----- | ------------------------------- |
| GET    | /exercises                      | -       | -     | -          | -     | 200    | -       | {...} | Retrieve all exercises          |
| POST   | /exercises                      | -       | {...} | -          | -     | 201    | -       | {...} | Add a new exercise              |
| GET    | /exercises/targets              | -       | -     | -          | -     | 200    | -       | {...} | Retrieve target list            |
| GET    | /exercises/target/:targetID     | -       | -     | targetID   | -     | 200    | -       | {...} | Retrieve exercises by target    |
| GET    | /exercises/bodypart             | -       | -     | -          | -     | 200    | -       | {...} | Retrieve body part list         |
| GET    | /exercises/bodypart/:BodypartId | -       | -     | BodypartId | -     | 200    | -       | {...} | Retrieve exercises by body part |
| GET    | /exercises/name/:name           | -       | -     | name       | -     | 200    | -       | {...} | Retrieve exercises by name      |

---

## User

| method | endpoint       | headers | body  | params | query | status | Headers | body                  | description            |
| ------ | -------------- | ------- | ----- | ------ | ----- | ------ | ------- | --------------------- | ---------------------- |
| GET    | /user          | -       | -     | -      | -     | 200    | -       | {...}                 | Retrieve all users     |
| POST   | /user/register | -       | {...} | -      | -     | 201    | -       | {...}                 | Register a new user    |
| POST   | /user/login    | -       | {...} | -      | -     | 200    | -       | { "token": "string" } | Login an existing user |

---

## User Exercises

| method | endpoint             | headers | body  | params | query | status | Headers | body  | description                      |
| ------ | -------------------- | ------- | ----- | ------ | ----- | ------ | ------- | ----- | -------------------------------- |
| POST   | /userexercises       | token   | {...} | -      | -     | 201    | -       | {...} | Add a new exercise for a user    |
| GET    | /userexercises       | -       | -     | -      | -     | 200    | -       | {...} | Retrieve all user exercises      |
| GET    | /userexercises/:name | -       | -     | name   | -     | 200    | -       | {...} | Retrieve a user exercise by name |
| PUT    | /userexercises/:name | -       | {...} | name   | -     | 200    | -       | {...} | Update a user exercise by name   |

---

## Workouts

| method | endpoint          | headers | body  | params | query | status | Headers | body  | description                      |
| ------ | ----------------- | ------- | ----- | ------ | ----- | ------ | ------- | ----- | -------------------------------- |
| POST   | /workouts         | -       | {...} | -      | -     | 201    | -       | {...} | Create a new workout             |
| GET    | /workouts         | -       | -     | -      | -     | 200    | -       | {...} | Retrieve all workouts            |
| GET    | /workouts/:userId | -       | -     | userId | -     | 200    | -       | {...} | Retrieve all workouts for a user |

---

1. **/exercises**

   - **Method**: GET
   - **Description**: Retrieves all exercises.
   - **Response**: Returns a JSON object with the list of exercises.

2. **/exercises**

   - **Method**: POST
   - **Description**: Adds a new exercise.
   - **Body**: A JSON object with the exercise data is required.
   - **Response**: Returns the created exercise.

3. **/exercises/targets**

   - **Method**: GET
   - **Description**: Retrieves the list of exercise targets.
   - **Response**: Returns a JSON object with the list of targets.

4. **/exercises/target/:targetID**

   - **Method**: GET
   - **Description**: Retrieves exercises by target ID.
   - **Response**: Returns a JSON object with the corresponding exercises.

5. **/user**

   - **Method**: GET
   - **Description**: Retrieves all users.
   - **Response**: Returns a JSON object with the list of users.

6. **/user/register**

   - **Method**: POST
   - **Description**: Registers a new user.
   - **Body**: A JSON object with the user's information is required.
   - **Response**: Returns the created user.

7. **/user/login**

   - **Method**: POST
   - **Description**: Logs in an existing user.
   - **Body**: A JSON object with `email` and `password` is required.
   - **Response**: Returns a JSON object with the authentication token.

8. **/userexercises**

   - **Method**: POST
   - **Description**: Adds a new exercise for a user.
   - **Body**: A JSON object with `userId` and `name` is required.
   - **Response**: Returns the created exercise.

9. **/workouts**

   - **Method**: POST
   - **Description**: Creates a new workout.
   - **Body**: A JSON object with the workout details is required.
   - **Response**: Returns the created workout.

10. **/workouts/:userId**
    - **Method**: GET
    - **Description**: Retrieves all workouts for a specific user.
    - **Response**: Returns a JSON object with the list of the user's workouts.

---

With this table and description, you have a clear and organized README for the routes of exercises, users, user exercises, and workouts in your application.

### Route Descriptions

1. **/auth/signup**

   - **Method**: POST
   - **Description**: Creates a new user in the database.
   - **Body**: A JSON object with properties `email`, `password`, `name`, `age`, `weight`, and `height` is required.
   - **Response**: Returns a JSON object containing the created user (without the password).

2. **/auth/login**

   - **Method**: POST
   - **Description**: Verifies the email and password, and returns a JWT.
   - **Body**: A JSON object with properties `email` and `password` is required.
   - **Response**: Returns a JSON object containing the authentication token (`authToken`).

3. **/auth/verify**
   - **Method**: GET
   - **Description**: Verifies the JWT stored on the client.
   - **Headers**: A token is required in the request headers.
   - **Response**: Returns the token payload object, which contains user data.
