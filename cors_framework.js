const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./data_validation.js')

const PORT = process.env.PORT ?? 1234

const app = express()

app.disable('x-powered-by')

app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:35087',
      'http://localhost:34359',
      'http://localhost:1234',
      'http://localhost:8080'
    ]

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }
  }
}))
app.use(express.json()) // Usamos este middleware para poder acceder a req.body
// que contiene los datos que llegan por el cuerpo de la petición
// uniendo todos los trozos (chunks), haciendo un parsing de la informacion
// Mutando ek request y metiendo la información en el req.body

app.get('/movies', (req, res) => {
// res.header('Access-Control-Allow-Origin', '*')

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      // movie => movie.Genre.includes(Genre)
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// Segmento dinámico
app.get('/movies/:id', (req, res) => { // path to regexp
  const { id } = req.params // req.params is an object with the params in the path
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  }

  // Esto no sería REST porque estamos guardando el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

app.use((req, res) => {
  res.status(404).send('<h2> 404 </h2>')
})

app.listen(PORT, () => {
  console.log('Server listening on port http://localhost:' + PORT.toString() + '/movies')
})
// 31:39
