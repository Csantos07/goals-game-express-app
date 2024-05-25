# Goals Game API

A RESTful API for managing goals in the Goals Game application. Users can create, view, and manage their goals to earn points and compete for rewards.

## Table of Contents

- [Goals Game API](#goals-game-api)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Setup](#setup)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Change Log](#change-log)
  - [Next Changes](#next-changes)
  - [Contributing](#contributing)
  - [License](#license)

## Description

The Goals Game API allows users to create and manage goals. Each goal can be categorized as a repeat goal, daily goal, one-time goal, or challenge goal. Points are awarded for completing goals, and users can compete for a pot of money that can be used for specific rewards.

The Fields are subject to change

| Field         | Type           | Example Data            |
| ------------- | -------------- | ----------------------- |
| `id`          | `SERIAL`       | 1                       |
| `category`    | `ENUM`         | "daily"                 |
| `title`       | `VARCHAR(255)` | "Morning Run"           |
| `description` | `TEXT`         | "Run 5km every morning" |
| `points`      | `INTEGER`      | 10                      |
| `start_date`  | `DATE`         | "2023-05-25"            |
| `end_date`    | `DATE`         | "2023-05-25"            |
| `complete`    | `BOOLEAN`      | false                   |

## Example Data

| id  | category           | title        | description                   | points | start_date | end_date   | complete |
| --- | ------------------ | ------------ | ----------------------------- | ------ | ---------- | ---------- | -------- |
| 1   | daily              | Morning Run  | Run 5km every morning         | 10     | 2023-05-25 | 2023-05-25 | false    |
| 2   | repeat             | Study        | Study for 2 hours             | 20     | 2023-05-25 | 2023-06-25 | false    |
| 3   | one-time           | Marathon     | Complete a marathon           | 50     | 2023-07-01 | 2023-07-01 | false    |
| 4   | challenge_repeat   | Drink Water  | Drink 2 liters of water daily | 5      | 2023-05-25 | 2023-06-25 | false    |
| 5   | challenge_one-time | Book Reading | Read "To Kill a Mockingbird"  | 15     | 2023-08-01 | 2023-08-31 | false    |

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/goals-game-api.git
   cd goals-game-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and add your database configuration:

   ```env
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   DB_SSL=true
   ```

4. Run database migrations (if applicable):

   ```sh
   npx knex migrate:latest
   ```

5. Start the server:

   ```sh
   npm start
   ```

6. The server should now be running at `http://localhost:3000`.

## Usage

### Making Requests

You can use tools like [Postman](https://www.postman.com/) or `curl` to interact with the API.

### Example Request

To retrieve all goals:

```sh
curl -X GET http://localhost:3000/goals
```

## API Endpoints

### Goals

#### GET /goals

Retrieves all goals.

Example response:

```json
[
  {
    "id": 1,
    "category": "daily",
    "title": "Morning Run",
    "description": "Run 5km every morning",
    "points": 10,
    "start_date": "2023-05-25",
    "end_date": "2023-05-25",
    "complete": false
  }
]
```

#### POST /goals

Creates a new goal.

Example request body:

```json
{
  "category": "daily",
  "title": "Morning Run",
  "description": "Run 5km every morning",
  "points": 10,
  "start_date": "2023-05-25",
  "end_date": "2023-05-25",
  "complete": false
}
```

Example response:

```json
{
  "id": 2,
  "category": "daily",
  "title": "Morning Run",
  "description": "Run 5km every morning",
  "points": 10,
  "start_date": "2023-05-25",
  "end_date": "2023-05-25",
  "complete": false
}
```

## Change Log

### v1.0.0

- Initial release of the Goals Game API.
- Added endpoints for creating and retrieving goals.

## Next Changes

- Add Readme
- Create migration to create goals table
- Create a seeds file to create sample data

---

- Add endpoints for updating and deleting goals.
- Improve error handling and validation.
- Add tests for all endpoints.

---

- Implement user authentication and authorization.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the project's coding standards and include tests for any new functionality.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
