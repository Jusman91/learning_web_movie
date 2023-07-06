import { useEffect, useState } from 'react';
import './SearchResults.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagiantion from '../../pagination/Pagiantion';
import Loading from '../../../loading/Loading';
import Card from '../../../card/Card';

const SearchResults = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [pageNum, setPageNum] = useState();
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

	const [searchMultiResult, setSearchMultiResult] =
		useState([]);
	const navigate = useNavigate();
	const [type, setType] = useState('movie');

	const handlePagination = (number) => {
		setPage(number);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchSearchMulti = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/${type}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
			);
			const results = response.data.results;
			// console.log('movie', results);
			setSearchMultiResult(results);
			setPageNum(response.data.total_pages);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchSearchMovie = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/movie?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			// const results = response.data.results;
			// console.log('movie', results);
			setTotalResultsMovie(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchSearchTv = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/tv?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			// const results = response.data.results;
			// console.log('tv', results);
			setTotalResultsTv(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchSearchPeople = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/person?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			// const results = response.data.results;
			// console.log('person', results);
			setTotalResultsPeople(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchSearchCollections = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/collection?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			// const results = response.data.results;
			// console.log('collections', results);
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchSearchCompanies = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/company?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			// const results = response.data.results;
			// console.log('companies', results);
			setTotalResultsCompanies(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchSearchKeywords = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/search/keyword?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`,
			);
			// const results = response.data.results;
			// console.log('keywords', results);
			setTotalResultsKeywords(response.data.total_results);
		} catch (err) {
			console.error(
				err,
				'<=== searchMOVIES coba lagi boss ===>',
			);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchSearchMovie();
		fetchSearchTv();
		fetchSearchPeople();
		fetchSearchCollections();
		fetchSearchCompanies();
		fetchSearchKeywords();
		fetchSearchMulti();
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	useEffect(() => {
		fetchSearchMulti();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type, query, page]);

	const handleUpdateFetch = (value) => {
		setType(value);
		setPage(1);
		navigate(`/search/${value}?query=${query}`);
	};

	return (
		<>
			{isLoading ? (
				<Loading type='component' />
			) : (
				<section className='container__search__results'>
					{query && query.length > 2 ? (
						<div className='wrapper__search__results'>
							<div className='left__side'>
								<h3>Search Results</h3>
								<ul>
									<li
										style={{ zIndex: 6 }}
										className={
											type === 'tv'
												? 'list__results active_type'
												: 'list__results'
										}
										onClick={() => handleUpdateFetch('tv')}>
										<span>Tv Show</span>
										<span>{totalResultsTv}</span>
									</li>
									<li
										style={{ zIndex: 5 }}
										className={
											type === 'movie'
												? 'list__results active_type'
												: 'list__results'
										}
										onClick={() =>
											handleUpdateFetch('movie')
										}>
										<span>Movie</span>
										<span>{totalResultsMovie}</span>
									</li>
									<li
										style={{ zIndex: 4 }}
										className={
											type === 'person'
												? 'list__results active_type'
												: 'list__results'
										}
										onClick={() =>
											handleUpdateFetch('person')
										}>
										<span>People</span>
										<span>{totalResultsPeople}</span>
									</li>
									<li
										style={{ zIndex: 3 }}
										className={
											type === 'collection'
												? 'list__results active_type'
												: 'list__results'
										}
										onClick={() =>
											handleUpdateFetch('collection')
										}>
										<span>Collectios</span>
										<span>{totalResultsCollectios}</span>
									</li>
									<li
										style={{ zIndex: 2 }}
										className={
											type === 'company'
												? 'list__results active_type'
												: 'list__results'
										}
										onClick={() =>
											handleUpdateFetch('company')
										}>
										<span>Companies</span>
										<span>{totalResultsCompanies}</span>
									</li>
									<li
										style={{ zIndex: 1 }}
										className={
											type === 'keyword'
												? 'list__results active_type'
												: 'list__results'
										}
										onClick={() =>
											handleUpdateFetch('keyword')
										}>
										<span>Keywords</span>
										<span>{totalResultsKeywords}</span>
									</li>
								</ul>
							</div>
							<div className='right__side'>
								{type === 'movie' &&
									searchMultiResult &&
									searchMultiResult?.map((movie) => (
										<Card
											key={movie.id}
											search={movie}
											mediaType={type}
										/>
									))}
								{type === 'tv' &&
									searchMultiResult &&
									searchMultiResult?.map((movie) => (
										<Card
											key={movie.id}
											search={movie}
											mediaType={type}
										/>
									))}
								{type === 'person' &&
									searchMultiResult &&
									searchMultiResult?.map((person) => (
										<Card
											key={person.id}
											search={person}
											mediaType={type}
										/>
									))}
								{type === 'collection' &&
									searchMultiResult &&
									searchMultiResult?.map((collections) => (
										<Card
											key={collections.id}
											search={collections}
											mediaType={type}
										/>
									))}
								{type === 'company' &&
									searchMultiResult &&
									searchMultiResult?.map((company) => (
										<Card
											key={company.id}
											search={company}
											mediaType={type}
										/>
									))}
								{type === 'keyword' &&
									searchMultiResult &&
									searchMultiResult?.map((keywords) => (
										<Card
											key={keywords.id}
											search={keywords}
											mediaType={type}
										/>
									))}
								<div className='wrap_pagination'>
									{pageNum && pageNum > 1 ? (
										<Pagiantion
											handleClick={handlePagination}
											pageNum={pageNum}
											activenum={page}
										/>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					) : (
						<div className='notFound'>
							<h2>Keyword Not Exist</h2>
						</div>
					)}
				</section>
			)}
		</>
	);
};

export default SearchResults;
