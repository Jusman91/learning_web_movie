import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
	img_poster,
	unavailable,
} from '../../../config/config';

const CardDetailsTvSeason = ({ episodes }) => {
	const toHoursAndMinutes = (totalMinutes) => {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
	};

	const vote_average = episodes.vote_average.toFixed(1);
	return (
		<div className='container_card'>
			<Link to={''} className='wrap_card cardSeason'>
				<div className='wrap_poster episode'>
					<img
						src={
							episodes.still_path
								? `${img_poster}/${episodes.still_path}`
								: unavailable
						}
						alt='poster'
					/>
				</div>
				<div className='des'>
					<div className='title titleSeason'>
						<h4>{episodes.episode_number}</h4>

						<p className='wrap_vote'>
							<AiFillStar
								className='icon_star'
								color={
									vote_average >= 8.0
										? '#57e32c'
										: vote_average <= 7.9 &&
										  vote_average >= 6.8
										? '#b7dd29'
										: vote_average <= 6.7 &&
										  vote_average >= 5.6
										? '#ffe234'
										: vote_average <= 5.5 &&
										  vote_average >= 4.5
										? '#ffa534'
										: vote_average <= 4.4 &&
										  vote_average >= 0
										? '#ff4545'
										: ''
								}
							/>
							<span className='votes'>{vote_average}</span>
						</p>
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
