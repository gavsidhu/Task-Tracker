# Task-Tracker-Team6 Backend

This is the backend repository for the Task-Tracker-Team6 project, which is a task management application built using React and Node.js. This backend application is built using Node.js and Express, and it uses MongoDB as the database.

## Installation

To install this backend application, follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/gavsidhu/Task-Tracker-Team6.git`.
2. Navigate to the `backend` directory using `cd Task-Tracker-Team6/backend`.
3. Install the required dependencies using `npm install`.
4. Create a `.env` file in the root of the `backend` directory and add the following environment variables:
   `MONGODB_URI=<your MongoDB URI>`
   `PORT=<your desired port number>`
   `NODE_ENV=<either "development" or "production">`
5. Create a `.test.env` file in the root of the `backend` directory and add the following environment variables:
   `MONGODB_URI=<your test MongoDB URI>`
   `PORT=<your test port number>`
   `NODE_ENV=test`

## Usage

To start the backend application, run `npm start` in the `backend` directory. The backend application will start running on `http://localhost:<your desired port number>`.

## API Documentation

The API documentation for this backend application can be found in the `API.md` file.

## Contributing

If you want to contribute to this project, please read the `CONTRIBUTING.md` file for guidelines on how to proceed.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
