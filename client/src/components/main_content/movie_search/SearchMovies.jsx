import { useState } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';

const SearchMovies = (props) => {
	const [query, setQuery] = useState('');
	// const changeHandler = (e) => {
	// 	setQuery(e.target.value);
	// };

	// const searchMovie = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/search/movie?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
	// 		);
	// 		const results = response.data.results;
	// 		setMovieList(results);
	// 	} catch (err) {
	// 		console.error(
	// 			err,
	// 			'<=== searchMOVIES coba lagi boss ===>',
	// 		);
	// 	}
	// };

	return (
		<>
			<form
				onSubmit={props.searchMovie}
				className='movie__search'
				name='query'
				value={props.query}
				onChange={props.changeHandler}>
				<p>
					<BsSearch className='search__icon' />
				</p>
				<input type='text' placeholder='Search' />
				<button className='search__btn' type='submit'>
					Search
				</button>
			</form>
		</>
	);
};

export default SearchMovies;
