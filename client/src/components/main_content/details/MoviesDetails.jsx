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
	const rating = currentMovieDetail?.vote_average * 10;
	const toHoursAndMinutes = (totalMinutes) => {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
	};

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

	const director = crew?.filter(
		(f) => f.job === 'Director',
	);
	const writer = crew?.filter(
		(f) =>
			f.job === 'Story' ||
			f.job === 'Screenplay' ||
			f.job === 'writer',
	);

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
			console.log(response);
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

	function numberWithCommas(x) {
		return x
			.toString()
			.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	}

	const languageNames = new Intl.DisplayNames(['en'], {
		type: 'language',
	});
	const season = currentMovieDetail?.seasons?.slice(-1);
	console.log('season', season);
	return (
		<>
			{isLoading ? (
				<Loading type='component' />
			) : (
				<div className='movie'>
					<div className='movie__intro'>
						<img
							className='movie__backdrop'
							src={
								currentMovieDetail?.backdrop_path
									? `${img_1280}/${currentMovieDetail?.backdrop_path}`
									: unavailable
							}
							alt='poster'
						/>

						{playTrailer ? (
							<YouTube
								className='trailer'
								videoId={
									currentMovieDetail?.videos.results.find(
										(vid) =>
											vid.name === 'Official Trailer',
									)
										? currentMovieDetail?.videos.results.find(
												(vid) =>
													vid.name === 'Official Trailer',
										  ).key
										: currentMovieDetail?.videos.results[0]
												.key
								}
								opts={{
									width: '100%',
									height: '100%',
									playerVars: { autoplay: 1, controls: 0 },
								}}
							/>
						) : null}
						{playTrailer ? (
							<button
								className='trailer__btn trailer__btn__close'
								onClick={() => setPlayTrailer(false)}>
								Close Trailer
							</button>
						) : null}
					</div>
					<div className='movie__intro__overlay'></div>
					<div className='movie__detail'>
						<div className='movie__detailLeft'>
							<img
								src={
									currentMovieDetail?.poster_path
										? `${img_500}/${currentMovieDetail?.poster_path}`
										: unavailable
								}
								alt='poster'
							/>
						</div>
						<div className='movie__detailRight'>
							<div className='top__part'>
								<h3 className='movie__name'>
									{`${
										currentMovieDetail?.title ||
										currentMovieDetail?.name
									} (${dayjs(
										currentMovieDetail?.release_date,
									).format('YYYY')})`}
								</h3>
								<span className='movie__tagline'>
									{currentMovieDetail?.tagline}
								</span>
							</div>
							<div className='middle__part'>
								<div className='middle__part__items_1'>
									<div className='movie__voteCount'>
										<div>Original Language: </div>
										<span>
											{languageNames?.of(
												currentMovieDetail?.original_language ||
													'en',
											)}
										</span>
									</div>
									<div className='movie__status'>
										<div>Status: </div>
										<span>
											{currentMovieDetail?.status}
										</span>
									</div>
									{currentMovieDetail?.runtime && (
										<div className='movie__runtime'>
											<div>Duration: </div>
											<span>
												{toHoursAndMinutes(
													currentMovieDetail?.runtime,
												)}
											</span>
										</div>
									)}
									{currentMovieDetail?.episode_run_time
										?.length > 0 && (
										<div className='movie__runtime'>
											<div>Duration: </div>
											<span>
												{toHoursAndMinutes(
													currentMovieDetail?.episode_run_time,
												)}
											</span>
										</div>
									)}
									<div className='movie__releaseDate'>
										<div>Release date: </div>
										<span>
											{dayjs(
												currentMovieDetail?.release_date ||
													currentMovieDetail?.first_air_date,
											).format('MMM D, YYYY')}
										</span>
									</div>
									<div>
										<div>Budget: </div>
										{currentMovieDetail?.budget ? (
											<span>
												{numberWithCommas(
													`${'$'}${
														currentMovieDetail?.budget
													}${'.00'}`,
												)}
											</span>
										) : (
											<span>_</span>
										)}
									</div>
									<div>
										<div>Revenue: </div>
										{currentMovieDetail?.revenue ? (
											<span>
												{numberWithCommas(
													`${'$'}${
														currentMovieDetail?.revenue
													}${'.00'}`,
												)}
											</span>
										) : (
											<span>_</span>
										)}
									</div>
								</div>
								<div className='middle__part__items_2'>
									<div className='movie__genres'>
										{currentMovieDetail?.genres?.map(
											(genre, index) => (
												<span
													key={index}
													className='movie__genre'
													id={genre.id}>
													{genre.name}
												</span>
											),
										)}
									</div>
								</div>
								<ul className='middle__part__items_3'>
									<li>
										<div className='movie__rating__percent'>
											<svg>
												<circle
													cx='19'
													cy='20'
													r='20'></circle>
												<circle
													style={{
														stroke: `${
															rating >= 80
																? '#57e32c'
																: rating <= 79 &&
																  rating >= 68
																? '#b7dd29'
																: rating <= 67 &&
																  rating >= 56
																? '#ffe234'
																: rating <= 55 &&
																  rating >= 45
																? '#ffa534'
																: rating <= 44 &&
																  rating >= 0
																? '#ff4545'
																: ''
														}`,
														strokeDashoffset: `calc(130 - (130 * ${Math.round(
															rating,
														)}) / 100)`,
													}}
													cx='19'
													cy='20'
													r='20'></circle>
											</svg>
											<div className='movie__rating__number'>
												<h5>{Math.round(rating)}</h5>
												<span>%</span>
											</div>
										</div>
									</li>
									<li>
										<span>
											<MdList />
										</span>
									</li>
									<li>
										<span>
											<MdFavorite />
										</span>
									</li>
									<li>
										<span>
											<MdBookmark />
										</span>
									</li>
									<li>
										<span>
											<MdStar />
										</span>
									</li>
									<li onClick={() => setPlayTrailer(true)}>
										<span>
											<MdOutlinePlayCircle />
										</span>
										Play Trailer
									</li>
								</ul>
								<div className='middle__part__items_4'>
									{director?.length > 0 && (
										<div>
											Director:{' '}
											{director.map((d, i) => (
												<span key={i}>
													{d.name}
													{director.length - 1 !== i &&
														', '}
												</span>
											))}
										</div>
									)}
									{writer?.length > 0 && (
										<div>
											Writer:{' '}
											{writer.map((d, i) => (
												<span key={i}>
													{d.name}
													{writer.length - 1 !== i && ', '}
												</span>
											))}
										</div>
									)}
									{currentMovieDetail?.created_by?.length >
										0 && (
										<div>
											Creator:{' '}
											{currentMovieDetail?.created_by?.map(
												(d, i) => (
													<span key={i}>
														{d.name}
														{currentMovieDetail?.created_by
															?.length -
															1 !==
															i && ', '}
													</span>
												),
											)}
										</div>
									)}
								</div>
							</div>
							<div className='movie__detailRightBottom'>
								<div className='synopsisText'>Synopsis</div>
								<span>
									{currentMovieDetail?.overview.length > 0
										? currentMovieDetail?.overview
										: "We don't have an overview translated in English. Help us expand our database by adding one."}
								</span>
							</div>
						</div>
					</div>
					<div className='wrap_cast'>
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
					</div>
				</div>
			)}
		</>
	);
};

export default MovieDetails;
