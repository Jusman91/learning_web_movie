import { Link } from 'react-router-dom';
import '../card/Card.css';
import { img_500 } from '../../../config/config';
import { FaPlay } from 'react-icons/fa';

const Card = ({ movie, link, trailers, selectMovie }) => {
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
									movie.overview.slice(0, 135) + '...'}
							</div>
						</div>
						<div className='card__rating'>
							<svg
								viewBox='-15 0 30 30'
								width='100'
								height='40'
								xmlns='http://www.w3.org/2000/svg'>
								<circle
									stroke='#2f3439'
									strokeWidth='3'
									fill='none'
									cx='13'
									cy='15'
									r='14'></circle>
								<circle
									stroke={
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
									}
									strokeWidth='3'
									fill='rgba(25, 25, 25, 0.8)'
									strokeDasharray={`${parseInt(
										movie.vote_average,
									)}0,100`}
									cx='13'
									cy='15'
									r='14'></circle>
							</svg>
							<div className='rate__movie'>
								{Math.round(rating)}
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
						<FaPlay
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
};

export default Card;
