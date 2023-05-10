import { Link } from 'react-router-dom';
import '../card/Card.css';
import { img_500 } from '../../../config/config';
import { IoPlay } from 'react-icons/io5';

const Card = ({
	movie,
	link,
	trailers,
	selectMovie,
	trending,
	mediaType,
}) => {
	if (movie) {
		const rating = movie.vote_average * 10;
		return (
			<>
				<Link to={link}>
					<div className='card'>
						<div className='poster'>
							<img
								src={`${img_500}${movie.poster_path}`}
								alt='poster'
							/>
						</div>
						<div className='card__details'>
							<div className='card__title'>
								{movie.original_title || movie.name}
							</div>
							<div className='card__runtime'>
								<h5>
									{movie.release_date ||
										movie.first_air_date}
								</h5>
							</div>
							<div className='card__language'>
								Language:{' '}
								<span>{movie.original_language}</span>
							</div>
							<div className='card__description'>
								{movie.overview &&
									movie.overview.slice(0, 120) + '...'}
							</div>
						</div>
						<div className='rating__percent'>
							<svg>
								<circle cx='19' cy='20' r='20'></circle>
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
							<div className='rating__number'>
								<h5>{Math.round(rating)}</h5>
								<span>%</span>
							</div>
						</div>
					</div>
				</Link>
			</>
		);
	}
	if (trailers) {
		return (
			<>
				<div className='trailers__card'>
					<div className='trailers__poster'>
						<img
							src={`${img_500}${trailers.poster_path}`}
							alt='poster'
						/>
					</div>
					<div className='btn__play__trailers'>
						<IoPlay
							onClick={() => selectMovie(trailers)}
							className='play__icon'
						/>
					</div>
				</div>
				<div className='trailers__details'>
					<div className='trailers__title'>
						{trailers.original_title || trailers.name}
					</div>
				</div>
			</>
		);
	}
	if (trending) {
		const rating = trending.vote_average * 10;
		const id = trending.id;
		const media_type = trending.media_type
			? trending.media_type
			: trending.type
			? trending.type
			: mediaType;
		return (
			<>
				<Link to={`/details/${id}/${media_type}`}>
					<div className='trending__card'>
						<div className='trending__poster'>
							<img
								src={`${img_500}${trending.poster_path}`}
								alt='poster'
							/>
						</div>
						<div className='rating__percent'>
							<svg>
								<circle cx='20' cy='20' r='20'></circle>
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
												: rating <= 44 && rating >= 1
												? '#ff4545'
												: ''
										}`,
										strokeDashoffset: `calc(130 - (130 * ${Math.round(
											rating,
										)}) / 100)`,
									}}
									cx='20'
									cy='20'
									r='20'></circle>
							</svg>
							<div className='rating__number'>
								<h5>{Math.round(rating)}</h5>
								<span>%</span>
							</div>
						</div>
					</div>
				</Link>
			</>
		);
	}
};

export default Card;