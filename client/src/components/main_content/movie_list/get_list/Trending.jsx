import axios from 'axios';
import './Trending.css';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Genres from '../../genres/Genres';
import Pagination from '../../pagination/Pagiantion';
import YouTube from 'react-youtube';
import UseGenres from '../../../../hooks/UseGenres';
import Loading from '../../../loading/Loading';
import CardTrending from '../../../card/trending/CardTrending';
import Carousel from '../../../carousel/Carousel';
// import TrailerPlayer from '../trailers/TrailerPlayer';
import { useDispatch, useSelector } from 'react-redux';
import {
	setPlayMedia,
	setPlayMediaInHero,
	setTitleVideos,
} from '../../../../config/redux/action';

const Trending = ({ mediaType }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [pageNum, setPageNum] = useState();
	const [selectMovie, setSelectMovie] = useState({});
	const [palayTrailer, setPlayTrailer] = useState(false);
	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const genreforURL = UseGenres(selectedGenres);
	const [filteredData, setFilteredData] = useState([]);
	const dispatch = useDispatch();

	const { playMedia } = useSelector(
		(state) => state.trailersReducer,
	);

	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/discover/${mediaType}?api_key=${process.env.REACT_APP_APIKEY}&page=${page}&language=en-US&with_genres=${genreforURL}&watch_region=ID&with_watch_monetization_types=free&sort_by=vote_average.desc`,
			);
			const results = response.data.results;
			setData(results);
			setPageNum(response.data.total_pages);
			setSelectMovie(results[0]);
		} catch (err) {
			console.error(err, 'Data Trending Gagal');
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	};

	const sortData = (data) => {
		return data.sort(
			(a, b) => b.vote_average - a.vote_average,
		);
	};
	// const getData = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/movie/popular?api_key=${process.env.REACT_APP_APIKEY}&page=${page}&language=en-US&with_genres=${genreforURL}&sort_by=vote_average.asc`,
	// 		);
	// 		const results = response.data.results;
	// 		setData(results);
	// 		setPageNum(response.data.total_pages);
	// 	} catch (err) {
	// 		console.error(err, '<=== MOVIES coba lagi boss ===>');
	// 	}
	// };

	const filterDataByGenre = (data, genreIds) => {
		return data.filter((item) => {
			return item.genre_ids.some(
				(genreId) =>
					Array.isArray(genreIds) &&
					genreIds.includes(genreId),
			);
		});
	};

	// const filterData = filterDataByGenre(data, genreforURL);
	console.log('selected genres', selectedGenres);
	console.log('genres', genres);

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// didupdate mount
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, genreforURL]);

	useEffect(() => {
		const filteredData = filterDataByGenre(
			data,
			genreforURL,
		);
		setFilteredData(filteredData);
	}, [data, genreforURL]);

	console.log('filter', filteredData);

	const handleClick = (number) => {
		setPage(number);
	};

	console.log('data', data);
	console.log('PlayMedia', setPlayMediaInHero);
	console.log('selec', selectMovie);
	return (
		<>
			{/* {isLoading ? (
				<Loading type='component' />
			) : ( */}
			<div className='container__trending'>
				<div className='trending__hero'>
					<Carousel hero={data} _media_type={mediaType} />
				</div>
				<div className='container__trending__movies'>
					<div className='trending__title'>
						<h2>trending {mediaType}</h2>
						<span>find your genres {mediaType}</span>
					</div>
					<Genres
						type={mediaType}
						selectedGenres={selectedGenres}
						setSelectedGenres={setSelectedGenres}
						genres={genres}
						setGenres={setGenres}
						setPage={setPage}
					/>
					<div className='wrapper__trending__movies'>
						{data &&
							data.map((movie) => (
								<CardTrending
									key={movie.id}
									data={movie}
									mediaType={mediaType}
								/>
							))}
					</div>
					{pageNum && pageNum > 1 ? (
						<Pagination
							handleClick={handleClick}
							pageNum={pageNum}
							activenum={page}
						/>
					) : (
						''
					)}
				</div>
			</div>
			{/* )} */}
		</>
	);
};

export default Trending;
