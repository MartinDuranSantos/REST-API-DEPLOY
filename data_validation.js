const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().min(1).max(300),
  rate: z.number().min(0).max(10).default(5), // default makes it optional
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Romance', 'Crime', 'Adventure', 'Comedy', 'Drama', 'Thriller', 'Fantasy', 'Horror', 'Sci-Fi']),
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be an array of enum Genre'
    }
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
