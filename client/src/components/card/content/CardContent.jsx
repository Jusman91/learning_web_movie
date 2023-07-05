import React from 'react';
import { IoPlay } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { img_poster, noPoster } from '../../../config/tmdb';
import SvgCircle from '../../elements/SvgCircle';
import './CardContent.css';

const CardContent = ({
	data,
	link,
	trailers,
	selectMovie,
	onImageSelect,
}) => {
	const getRoundedRating = () => {
		const voteAverage = data?.vote_average;
		if (voteAverage && typeof voteAverage === 'number') {
			const rating = voteAverage * 10;
			return Math.round(rating);
		}
		return 0;
	};
	const rating = getRoundedRating();
	if (data) {
		return (
			<Link to={link}>
				<div></div>
				<div className='card'>
					<div className='poster'>
						<img
							src={
								data?.poster_path
									? `${img_poster}/${data?.poster_path}`
									: noPoster
							}
							alt='poster'
						/>
					</div>
					<div className='card__details'>
						<h4 className='card__title'>
							{data?.original_title || data?.name}
						</h4>
						<div className='card__runtime'>
							<h5>
								{data?.release_date || data?.first_air_date}
							</h5>
						</div>
						<div className='card__language'>
							Language:{' '}
							<span>{data?.original_language}</span>
						</div>
					</div>
					<div className='rating__percent'>
						<SvgCircle rating={rating} />
						<div className='rating__number'>
							<h5>{rating !== 0 ? rating : 'NR'}</h5>
							<span>{rating !== 0 ? '%' : ''}</span>
						</div>
					</div>
				</div>
			</Link>
		);
	}

	if (trailers) {
		const handleMouseEnter = () => {
			onImageSelect(trailers.poster_path);
		};
		return (
			<>
				<div
					className='trailers__card'
					onMouseEnter={handleMouseEnter}>
					<div className='trailers__poster'>
						<img
							src={
								trailers.poster_path
									? `${img_poster}/${trailers.poster_path}`
									: noPoster
							}
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
};

export default CardContent;
