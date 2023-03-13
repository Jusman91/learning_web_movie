import { Link } from 'react-router-dom';
import '../card/Card.css';
import { BsStarFill } from 'react-icons/bs';
import { img_185, img_500 } from '../../../config/config';

const Card = ({ movie, link }) => {
	return (
		<>
			<Link>
				<div className='card'>
					<div className='poster'>
						<img
							src={`${img_500}${movie.poster_path}`}
							alt='poster'
						/>
					</div>
					<div className='card__details'>
						<div className='card__title'>
							{movie.original_title || movie.original_name}
						</div>
						<div className='card__runtime'>
							<h5>
								{movie.release_date || movie.first_air_date}
							</h5>
						</div>
						<div className='card__description'>
							{movie.overview.slice(0, 118) + '...'}
						</div>
					</div>
					<div className='card__rating'>
						<svg
							className='circle__chart'
							viewBox='-15 0 30 30'
							width='100'
							height='40'
							xmlns='http://www.w3.org/2000/svg'>
							{/* <circle
								className='circle__chart__background'
								stroke='#2f3439'
								strokeWidth='2'
								fill='red'
								cx='15'
								cy='15'
								r='14'></circle> */}
							<circle
								className='circle__chart__circle'
								stroke='#4eb04b'
								strokeWidth='2'
								fill='rgba(255, 255, 255, 0.3)'
								strokeDasharray={`${parseInt(
									movie.vote_average,
								)}0,100`}
								cx='19'
								cy='15'
								r='14'></circle>
						</svg>
						<b>{parseInt(movie.vote_average)}</b>
					</div>
				</div>
			</Link>

			{/* <Link
				to={link}
				style={{
					textDecoration: 'none',
					color: 'white',
				}}>
				<div className='cards'>
					<img
						className='cards__img'
						src={`${img_500}${movie.poster_path}`}
						alt='poster'
					/>
					<div className='cards__overlay'>
						<div className='card__title'>
							{movie.original_title}
						</div>
						<div className='card__runtime'>
							<h5>
								{movie.release_date || movie.first_air_date}
							</h5>
							<div className='card__rating'>
								<span>{movie.vote_average}</span>
								<div className='card__icon__rating'>
									<BsStarFill />
								</div>
							</div>
						</div>
						<div className='card__description'>
							{movie.overview.slice(0, 118) + '...'}
						</div>
					</div>
				</div>
			</Link> */}
		</>
	);
};

export default Card;
