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
            <Route path='/details/:movieid/:mediatype' element={user ? <MovieDetails /> : <Navigate to='/login' />} />
            <Route path='movies' element={user ? <TrendingMovies /> : <Navigate to='/login' />} />
            <Route path='tv' element={user ? <TrendingTv /> : <Navigate to='/login' />} />
            <Route path='search' element={user ? <SearchAll /> : <Navigate to='/login' />}>
              <Route path=':type' element={user ? <SearchAll /> : <Navigate to='/login' />} />
            </Route>
            <Route path='/*' element={<h1>Error Page</h1>} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
