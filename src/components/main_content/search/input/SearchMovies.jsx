import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchMovies.css';

const SearchMovies = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');

	const changeHandler = (e) => {
		setSearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/search?query=${search}`);
	};
	return (
		<>
			<form
				className='movie__search'
				name='query'
				value={search}
				onChange={changeHandler}>
				<input type='text' placeholder='Search' />
				<button
					className='search__btn'
					type='submit'
					onClick={handleSubmit}>
					Search
				</button>
			</form>
		</>
	);
};

export default SearchMovies;
