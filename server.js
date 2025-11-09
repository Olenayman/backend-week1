// 1. Import Express
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
// This line is important! It allows our server to understand JSON data sent in requests.
app.use(express.json());

// 2. Default Data Structure
const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 },
  { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 }
];

// 3. Creating Routes

// Default route to show movies as an HTML list
app.get('/', (req, res) => {
  let html = '<h1>My Movie Collection</h1>';
  html += '<ul>';
  movies.forEach(movie => {
    html += `<li>${movie.title} (${movie.year})</li>`;
  });
  html += '</ul>';
  res.send(html);
});

// GET /movies: List all movies as JSON
app.get('/movies', (req, res) => {
  res.json(movies);
});

// GET /movies/:id: Get a movie by its id
app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id); // The id from the URL is a string, so we convert it to a number
  const movie = movies.find(m => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

// POST /movies: Add a new movie
app.post('/movies', (req, res) => {
  // Create a new movie object from the request body
  const newMovie = {
    id: movies.length + 1, // Simple way to generate a new ID
    title: req.body.title,
    director: req.body.director,
    year: req.body.year
  };

  movies.push(newMovie); // Add the new movie to our array
  res.status(201).json(newMovie); // Send back the new movie with a 201 "Created" status
});


// 4. Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});