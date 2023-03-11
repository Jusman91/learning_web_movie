import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import './SearchMovies.css';
// import SearchResults from './SearchResults';

const SearchMovies = ({ form, results }) => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');

	// const [type, setType] = useState('');
	// const [query, setQuery] = useState('');
	// const [totalResults, setTotalResults] = useState();
	// const [moviesResult, setMoviesResult] = useState([]);
	const changeHandler = (e) => {
		setSearch(e.target.value);
	};

	// const fetchSearchMovie = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/search/${
	// 				type ? type : 'movie'
	// 			}
	// 			?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
	// 		);
	// 		console.log('movie', response.data.total_results);
	// 		const results = response.data.results;
	// 		setMoviesResult(results);
	// 		setTotalResults(response.data.total_results);
	// 	} catch (err) {
	// 		console.error(
	// 			err,
	// 			'<=== searchMOVIES coba lagi boss ===>',
	// 		);
	// 	}
	// };
	// const fetchSearchTv = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/search/${
	// 				type ? type : 'tv'
	// 			}
	// 			?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
	// 		);
	// 		console.log('tv', response.data.total_results);
	// 		const results = response.data.results;
	// 		setMoviesResult(results);
	// 	} catch (err) {
	// 		console.error(
	// 			err,
	// 			'<=== searchMOVIES coba lagi boss ===>',
	// 		);
	// 	}
	// };
	// const fetchSearchPeople = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/search/${
	// 				type ? type : 'person'
	// 			}
	// 			?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
	// 		);
	// 		console.log('person', response.data.total_results);
	// 		const results = response.data.results;
	// 		setMoviesResult(results);
	// 	} catch (err) {
	// 		console.error(
	// 			err,
	// 			'<=== searchMOVIES coba lagi boss ===>',
	// 		);
	// 	}
	// };
	// const fetchSearchCollections = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/search/${
	// 				type ? type : 'collection'
	// 			}
	// 			?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
	// 		);
	// 		console.log(
	// 			'collections',
	// 			response.data.total_results,
	// 		);
	// 		const results = response.data.results;
	// 		setMoviesResult(results);
	// 	} catch (err) {
	// 		console.error(
	// 			err,
	// 			'<=== searchMOVIES coba lagi boss ===>',
	// 		);
	// 	}
	// };
	// const fetchSearchCompanies = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/search/${
	// 				type ? type : 'company'
	// 			}
	// 			?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
	// 		);
	// 		console.log('companies', response.data.total_results);
	// 		const results = response.data.results;
	// 		setMoviesResult(results);
	// 	} catch (err) {
	// 		console.error(
	// 			err,
	// 			'<=== searchMOVIES coba lagi boss ===>',
	// 		);
	// 	}
	// };
	// const fetchSearchKeywords = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/search/${
	// 				type ? type : 'keyword'
	// 			}
	// 			?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
	// 		);
	// 		console.log('keywords', response.data.total_results);
	// 		const results = response.data.results;
	// 		setMoviesResult(results);
	// 	} catch (err) {
	// 		console.error(
	// 			err,
	// 			'<=== searchMOVIES coba lagi boss ===>',
	// 		);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchSearchMovie();
	// 	fetchSearchTv();
	// 	fetchSearchPeople();
	// 	fetchSearchCollections();
	// 	fetchSearchCompanies();
	// 	fetchSearchKeywords();
	// }, [type]);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	navigate('/search');
	// 	fetchSearchMovie();
	// 	fetchSearchTv();
	// 	fetchSearchPeople();
	// 	fetchSearchCollections();
	// 	fetchSearchCompanies();
	// 	fetchSearchKeywords();
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/search?query=${search}`);
	};
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='movie__search'
				name='query'
				value={search}
				onChange={changeHandler}>
				<input type='text' placeholder='Search' />
				<button className='search__btn' type='submit'>
					Search
				</button>
			</form>
			{/* {totalResults && totalResults > 0 ? (
				<SearchResults totalResults={totalResults} />
			) : null}
			; */}
		</>
	);
};

export default SearchMovies;
