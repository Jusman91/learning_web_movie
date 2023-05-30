import '../details/MovieDetails.css';
import YouTube from 'react-youtube';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import {
	MdList,
	MdFavorite,
	MdBookmark,
	MdStar,
	MdOutlinePlayCircle,
} from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import {
	img_1280,
	img_300,
	img_500,
	img_backdrop,
	noProfile,
	unavailable,
} from '../../../config/config';
import AliceCarousel from 'react-alice-carousel';
import Card from '../card/Card';
import {
	IoIosArrowBack,
	IoIosArrowForward,
} from 'react-icons/io';
import Loading from '../../loading/Loading';
import CreditsTvSeries from '../credits/CreditsTvSeries';
import Hero from '../../header/hero/Hero';
import PartTopDitails from './PartTopDitails';
import TrailerPlayer from '../movie_list/trailers/TrailerPlayer';

const MovieDetails = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [playTrailer, setPlayTrailer] = useState(false);
	const [currentMovieDetail, setMovie] = useState({});
	const [crew, setCrew] = useState([]);
	const [cast, setCast] = useState([]);
	const [similarMovies, setSimilarMovies] = useState([]);
	const [movieRecommendations, setMovieRecommendations] =
		useState([]);
	const params = useParams();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';

	const responsive = {
		0: {
			items: 1,
		},
		512: {
			items: 3,
		},
		1024: {
			items: 6,
		},
	};
	const similarResponsive = {
		0: {
			items: 1,
		},
		512: {
			items: 3,
		},
		1024: {
			items: 4,
		},
	};

	const renderNextButton = () => {
		return (
			<IoIosArrowForward
				style={{
					position: 'absolute',
					right: '-2%',
					top: '35%',
					fontSize: '40px',
					cursor: 'pointer',
				}}
			/>
		);
	};

	const renderPrevButton = () => {
		return (
			<IoIosArrowBack
				style={{
					position: 'absolute',
					left: '-2%',
					top: '35%',
					fontSize: '40px',
					cursor: 'pointer',
				}}
			/>
		);
	};

	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos`,
			);
			const results = response.data;
			setMovie(results);
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	};

	const getCredits = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			console.log('universal', response);
			const crewResults = response.data.crew;
			const castResults = response.data.cast;
			setCrew(crewResults);
			setCast(castResults);
			console.log('CREW', crewResults);
			console.log('CAST', castResults);
		} catch (err) {
			console.error(err, '<==== get credits gagal ====>');
		}
	};

	const getSimilarMovies = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}/similar?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1`,
			);
			console.log(response);
			const results = response.data.results;
			setSimilarMovies(results);
		} catch (err) {
			console.error(err, '<==== get similar gagal ====>');
		}
	};
	const getMovieRecommendations = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}/recommendations?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1`,
			);
			console.log(response);
			const results = response.data.results;
			setMovieRecommendations(results);
		} catch (err) {
			console.error(err, '<==== get similar gagal ====>');
		}
	};

	useEffect(() => {
		getData();
		getCredits();
		getSimilarMovies();
		getMovieRecommendations();
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, _media_type]);

	console.log('ddata', currentMovieDetail);

	const season = currentMovieDetail?.seasons?.slice(-1);
	console.log('season', season);
	return (
		<>
			{isLoading ? (
				<Loading type='component' />
			) : (
				<section className='container_details'>
					<Hero detail={currentMovieDetail} />
					{playTrailer && (
						<TrailerPlayer
							trailer={currentMovieDetail}
							setPlayTrailer={() => setPlayTrailer(false)}
						/>
					)}

					<PartTopDitails
						details={currentMovieDetail}
						crew={crew}
						setPlayTrailer={() => setPlayTrailer(true)}
					/>
					<CreditsTvSeries
						id={id}
						_media_type={_media_type}
					/>
					{/*<div className='wrap_cast'>
						<h3>Top Billed Cast</h3>
						<AliceCarousel
							disableDotsControls
							disableButtonsControls
							mouseTracking={true}
							responsive={responsive}>
							{cast &&
								cast?.slice(0, 6).map((c, index) => (
									<div key={index} className='cast_profile'>
										<img
											src={
												c.profile_path
													? `${img_500}${c.profile_path}`
													: noProfile
											}
											alt='Profile'
										/>
										<div className='character'>
											<span>{c.name}</span>
											<span>{c.character}</span>
										</div>
									</div>
								))}
						</AliceCarousel>
						<Link
							to={`/details/${_media_type}/${id}/cast`}
							className='full_castcrew'>
							<h4> View more Cast & Crew ⇨</h4>
						</Link>
					</div>
					{season && (
						<div className='wrap_current_season'>
							<h3>Current Season</h3>
							{season.map((item, index) => (
								<div
									key={index}
									className='wrapper_card_season'>
									<Card
										season={item}
										title={currentMovieDetail?.name}
									/>
								</div>
							))}
							<Link
								to={`/details/${_media_type}/${id}/season`}
								className='all_seasons'>
								<h4>View All Seasons ⇨</h4>
							</Link>
						</div>
					)}
					{similarMovies && similarMovies.length > 0 ? (
						<div className='wrap_similar_movies'>
							<h3>Similar Movies</h3>
							<AliceCarousel
								disableDotsControls
								renderNextButton={renderNextButton}
								renderPrevButton={renderPrevButton}
								responsive={similarResponsive}>
								{similarMovies &&
									similarMovies?.map((m, i) => (
										<Card
											key={i}
											movie={m}
											link={`/details/${m.id}/${_media_type}`}
										/>
									))}
							</AliceCarousel>
						</div>
					) : null}
					{movieRecommendations &&
					movieRecommendations.length > 0 ? (
						<div className='wrap_recommendations'>
							<h3>Recommendations</h3>
							<AliceCarousel
								disableDotsControls
								renderNextButton={renderNextButton}
								renderPrevButton={renderPrevButton}
								responsive={similarResponsive}>
								{movieRecommendations &&
									movieRecommendations?.map((m, i) => (
										<Card
											key={i}
											movie={m}
											link={`/details/${m.id}/${_media_type}`}
										/>
									))}
							</AliceCarousel>
						</div>
					) : null}
					{}
					<div className='movie__link'>
						<div className='movie__heading'>
							Useful Link
						</div>
						{currentMovieDetail &&
							currentMovieDetail.homepage && (
								<a
									rel='noopener noreferrer'
									href={currentMovieDetail.homepage}
									target='_blank'
									style={{ textDecoration: 'none' }}>
									<p>
										<span className='movie__homeBtn movie__btn'>
											Homepage <FiExternalLink />
										</span>
									</p>
								</a>
							)}
						{currentMovieDetail &&
							currentMovieDetail.imdb_id && (
								<a
									rel='noopener noreferrer'
									href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
									target='_blank'
									style={{ textDecoration: 'none' }}>
									<p>
										<span className='movie__imdbBtn movie__btn'>
											IMDb <FiExternalLink />
										</span>
									</p>
								</a>
							)}
					</div>
					<div className='movie__production__heading'>
						Production Companies
					</div>
					<div className='movie__production'>
						{currentMovieDetail &&
							currentMovieDetail.production_companies?.map(
								(company, index) => (
									<div key={index}>
										{company.logo_path && (
											<span className='productionCompanyImg'>
												<img
													className='movie__productionCompany'
													src={`${img_300}${company.logo_path}`}
													alt='ProductionCompany'
												/>
												<span>{company.name}</span>
											</span>
										)}
									</div>
								),
							)}
					</div> */}
				</section>
			)}
		</>
	);
};

export default MovieDetails;
