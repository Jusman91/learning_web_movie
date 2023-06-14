import { useEffect } from "react"
import TrailerList from "../../components/main_content/movie_list/trailers/TrailerList"
import HomeList from "../../components/main_content/movie_list/get_list/HomeList"
import HeroContainer from "../../components/header/hero/HeroContainer"

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <HeroContainer />
      <HomeList mediaType={'movie'} listCategory={'Up Coming'} />
      <TrailerList />
      <HomeList mediaType={'tv'} listCategory={'Airing Today'} />
    </>
  )
}

export default Home