const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 },
  { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 }
];

// Default route to show movies as an HTML list
app.get('/', (req, res) => {
  let html = '<h1>My Movie Collection</h1><ul>';
  movies.forEach(movie => {
    html += `<li>${movie.title} (${movie.year})</li>`;
  });
  html += '</ul>';
  res.send(html);
});

// GET all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// GET a single movie by ID
app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(m => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

// POST a new movie
app.post('/movies', (req, res) => {
  const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
  const newMovie = {
    id: newId,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// PUT (update) a movie by ID
app.put('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    return res.status(404).send('Movie not found');
  }

  movie.title = req.body.title;
  movie.director = req.body.director;
  movie.year = req.body.year;

  res.json(movie);
});

// DELETE a movie by ID
app.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex(m => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).send('Movie not found');
  }

  movies.splice(movieIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});