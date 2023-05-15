import axios from 'axios';
import './Trending.css';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import AliceCarousel from 'react-alice-carousel';
import Card from '../../card/Card';
import HeroContainer from '../../../header/hero/HeroContainer';
import Genres from '../../genres/Genres';
import Pagination from '../../pagination/Pagiantion';
import YouTube from 'react-youtube';
import UseGenres from '../../../../hooks/UseGenres';
import Loading from '../../../loading/Loading';

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

	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/discover/${mediaType}?api_key=${process.env.REACT_APP_APIKEY}&page=${page}&with_genres=&language=en-US&with_genres=${genreforURL}`,
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

	const getTrailers = async (id) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${mediaType}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos`,
			);
			setSelectMovie(response.data);
		} catch (err) {
			console.error(err, 'getTrailers error');
		}
	};

	const playTrailers = async (video) => {
		await getTrailers(video.id);
		setPlayTrailer(true);
	};

	const randerTrailer = () => {
		const trailer = selectMovie.videos.results.find(
			(v) => v.name === 'Official Trailer',
		);
		const key = trailer
			? trailer.key
			: selectMovie.videos.results[0].key;
		return (
			<YouTube
				videoId={key}
				className={'trailer'}
				opts={{
					width: '100%',
					height: '100%',
					playerVars: {
						autoplay: 1,
						controls: 1,
						origin: 'http://localhost:3000',
					},
				}}
			/>
		);
	};

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

	const handleClick = (number) => {
		setPage(number);
	};
	console.log(data);
	return (
		<>
			{isLoading ? (
				<Loading type='component' />
			) : (
				<div className='container__trending'>
					<div className='trending__hero'>
						{selectMovie.videos && palayTrailer
							? randerTrailer()
							: null}
						{palayTrailer ? (
							<MdClose
								type='button'
								onClick={() => setPlayTrailer(false)}
								className='close__tranding__trailer'
							/>
						) : null}
						<AliceCarousel
							disableDotsControls
							disableButtonsControls
							autoPlay={true}
							autoPlayInterval={3000}
							animationDuration={1000}
							infinite={true}
							mouseTracking={true}>
							{data &&
								data?.map((movie, index) => (
									<HeroContainer
										key={index}
										poster={movie}
										selectTrailers={playTrailers}
										mediaType={mediaType}
									/>
								))}
						</AliceCarousel>
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
								data?.map((movie) => (
									<Card
										key={movie.id}
										trending={movie}
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
			)}
		</>
	);
};

export default Trending;
