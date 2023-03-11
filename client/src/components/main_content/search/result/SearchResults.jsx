import { useEffect, useState } from 'react';
import './SearchResults.css';
import Card from '../../card/CardContainer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
	const [showComponet, setShowComponent] =
		useState('movie');
	const [searchMovieResult, setSearchMovieResult] =
		useState([]);
	const [searchTvResult, setSearchTvResult] = useState([]);
	const [searchPeopleResult, setSearchPeopleResult] =
		useState([]);
	const [
		searchCollectionsResult,
		setSearchCollectionsResult,
	] = useState([]);
	const [searchCompaniesResult, setSearchCompaniesResult] =
		useState([]);
	const [searchKeywordsResult, setSearchKeywordsResult] =
		useState([]);
	const [totalResultsMovie, setTotalResultsMovie] =
		useState(0);
	const [totalResultsTv, setTotalResultsTv] = useState(0);
	const [totalResultsPeople, setTotalResultsPeople] =
		useState(0);
	const [
		totalResultsCollectios,
		setTotalResultsCollectios,
	] = useState(0);
	const [totalResultsCompanies, setTotalResultsCompanies] =
		useState(0);
	const [totalResultsKeywords, setTotalResultsKeywords] =
		useState(0);

	const location = useLocation();
	const query = new URLSearchParams(location.search).get(
		'query',
	);

	const fetchSearchMovie = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/movie?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			console.log('movie', response.data.total_results);
			const results = response.data.results;
			setSearchMovieResult(results);
			setTotalResultsMovie(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};

	const fetchSearchTv = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/tv?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			console.log('tv', response.data.total_results);
			const results = response.data.results;
			setSearchTvResult(results);
			setTotalResultsTv(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};
	const fetchSearchPeople = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/person?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			console.log('person', response.data.total_results);
			const results = response.data.results;
			setSearchPeopleResult(results);
			setTotalResultsPeople(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};
	const fetchSearchCollections = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/collection?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			console.log(
				'collections',
				response.data.total_results,
			);
			const results = response.data.results;
			setSearchCollectionsResult(results);
			setTotalResultsCollectios(
				response.data.total_results,
			);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};
	const fetchSearchCompanies = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/company?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			console.log('companies', response.data.total_results);
			const results = response.data.results;
			setSearchCompaniesResult(results);
			setTotalResultsCompanies(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};
	const fetchSearchKeywords = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/keyword?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			console.log('keywords', response.data.total_results);
			const results = response.data.results;
			setSearchKeywordsResult(results);
			setTotalResultsKeywords(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};

	useEffect(() => {
		fetchSearchMovie();
		fetchSearchTv();
		fetchSearchPeople();
		fetchSearchCollections();
		fetchSearchCompanies();
		fetchSearchKeywords();
	}, [
		fetchSearchMovie,
		fetchSearchTv,
		fetchSearchPeople,
		fetchSearchCollections,
		fetchSearchCompanies,
		fetchSearchKeywords,
	]);

	return (
		<>
			<section className='container__search__results'>
				<div className='wrapper__search__results'>
					<div className='left__side'>
						<h2>Search Results</h2>
						<ul>
							<li
								className='list__results'
								onClick={() => setShowComponent('movie')}>
								<span>Movie</span>
								<span>{totalResultsMovie}</span>
							</li>
							<li
								className='list__results'
								onClick={() => setShowComponent('tv')}>
								<span>Tv Show</span>
								<span>{totalResultsTv}</span>
							</li>
							<li
								className='list__results'
								onClick={() => setShowComponent('people')}>
								<span>People</span>
								<span>{totalResultsPeople}</span>
							</li>
							<li
								className='list__results'
								onClick={() =>
									setShowComponent('collections')
								}>
								<span>Collectios</span>
								<span>{totalResultsCollectios}</span>
							</li>
							<li
								className='list__results'
								onClick={() =>
									setShowComponent('companies')
								}>
								<span>Companies</span>
								<span>{totalResultsCompanies}</span>
							</li>
							<li
								className='list__results'
								onClick={() =>
									setShowComponent('keywords')
								}>
								<span>Keywords</span>
								<span>{totalResultsKeywords}</span>
							</li>
						</ul>
					</div>
					<div className='right'>
						{showComponet === 'movie' &&
							searchMovieResult &&
							searchMovieResult?.map((movie) => (
								<Card
									key={movie.id}
									movie={movie}
									link={`/details/${movie.id}/${'movie'}`}
								/>
							))}
						{showComponet === 'tv' &&
							searchTvResult &&
							searchTvResult?.map((movie) => (
								<Card
									key={movie.id}
									movie={movie}
									link={`/details/${movie.id}/${'tv'}`}
								/>
							))}
						{/* {showComponet === 'people' &&
							searchPeopleResult &&
							searchPeopleResult?.map((movie) => (
								<Card
									key={movie.id}
									movie={movie}
									link={`/details/${movie.id}/${movie.media_type}`}
								/>
							))}
						{showComponet === 'collections' &&
							searchCollectionsResult &&
							searchCollectionsResult?.map((movie) => (
								<Card
									key={movie.id}
									movie={movie}
									link={`/details/${movie.id}/${movie.media_type}`}
								/>
							))}
						{showComponet === 'companies' &&
							searchCompaniesResult &&
							searchCompaniesResult?.map((movie) => (
								<Card
									key={movie.id}
									movie={movie}
									link={`/details/${movie.id}/${movie.media_type}`}
								/>
							))}
						{showComponet === 'keywords' &&
							searchKeywordsResult &&
							searchKeywordsResult?.map((movie) => (
								<Card
									key={movie.id}
									movie={movie}
									link={`/details/${movie.id}/${movie.media_type}`}
								/>
							))} */}
					</div>
				</div>
			</section>
		</>
	);
};

export default SearchResults;
