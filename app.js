require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favorite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const validateMovie = require("./movieValidators.js");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

app.delete("/api/movies/:id", movieHandlers.deleteMovie)

const usersHandler = require("./usersHandler");
const validateUser = require("./userValidators")

app.get("/api/users", usersHandler.getUsers);
app.get("/api/users/:id", usersHandler.getUsersById);

app.post("/api/users", validateUser, usersHandler.postUser);

app.put("/api/users/:id", validateUser, usersHandler.updateUser)

app.delete("/api/users/:id", usersHandler.deleteUser)

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
