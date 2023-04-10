import NavBar from './components/header/navbar/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/home/Home';
import MovieDetails from './components/main_content/details/MoviesDetails';
import Login from './components/login/Login';
import DiscoverMovies from './routes/discover/DiscoverMovies';
import DiscoverTv from './routes/discover/DiscoverTv';
import SearchAll from './routes/search/SearchResults';
import Footer from './components/footer/Footer';

function App() {
  const user = true

  return (
    <div className='App'>
      <Router>
        <NavBar user={user} />
        <Routes>
          <Route path='login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/details/:movieid/:mediatype' element={user ? <MovieDetails /> : <Navigate to='/login' />} />
          <Route path='movies' element={user ? <DiscoverMovies /> : <Navigate to='/login' />} />
          <Route path='tv' element={user ? <DiscoverTv /> : <Navigate to='/login' />} />
          <Route path='search' element={user ? <SearchAll /> : <Navigate to='/login' />} />
          <Route path='search/:type' element={user ? <SearchAll /> : <Navigate to='/login' />} />
          <Route path='/*' element={<h1>Error Page</h1>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
