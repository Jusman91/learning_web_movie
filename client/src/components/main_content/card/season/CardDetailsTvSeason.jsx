import React from 'react';
import Card from '../Card';
import { Link } from 'react-router-dom';
import {
	img_500,
	unavailable,
} from '../../../../config/config';

const CardDetailsTvSeason = ({ episodes }) => {
	const toHoursAndMinutes = (totalMinutes) => {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
	};
	return (
		<div className='container_card'>
			<Link to={''} className='wrap_card cardSeason'>
				<div className='wrap_poster episode'>
					<img
						src={
							episodes.still_path
								? `${img_500}/${episodes.still_path}`
								: unavailable
						}
						alt='poster'
					/>
				</div>
				<div className='des'>
					<div className='title titleSeason'>
						<h4>{episodes.episode_number}</h4>
						<p className='votes'>{episodes.vote_average}</p>
						<h4>
							{episodes.original_title || episodes.name}
						</h4>
						<p>{episodes.air_date}</p>
						<p>{toHoursAndMinutes(episodes.runtime)}</p>
					</div>
					<div className='synopsis'>
						{episodes.overview?.length > 0
							? episodes.overview
							: "We don't have an overview translated in English. Help us expand our database by adding one."}
					</div>
				</div>
			</Link>
			{/* <button>Expand</button> */}
		</div>
	);
};

export default CardDetailsTvSeason;
