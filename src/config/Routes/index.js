import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../../components/login/Login'
import Loading from '../../components/loading/Loading'
import NavBar from '../../components/header/navbar/NavBar'
import { Credits, DetailsPerson, DetailsReviews, EpisodesCredits, Gallery, Home, MovieDetails, Movies, Review, SearchAll, SeasonDetails, TrendingTv, TvSeason } from '../../pages'
import Footer from '../../components/footer/Footer'


const Routers = () => {
  const user = true
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [])
  return (
    <div className='App'>
      {isLoading ? <Loading type='root' /> : (
        <Router>
          <NavBar user={user} />
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='movies' element={<Movies />} />
            <Route path='tv' element={<TrendingTv />} />
            <Route path='search' element={<SearchAll />}>
              <Route path=':type' element={<SearchAll />} />
            </Route>
            <Route path='/details/:mediatype/:movieid' element={<MovieDetails />} />
            <Route path='/details/:mediatype/:movieid/images/:typemedia' element={<Gallery />} />
            <Route path='/details/:mediatype/:movieid/cast' element={<Credits />} />
            <Route path='/details/:mediatype/:movieid/season' element={<TvSeason />} />
            <Route path='/details/:mediatype/:movieid/season/:seasonnumber' element={<SeasonDetails />}>
              <Route path=':episode/:episodenumber' element={<SeasonDetails />} />
            </Route>
            <Route path='/details/:mediatype/:movieid/season/:seasonnumber/episode/:episodenumber/cast' element={<EpisodesCredits />} />
            <Route path='/details/:mediatype/:movieid/reviews' element={<Review />} />
            <Route path='/review/:reviewid' element={<DetailsReviews />} />
            <Route path='/person/:personid' element={<DetailsPerson />} />
            <Route path='/*' element={<h1>Error Page</h1>} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  )
}

export default Routers