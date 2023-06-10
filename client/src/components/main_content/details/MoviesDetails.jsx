import '../details/MovieDetails.css';
import axios from 'axios';
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../loading/Loading';
import Hero from '../../header/hero/Hero';
import TrailerPlayer from '../movie_list/trailers/TrailerPlayer';
import Credits from '../credits/Credits';
import PartTopDetails from '../../container/details/PartTopDetails';
import PartMiddleDetails from '../../container/details/PartMiddleDetails';
import PartBottom from '../../container/details/PartBottom';

const MovieDetails = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [playHero, setPlayInHero] = useState(false);
	const [currentMovieDetail, setMovie] = useState({});
	const [crew, setCrew] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [media, setMedia] = useState('most popular');
	const [videos, setVideos] = useState([]);
	const [key, setKey] = useState('');
	const [selectedItemName, setSelectedItemName] =
		useState('');
	const [playMedia, setPlayMedia] = useState(false);
	const [backdrops, setBackdrops] = useState([]);
	const [posters, setPosters] = useState([]);
	const [similarMovies, setSimilarMovies] = useState([]);
	const [recommendationMovies, setRecommendationMovies] =
		useState([]);
	const params = useParams();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';
	const [show, setShow] = useState(false);
	const listInnerRef = useRef();

	const getData = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=credits,reviews,videos,images,similar,recommendations`,
			);
			const results = response.data;
			const credits = results.credits.crew;
			const reviews = results.reviews.results[0];
			const videos = results.videos.results;
			const backdrops = results.images.backdrops;
			const posters = results.images.posters;
			const similar = results.similar.results;
			const recommendations =
				results.recommendations.results;
			setMovie(results);
			setCrew(credits);
			setReviews(reviews);
			setVideos(videos);
			setBackdrops(backdrops);
			setPosters(posters);
			setSimilarMovies(similar);
			setRecommendationMovies(recommendations);
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, [
		_media_type,
		id,
		setMovie,
		setReviews,
		setBackdrops,
		setPosters,
		setSimilarMovies,
		setRecommendationMovies,
		setIsLoading,
	]);

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
	}, [getData]);

	const season = currentMovieDetail?.seasons?.slice(-1);

	// mengambil index pertama tiap-tiap data
	const mostPopular = [
		...videos.slice(-1),
		...backdrops.slice(0, 1),
		...posters.slice(0, 1),
	];

	// membalikan index pada data
	const videosReversed = [...videos].reverse();

	// menambahkan type ditiap-tiap state
	const dataMedia = [
		{ type: 'most popular', items: [...mostPopular] },
		{ type: 'videos', items: [...videosReversed] },
		{ type: 'backdrops', items: [...backdrops] },
		{ type: 'posters', items: [...posters] },
	];

	const handleList = (value) => {
		setMedia(value);
	};

	const getKey = (value) => {
		setKey(value);
		setPlayMedia(true);
	};

	const onScroll = () => {
		if (listInnerRef.current) {
			const { scrollLeft } = listInnerRef.current;
			if (scrollLeft > 50) {
				setShow(true);
			} else {
				setShow(false);
			}
		}
	};

	return (
		<>
			{isLoading ? (
				<Loading type='component' />
			) : (
				<section className='container_details'>
					<Hero detail={currentMovieDetail} />

					<div className='top'>
						<PartTopDetails
							details={currentMovieDetail}
							crew={crew}
							setPlayTrailer={() => setPlayInHero(true)}
						/>
						{playHero && (
							<TrailerPlayer
								hero={currentMovieDetail}
								setPlayMedia={() => setPlayInHero(false)}
							/>
						)}
					</div>
					<div className='middle'>
						<Credits id={id} _media_type={_media_type} />
						<PartMiddleDetails
							id={id}
							_media_type={_media_type}
							season={season}
							currentDetail={currentMovieDetail.name}
							reviews={reviews}
							dataMedia={dataMedia}
							media={media}
							handleList={handleList}
							show={show}
							onScroll={() => onScroll()}
							listInnerRef={listInnerRef}
							mostPopular={mostPopular}
							videos={videos}
							backdrops={backdrops}
							posters={posters}
							setSelectedItemName={setSelectedItemName}
							getKey={getKey}
						/>
						{playMedia && (
							<TrailerPlayer
								keys={key}
								titleVideos={selectedItemName}
								setPlayMedia={() => setPlayMedia(false)}
							/>
						)}
					</div>
					<div className='bottom'>
						<PartBottom
							_media_type={_media_type}
							data={currentMovieDetail}
							similarMovies={similarMovies}
							recommendationMovies={recommendationMovies}
						/>
					</div>
				</section>
			)}
		</>
	);
};

export default MovieDetails;
