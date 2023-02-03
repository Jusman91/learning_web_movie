import './App.css';
import NavBar from './components/header/navbar/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/home/Home';
import MovieList from './components/main_content/movie_list/MovieList';
import MovieDetails from './components/main_content/details/MoviesDetails';
import Login from './components/login/Login';


function App() {
  const user = true

  return (
    <div className='App'>
      <Router>
        <NavBar user={user} />
        <Routes>
          <Route path='login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path='/' element={<Home />} />
          <Route path='movie/:id' element={user ? <MovieDetails /> : <Navigate to='/login' />} />
          <Route path='movies/:type' element={user ? <MovieList /> : <Navigate to='/login' />} />
          <Route path='/*' element={<h1>Error Page</h1>} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;