import React from 'react';
import { Link } from 'react-router-dom';
import { img_poster, noPoster } from '../../../config/tmdb';
import SvgCircle from '../../elements/SvgCircle';
import './CardTrending.css';

const CardTrending = ({ data, mediaType }) => {
	const getRoundedRating = () => {
		const voteAverage = data.vote_average;
		if (voteAverage && typeof voteAverage === 'number') {
			const rating = voteAverage * 10;
			return Math.round(rating);
		}
		return 0;
	};
	const rating = getRoundedRating();

	const id = data.id;
	const _media_type =
		data.media_type || data.type || mediaType;
	let name = data.original_title || data.name;
	name = name.replace(/\s+/g, '-').toLowerCase();
	const url = `/details/${_media_type}/${`${id}${'-'}${name}`}`;
	return (
		<>
			<Link to={url}>
				<div className='trending__card'>
					<div className='trending__poster'>
						<img
							src={
								data.poster_path
									? `${img_poster}/${data.poster_path}`
									: noPoster
							}
							alt='poster'
						/>
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
		</>
	);
};

export default CardTrending;
