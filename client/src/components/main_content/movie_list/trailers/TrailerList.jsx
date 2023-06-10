import axios from 'axios';
import './TrailerList.css';
import { SiAirplayvideo } from 'react-icons/si';
import {
	MdOutlinePlayCircleFilled,
	MdClose,
} from 'react-icons/md';
import YouTube from 'react-youtube';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import Card from '../../../card/Card';

const TrailerList = () => {
	const [dataTrailers, setDataTrailers] = useState([]);
	const [mediaType, setMediaType] = useState('movie');
	const [categorys, setCategorys] = useState('now_playing');
	const [selectMovie, setSelectMovie] = useState({});
	const [palayTrailer, setPlayTrailer] = useState(false);

	const handleSet = (cate, media) => {
		setMediaType(media);
		setCategorys(cate);
	};

	const responsive = {
		0: {
			items: 1,
		},
		676: {
			items: 2,
		},
		900: {
			items: 3,
		},
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${mediaType}/${categorys}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1`,
			);
			const results = response.data.results;
			setDataTrailers(results);
			setSelectMovie(results[0]);
		} catch (err) {
			console.error(err, 'Error fetching');
		}
	};

	const fetchTrailers = async (id) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${mediaType}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos`,
			);
			return response.data;
		} catch (err) {
			console.error(err, 'getTrailers error');
		}
	};

	const selectTrailers = async (video) => {
		const trailers = await fetchTrailers(video.id);
		setSelectMovie(trailers);
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
					},
				}}
			/>
		);
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaType, categorys]);
	return (
		<>
			<div className='container__trailers'>
				<div className='trailers__header'>
					<h2>Trailers</h2>
					<span>
						Check out the trailer and make yourself curious
					</span>
				</div>
				<div className='trailers__list'>
					<ul>
						<li
							onClick={() =>
								handleSet('now_playing', 'movie')
							}
							className={
								categorys === 'now_playing'
									? 'trailers__list__active'
									: ''
							}>
							<div>
								<span className='trailers__list__icon'>
									<MdOutlinePlayCircleFilled />
								</span>
								<span className='trailers__list__text'>
									Now Playing
								</span>
							</div>
						</li>
						<li
							onClick={() => handleSet('on_the_air', 'tv')}
							className={
								categorys === 'on_the_air'
									? 'trailers__list__active'
									: ''
							}>
							<div>
								<span className='trailers__list__icon'>
									<SiAirplayvideo />
								</span>
								<span className='trailers__list__text'>
									On The Air
								</span>
							</div>
						</li>
						<div className='trailers__indicator'></div>
					</ul>
				</div>
			</div>
			<div className='container__slider__trailer'>
				{selectMovie.videos && palayTrailer
					? randerTrailer()
					: null}
				{palayTrailer ? (
					<MdClose
						type='button'
						onClick={() => setPlayTrailer(false)}
						className='close__trailer'
					/>
				) : null}

				{dataTrailers && dataTrailers.length > 0 ? (
					<AliceCarousel
						autoPlay={true}
						autoPlayInterval={3000}
						infinite={true}
						touchMoveDefaultEvents={false}
						touchTracking={false}
						mouseTracking
						disableDotsControls
						disableButtonsControls
						responsive={responsive}>
						{dataTrailers &&
							dataTrailers?.map((movie, index) => (
								<Card
									key={index}
									trailers={movie}
									selectMovie={selectTrailers}
								/>
							))}
					</AliceCarousel>
				) : (
					<h2>Movies Not Found</h2>
				)}
			</div>
		</>
	);
};

export default TrailerList;
