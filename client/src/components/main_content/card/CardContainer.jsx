import { useEffect, useState } from 'react';
import Skeleton, {
	SkeletonTheme,
} from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import '../card/Card.css';
import { BsStarFill } from 'react-icons/bs';

const Card = ({ movie, link }) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);
	return (
		<>
			{isLoading ? (
				<div className='cards'>
					<SkeletonTheme
						baseColor='#202020'
						highlightColor='#444'>
						<Skeleton height={300} duration={2} />
					</SkeletonTheme>
				</div>
			) : (
				<Link
					to={link}
					style={{
						textDecoration: 'none',
						color: 'white',
					}}>
					<div className='cards'>
						<img
							className='cards__img'
							src={`${process.env.REACT_APP_BASEIMGURL_W500}${movie.poster_path}`}
							alt='poster'
						/>
						<div className='cards__overlay'>
							<div className='card__title'>
								{movie.original_title}
							</div>
							<div className='card__runtime'>
								<h5>
									{movie.release_date ||
										movie.first_air_date}
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
				</Link>
			)}
		</>
	);
};

export default Card;
