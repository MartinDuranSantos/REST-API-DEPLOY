const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const z = require('zod')
//const validateMovie = require('./data_validation.js')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.use(express.json()) // Usamos este middleware para poder acceder a req.body
// que contiene los datos que llegan por el cuerpo de la petición
// uniendo todos los trozos (chunks), haciendo un parsing de la informacion
// Mutando ek request y metiendo la información en el req.body

app.get('/movies', (req, res) => {
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
  const movieSchema = z.object({
    title: z.string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title is required'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().min(1).max(300),
    rate: z.number().min(0).max(10),
    poster: z.string().url({
      message: 'Poster must be a valid URL'
    }),
    genre: z.array(
      z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Thriller', 'Fantasy', 'Horror', 'Sci-Fi']),
      {
        required_error: 'Genre is required',
        invalid_type_error: 'Genre must be an array of enum Genre'
      }
    )
  })
  const result = movieSchema.safeParse(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  }

  // Esto no sería REST porque estamos guardando el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.use((req, res) => {
  res.status(404).send('<h2> 404 </h2>')
})

app.listen(PORT, () => {
  console.log('Server listening on port http://localhost:' + PORT.toString() + '/movies')
})
// 31:39
