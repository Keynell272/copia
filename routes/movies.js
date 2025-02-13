import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const createMoviesRouter = ({ movieModel }) => {
    const movieRouter = Router()

    const moviesController = new MovieController( { movieModel } )

    movieRouter.get('/', moviesController.getAll)
    movieRouter.post('/', moviesController.create)

    movieRouter.get('/:id', moviesController.getById)
    movieRouter.delete('/:id', moviesController.delete)
    movieRouter.patch('/:id', moviesController.update)

    return movieRouter
}