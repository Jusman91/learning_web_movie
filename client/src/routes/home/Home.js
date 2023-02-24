import { Carousel } from "react-responsive-carousel"
import { Link } from "react-router-dom"
import Hero from "../../components/header/hero/Hero"
import MovieList from "../../components/main_content/movie_list/MovieList"
import Trending from "../../components/main_content/movie_list/Trending"

const Home = () => {
  return (
    <>
      <Hero />

      <MovieList type={'top_rated'} movieType={'movie'} />
      <MovieList type={'popular'} movieType={'movie'} />
      <MovieList type={'upcoming'} movieType={'movie'} />

      <MovieList type={'top_rated'} movieType={'tv'} />
      <MovieList type={'popular'} movieType={'tv'} />
      <MovieList type={'on_the_air'} movieType={'tv'} />
      <MovieList type={'airing_today'} movieType={'tv'} />

      <Trending carousel />
      <Link to={'/trending'}><button>View More</button></Link>


    </>
  )
}

export default Home