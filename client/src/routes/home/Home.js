import Hero from "../../components/header/hero/Hero"
import MovieList from "../../components/main_content/movie_list/MovieList"

const Home = () => {
  return (
    <>
      <Hero />

      <MovieList type={'top_rated'} movieType={'movie'} />
      <MovieList type={'popular'} movieType={'movie'} />
      <MovieList type={'upcoming'} movieType={'movie'} />

      <MovieList type={'top_rated'} movieType={'tv'} />
      <MovieList type={'popular'} movieType={'tv'} />
      <MovieList type={'airing_today'} movieType={'tv'} />

    </>
  )
}

export default Home