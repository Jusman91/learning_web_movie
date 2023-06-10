import React from 'react';
import { Link } from 'react-router-dom';
import {
	img_poster,
	noPoster,
} from '../../../config/config';
import dayjs from 'dayjs';
import './CardSeason.css';

const CardSeason = ({ season, title, link }) => {
	const air_date = dayjs(season?.air_date).format(
		'MMM D, YYYY',
	);
	return (
		<div className='wrap_card cardSeason'>
			<Link to={link}>
				<div className='wrap_poster posterSeason'>
					<img
						src={
							season.poster_path
								? `${img_poster}/${season.poster_path}`
								: noPoster
						}
						alt='poster'
					/>
				</div>
			</Link>
			<div className='des'>
				<div className='title titleSeason '>
					<Link
						to={link}
						style={{
							textDecoration: 'none',
							color: '#fff',
						}}>
						<h4>{season.name}</h4>
					</Link>
					<p>
						{air_date}
						{' | '}
						{`${season?.episode_count} Episode`}
					</p>
				</div>
				<div className='synopsis'>
					<p>
						{`Season ${season?.season_number} of ${title} premiered on ${air_date}`}
						<br />
						<span>{season?.overview}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CardSeason;
