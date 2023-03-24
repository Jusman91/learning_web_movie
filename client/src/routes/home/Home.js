import { useEffect } from "react"
import Hero from "../../components/header/hero/HeroContainer"
import AllList from "../../components/main_content/movie_list/all_list/AllList"
import TrailerList from "../../components/main_content/movie_list/trailers/TrailerList"

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      <Hero />
      <AllList mediaType={'movie'} listCategory={'Up Coming'} />
      <TrailerList />
      <AllList mediaType={'tv'} listCategory={'Airing Today'} />
    </>
  )
}

export default Home