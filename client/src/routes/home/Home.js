import Hero from "../../components/header/hero/HeroContainer"
import AllList from "../../components/main_content/movie_list/all_list/AllList"
import MovieList from "../../components/main_content/movie_list/get_list/MovieList"
import LatestList from "../../components/main_content/movie_list/latest/LatestList"
import GetTrailers from "../../components/main_content/movie_list/trailers/GetTrailers"
import TrailerList from "../../components/main_content/movie_list/trailers/TrailerList"
// import MovieList from "../../components/main_content/movie_list/MovieList"

const Home = () => {
  return (
    <>
      <Hero />
      <AllList mediaType={'movie'} listCategory={'Up Coming'} />
      <TrailerList />
      {/* <GetTrailers /> */}
      <AllList mediaType={'tv'} listCategory={'Airing Today'} />
      {/* <LatestList /> */}
      {/* <MovieList type={'top_rated'} movieType={'movie'} /> */}
      {/* <MovieList type={'popular'} movieType={'movie'} />
      <MovieList type={'upcoming'} movieType={'movie'} />

      <MovieList type={'top_rated'} movieType={'tv'} />
      <MovieList type={'popular'} movieType={'tv'} />
      <MovieList type={'airing_today'} movieType={'tv'} /> */}

    </>
  )
}

export default Home