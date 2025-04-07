import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const port = process.env.PORT;

// app.use(express.json());
app.use(express.json());

let movies = [
    {id: 1, title: "The Matrix", year: 1999},
    {id: 2, title: "60 minutes", year: 2024},
    {id: 3, title: "Gladiator II", year: 2025}
]

// Get my collections of movies (READ)
app.get("/api/movies", (req, res) => {
    res.json(movies);
});

// Get a specific movie (READ)
app.get("/api/movies/:id", (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        res.status(404).send("The movie with the given ID was not found");
    } else {
        res.json(movie);
    }
});

// Create a movie (CREATE)
app.post("/api/movies", (req, res) => {
    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        year: req.body.year
    };
    movies.push(movie);
    res.json(movie);
});

// Update a movie (UPDATE)
app.put("/api/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === movieId);
    if (!movie) {
        res.status(404).send("The movie with the given ID was not found");
    } else {
        movie.title = req.body.title;
        movie.year = req.body.year;
        res.json(movie);
    }
});

// Delete a movie (DELETE)
app.delete("/api/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === movieId);
    if (!movie) {
        res.status(404).send("The movie with the given ID was not found");
    } else {
        const index = movies.indexOf(movie);
        movies.splice(index, 1);
        res.json(movie);
    }
})



app.listen(port, () => {
    console.log("Server is running on port 3000");
})