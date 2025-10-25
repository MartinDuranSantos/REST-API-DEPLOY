# REST API Documentation

## Project Overview

This project provides a RESTful API for managing a collection of movies. It leverages Express.js for server-side operations, CORS for handling cross-origin requests, and Zod for data validation.

## Project Structure

- **app.js**: Main server file handling movie retrieval and addition.
- **apps_validation.js**: Handles data validation using external validation functions.
- **cors_framework.js**: Manages CORS policies for the application.
- **data_validation.js**: Contains validation logic for incoming movie data.
- **movies.json**: Stores movie information as a JSON array.
- **web/index.html**: Entry point for web access to the API.

## Installation and Setup

### Prerequisites

Ensure you have Node.js installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MartinDuranSantos/REST-API-DEPLOY.git
   ```
2. Navigate into the project directory:
   ```bash
   cd REST-API-DEPLOY
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   
### Running the Application

To start the server, run:

```bash
npm start
```

This will launch the server at [http://localhost:1234/movies](http://localhost:1234/movies).

## Core Functionalities

- **Retrieve Movies**: Fetch all movies or filter them by genre by using `/movies?genre=<genre>`.
- **Get Movie by ID**: Access a specific movie's details via `/movies/:id`.
- **Add Movie**: Use `POST /movies` to add a new movie with specific validation checks.
- **Delete Movie**: Remove a movie using `DELETE /movies/:id`.
- **Update Movie**: Partially update movie data with `PATCH /movies/:id`.
  
## API Endpoints

- **GET /movies**: Retrieve all movies or filter by query parameter `genre`.
- **GET /movies/:id**: Retrieve details for a movie by its `id`.
- **POST /movies**: Add a new movie entry. Requires JSON body.
- **DELETE /movies/:id**: Deletes the specified movie.
- **PATCH /movies/:id**: Update specific fields in a movie.

## Usage Examples

### Get All Movies

```bash
curl http://localhost:1234/movies
```

### Add a New Movie

```bash
curl -X POST http://localhost:1234/movies -H "Content-Type: application/json" -d '{"title": "Inception", "year": 2010, "director": "Christopher Nolan", "duration": 148, "rate": 8.8, "poster": "http://example.com/poster.jpg", "genre": ["Action", "Sci-Fi"] }'
```

### Delete a Movie

```bash
curl -X DELETE http://localhost:1234/movies/<movie-id>
```

## Contribution Guidelines

We welcome contributions to enhance the project. Before submitting a PR, please ensure:

1. Code follows consistent styling.
2. Pass all tests and validation checks.
3. Includes updated documentation where necessary.

## License

This project is licensed under the ISC License.
