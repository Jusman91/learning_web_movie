import { useEffect } from "react"
import Hero from "../../components/header/hero/HeroContainer"
import TrailerList from "../../components/main_content/movie_list/trailers/TrailerList"
import HomeList from "../../components/main_content/movie_list/get_list/HomeList"
import Pag from "../../components/main_content/ccc/Pag"

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Hero />
      <HomeList mediaType={'movie'} listCategory={'Up Coming'} />
      <TrailerList />
      <HomeList mediaType={'tv'} listCategory={'Airing Today'} />
      <Pag itemsPerPage={4} />
    </>
  )
}

export default Home