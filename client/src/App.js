import NavBar from './components/header/navbar/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/home/Home';
import MovieDetails from './components/main_content/details/MoviesDetails';
import Login from './components/login/Login';
import SearchAll from './routes/search/SearchResults';
import Footer from './components/footer/Footer';
import TrendingMovies from './routes/trending/TrendingMovies';
import TrendingTv from './routes/trending/TrendingTv';
import { useEffect, useState } from 'react';
import Loading from './components/loading/Loading';
import TvSeason from './routes/season/TvSeason';
import Credits from './routes/credits/Credits'
import DetailsTvSeason from './components/main_content/season/details/DetailsTvSeason';
import EpisodeCredits from './components/episode_credits/EpisodeCredits';
import DetailsPerson from './routes/person/DetailsPerson';
import { UserReviews } from './components/main_content/user_reviews/UserReviews';
import DetailsReview from './components/main_content/user_reviews/details/DetailsReview';
import Images from './components/main_content/images/Images';

function App() {
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
            <Route path='login' element={user ? <Navigate to='/' /> : <Login />} />
            <Route path='/' element={<Home />} />
            <Route path='movies' element={user ? <TrendingMovies /> : <Navigate to='/login' />} />
            <Route path='tv' element={user ? <TrendingTv /> : <Navigate to='/login' />} />
            <Route path='search' element={user ? <SearchAll /> : <Navigate to='/login' />}>
              <Route path=':type' element={user ? <SearchAll /> : <Navigate to='/login' />} />
            </Route>
            <Route path='/details/:mediatype/:movieid' element={user ? <MovieDetails /> : <Navigate to='/login' />} />
            <Route path='/details/:mediatype/:movieid/images/:typemedia' element={user ? <Images /> : <Navigate to='/login' />} />

            <Route path='/details/:mediatype/:movieid/cast' element={<Credits />} />
            <Route path='/details/:mediatype/:movieid/season' element={<TvSeason />} />
            <Route path='/details/:mediatype/:movieid/season/:seasonnumber' element={<DetailsTvSeason />}>
              <Route path=':episode/:episodenumber' element={<DetailsTvSeason />} />
            </Route>
            <Route path='/details/:mediatype/:movieid/season/:seasonnumber/episode/:episodenumber/cast' element={<EpisodeCredits />} />
            <Route path='/details/:mediatype/:movieid/reviews' element={<UserReviews />} />
            <Route path='/review/:reviewid' element={<DetailsReview />} />
            <Route path='/person/:personid' element={<DetailsPerson />} />
            <Route path='/*' element={<h1>Error Page</h1>} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
