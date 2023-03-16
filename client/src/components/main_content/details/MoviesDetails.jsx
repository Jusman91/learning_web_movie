import '../details/MovieDetails.css';
import YouTube from 'react-youtube';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import {
	img_1280,
	img_300,
	img_500,
} from '../../../config/config';

const MovieDetails = ({ categorys }) => {
	const [playTrailer, setPlayTrailer] = useState(false);
	const [currentMovieDetail, setMovie] = useState();
	const { id, mediatype } = useParams();

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${mediatype}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos`,
			);
			const results = response.data;
			setMovie(results);
			console.log(results);
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
	};

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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

					<button
						className='trailer__btn'
						onClick={() => setPlayTrailer(true)}>
						Play Trailer
					</button>
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
						<div className='movie__posterBox'>
							<img
								src={`${img_500}${currentMovieDetail?.poster_path}`}
								alt='poster'
							/>
						</div>
					</div>
					<div className='movie__detailRight'>
						<div className='movie__detailRightTop'>
							<div className='movie__name'>
								{currentMovieDetail?.original_title ||
									currentMovieDetail?.name}
							</div>
							<div className='movie__tagline'>
								{currentMovieDetail?.tagline}
							</div>
							<div className='movie__rating'>
								<span className='movie__voteAverage'>
									{currentMovieDetail?.vote_average}
								</span>
								<div className='moivie__icon'>
									<BsStarFill />
								</div>
								<span className='movie__voteCount'>
									{'(' +
										currentMovieDetail?.vote_count +
										')'}{' '}
									votes
								</span>
							</div>
							<div className='movie__runtime'>
								{currentMovieDetail?.runtime} mins
							</div>
							<div className='movie__releaseDate'>
								Release date:{' '}
								{currentMovieDetail?.release_date}
							</div>
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
