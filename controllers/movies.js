import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController{
    constructor ({ movieModel }){
        this.movieModel = movieModel
    }

    getAll = async (req, res) => {
        const { genre } = req.params
        const movies = await this.movieModel.getAll({genre})
        res.json(movies) 
    }

    getById = async (req, res) => {
        const { id } = req.params
        const movie = await this.movieModel.getById({ id })
        if (movie) return res.json(movie)
        res.status(404).json({message: 'Movie not found'})
    }

    create = async (req, res) => {
        const result = validateMovie(req.boby)

        if (!result.success) {
            return res.status(404).json({error: JSON.parse(result.error.message)})
        }

        const newMovie = await this.movieModel.create({ input: result.data })

        res.status(201).json(newMovie)
    }

    delete = async (req, res) => {
        const { id } = req.params

        const result = await this.movieModel.delete({ id })

        if (reult === false){
            return res.status(404).json({message: 'Movie not found'})
        }

        return res.json({message: 'Movie deleted'})
    }

    update = async (req, res) => {
        const result = validatePartialMovie(req.body)

        if(!result.success){
            return res.status(400).json({error: JSON.parce(result.error.message)})
        }

        const { id } = req.params

        const updateMovie = await this.movielModel.update({ id, input: result.data })
    
        return res.json(updateMovie)
    }
}