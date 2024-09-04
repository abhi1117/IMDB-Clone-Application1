import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    // const getData = () => {
    //     fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
    //     .then(res => res.json())
    //     .then(data => setMovieList(data.results))
    // }


    const getData = () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          const updatedMovies = data.results.map((movie) => ({
            ...movie,
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }));
          setMovieList(updatedMovies);
        });
    };


    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList