import '../details/MovieDetails.css';
import YouTube from 'react-youtube';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
} from '../../../config/config';

const MovieDetails = () => {
	const [playTrailer, setPlayTrailer] = useState(false);
	const [currentMovieDetail, setMovie] = useState();
	// const { id, mediatype } = useParams();
	const params = useParams();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos`,
			);
			const results = response.data;
			setMovie(results);
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
	};

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const rating = currentMovieDetail?.vote_average * 10;
	const runtime = currentMovieDetail?.runtime;
	const hours = Math.floor(runtime / 60);
	const minutes = runtime % 60;
	const toHoursAndMinutes = () => {
		return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
	};
	console.log(currentMovieDetail);
	return (
		<>
			<div className='movie'>
				<div className='movie__intro'>
					<img
						className='movie__backdrop'
						src={`${img_1280}${currentMovieDetail?.backdrop_path}`}
						alt='poster'
					/>

					{playTrailer ? (
						<YouTube
							className='trailer'
							videoId={
								currentMovieDetail?.videos.results.find(
									(vid) => vid.name === 'Official Trailer',
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

					{/* <button
						className='trailer__btn'
						onClick={() => setPlayTrailer(true)}>
						Play Trailer
					</button> */}
					{playTrailer ? (
						<button
							className='trailer__btn trailer__btn__close'
							onClick={() => setPlayTrailer(false)}>
							Close Trailer
						</button>
					) : null}
				</div>
				<div className='movie__detail'>
					<div className='movie__detailLeft'>
						<img
							src={`${img_500}${currentMovieDetail?.poster_path}`}
							alt='poster'
						/>
					</div>
					<div className='movie__detailRight'>
						<div className='top__part'>
							<h3 className='movie__name'>
								{currentMovieDetail?.original_title ||
									currentMovieDetail?.name}
							</h3>
							<span className='movie__tagline'>
								{currentMovieDetail?.tagline}
							</span>
						</div>
						<div className='middle__part'>
							<div className='middle__part__items_1'>
								<div className='movie__voteCount'>
									<span>
										{'(' +
											currentMovieDetail?.vote_count +
											')'}{' '}
									</span>
									votes
								</div>
								<div className='movie__status'>
									Status:{' '}
									<span>{currentMovieDetail?.status}</span>
								</div>
								<div className='movie__runtime'>
									Runetime:{' '}
									<span>{toHoursAndMinutes()}</span>
								</div>
								<div className='movie__releaseDate'>
									Release date:{' '}
									<span>
										{currentMovieDetail?.release_date}
									</span>
								</div>
							</div>
							<div className='middle__part__items_2'>
								<div className='movie__genres'>
									{currentMovieDetail?.genres?.map(
										(genre, index) => (
											<>
												<span
													key={index.id}
													className='movie__genre'
													id={genre.id}>
													{genre.name}
												</span>
											</>
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
															: rating <= 79 && rating >= 68
															? '#b7dd29'
															: rating <= 67 && rating >= 56
															? '#ffe234'
															: rating <= 55 && rating >= 45
															? '#ffa534'
															: rating <= 44 && rating >= 0
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
						</div>
						<div className='movie__detailRightBottom'>
							<div className='synopsisText'>Synopsis</div>
							<span>{currentMovieDetail?.overview}</span>
						</div>
					</div>
				</div>
				<div className='movie__link'>
					<div className='movie__heading'>Useful Link</div>
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
						currentMovieDetail.production_companies.map(
							(company, index) => (
								<>
									{company.logo_path && (
										<span
											key={index.id}
											className='productionCompanyImg'>
											<img
												className='movie__productionCompany'
												src={`${img_300}${company.logo_path}`}
												alt='ProductionCompany'
											/>
											<span>{company.name}</span>
										</span>
									)}
								</>
							),
						)}
				</div>
			</div>
		</>
	);
};

export default MovieDetails;
