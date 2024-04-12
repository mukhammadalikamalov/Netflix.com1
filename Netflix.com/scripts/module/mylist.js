import { checkLocalMovies, createCard } from './module/utils.js'

const movieList = checkLocalMovies()
movieList.map(movie => createCard(movie))
