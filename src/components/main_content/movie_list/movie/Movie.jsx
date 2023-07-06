import axios from 'axios';
import { useEffect, useState } from 'react';
import UseGenres from '../../../../hooks/UseGenres';
import { useDispatch, useSelector } from 'react-redux';
import { CardMovies } from '../../../card';
import './Movie.css';
import Accordion from '../../../elements/Accordion';
import { RiSearchLine } from 'react-icons/ri';
import { Icon } from '@iconify/react';
import { img_logo } from '../../../../config/tmdb';

const Movie = ({ mediaType }) => {
	const [data, setData] = useState([]);
	const [category, setCategory] = useState('popular');
	const [page, setPage] = useState(1);
	const [pageNum, setPageNum] = useState();
	const [selectMovie, setSelectMovie] = useState({});
	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const genreforURL = UseGenres(selectedGenres);
	const [regions, setRegions] = useState([]);
	const [region, setRegion] = useState({
		code: 'ID',
		name: 'Indonesia',
	});
	const [providers, setProviders] = useState([]);
	const [queryRegions, setQueryRegions] = useState('');
	const [filteredData, setFilteredData] = useState(false);
	const [sortBy, setSortBy] = useState('popularity.desc');
	const dispatch = useDispatch();

	const { playMedia } = useSelector(
		(state) => state.trailersReducer,
	);

	const listCategorys = [
		{ label: 'Popular', value: 'popular' },
		{ label: 'Now Playing', value: 'now_playing' },
		{ label: 'Upcoming', value: 'upcoming' },
		{ label: 'Top Rated', value: 'top_rated' },
	];

	const listSort = [
		{
			label: 'popularity descending',
			value: 'popularity.desc',
		},
		{
			label: 'popularity ascending',
			value: 'popularity.asc',
		},
		{
			label: 'rating descending',
			value: 'vote_average.desc',
		},
		{
			label: 'rating ascending',
			value: 'vote_average.asc',
		},
		{
			label: 'release date descending',
			value: 'primary_release_date.desc',
		},
		{
			label: 'release date ascending',
			value: 'primary_release_date.asc',
		},
		{ label: 'title (a-z)', value: 'original_title.asc' },
		{ label: 'title (z-a)', value: 'original_title.desc' },
	];

	const getData = async () => {
		try {
			let response;
			if (filteredData) {
				response = await axios.get(
					`${process.env.REACT_APP_BASEURL}/discover/movie?api_key=${process.env.REACT_APP_APIKEY}&watch_region=ID&language=en-US&sort_by=${sortBy}&page=${page}`,
				);
			} else {
				response = await axios.get(
					`${process.env.REACT_APP_BASEURL}/movie/${category}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=${page}`,
				);
			}
			const results = response.data.results;
			setData(results);
			setPageNum(response.data.total_pages);
			setSelectMovie(results[0]);
		} catch (err) {
			console.error(err, 'Get Data Failed');
		}
	};

	const getRegions = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/watch/providers/regions?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`,
			);

			const results = response.data.results;
			setRegions(results);
			console.log('regions', results);
		} catch (err) {
			console.error(err, 'Get Country failed');
		}
	};
	const getProviders = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/watch/providers/movie?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&&watch_region=${region.code}`,
			);

			const results = response.data.results;
			setProviders(results);
			console.log('providers', results);
		} catch (err) {
			console.error(err, 'Get Country failed');
		}
	};

	useEffect(() => {
		getData();

		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, category]);

	useEffect(() => {
		// didupdate mount
		getRegions();
		getProviders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortBy, region]);

	// useEffect(() => {
	// 	const filteredData = filterDataByGenre(
	// 		data,
	// 		genreforURL,
	// 	);
	// 	setFilteredData(filteredData);
	// }, [data, genreforURL]);

	const handleClick = (number) => {
		setPage(number);
	};

	console.log('data', data);
	console.log('selec', selectMovie);
	console.log('catgory', category);
	console.log('sort', sortBy);

	const handleCategorys = (e) => {
		const selectedValue = e.target.value;
		setCategory(selectedValue);
	};

	const handleSortBy = (e) => {
		const selectedValue = e.target.value;
		setSortBy(selectedValue);
	};

	const sortedRegions = regions.sort((a, b) =>
		a.english_name.localeCompare(b.english_name),
	);

	const handleSearchRegion = (e) => {
		setQueryRegions(e.target.value);
	};

	const handleGetRegion = (value, name) => {
		setRegion((prevState) => ({
			...prevState,
			code: value,
			name: name,
		}));
	};
	const searchByInc = (item) => {
		const data = item
			.toLowerCase()
			.includes(queryRegions.toLowerCase());
		return data;
	};
	return (
		<section className='container_section'>
			<div className='header'>
				<h2>Movies</h2>
				<select
					name='category'
					id='category'
					className='categorys'
					value={category}
					onChange={handleCategorys}>
					{listCategorys.map((list, i) => (
						<option key={i} value={list.value}>
							{list.label}
						</option>
					))}
				</select>
			</div>
			<div className='wrap_content_movie'>
				<div className='left'>
					<Accordion
						label={'Sort'}
						children={
							<div className='filter'>
								<h4>Sort Results By</h4>
								<select
									name='sortir'
									id='sortir'
									value={sortBy}
									onChange={handleSortBy}>
									{listSort.map((list, i) => (
										<option key={i} value={list.value}>
											{list.label}
										</option>
									))}
								</select>
							</div>
						}
					/>
					<Accordion
						label={'Where To Watch'}
						children={
							<div className='filter'>
								<h4>Country</h4>
								<Accordion
									className={'regions'}
									label={
										<div className='serach_value'>
											<Icon
												icon={`flag:${region.code.toLowerCase()}-4x3`}
											/>
											<span className='name'>
												{region.name}
											</span>
										</div>
									}
									children={
										<div className='input_region'>
											<div className='wrap_input'>
												<input
													type='text'
													placeholder='search'
													value={queryRegions}
													onChange={handleSearchRegion}
												/>
												<RiSearchLine fontSize={'16'} />
											</div>
											<div className='wrap_option'>
												<ol>
													{regions &&
														sortedRegions.map((item, i) => {
															if (
																searchByInc(
																	item.english_name,
																)
															) {
																return (
																	<li
																		key={i}
																		onClick={() =>
																			handleGetRegion(
																				item.iso_3166_1,
																				item.english_name,
																			)
																		}>
																		<Icon
																			icon={`flag:${item.iso_3166_1.toLowerCase()}-4x3`}
																		/>
																		<span className='name'>
																			{item.english_name}
																		</span>
																	</li>
																);
															} else {
																return null;
															}
														})}
												</ol>
											</div>
										</div>
									}
								/>
								<div className='wrap_providers'>
									{providers &&
										providers.map((item, i) => (
											<div
												key={i}
												className='logo_provider'>
												<img
													src={`${img_logo}/${item.logo_path}`}
													alt='Providers'
												/>
											</div>
										))}
								</div>
							</div>
						}
					/>
					<Accordion label={'Filters'} children={'dadad'} />
				</div>
				<div className='right'>
					{data &&
						data.map((items, i) => (
							<CardMovies
								key={i}
								data={items}
								mediaType={'movie'}
							/>
						))}
				</div>
			</div>
		</section>
	);
};

export default Movie;
