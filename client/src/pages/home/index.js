import { useEffect } from "react"
import Hero from "../../components/header/hero/Hero"
import { FreeToWatch, Popular, TrailerList, Trending } from "../../components/main_content/movie_list"

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Hero />
      <Trending />
      <TrailerList />
      <Popular />
      <FreeToWatch />
    </>
  )
}

export default Home