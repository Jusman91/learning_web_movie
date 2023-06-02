import React from 'react';
import { Link } from 'react-router-dom';
import {
	img_300,
	img_500,
	img_avatar,
	img_backdrop,
	img_gravatar,
	img_poster,
	noPoster,
	noProfile,
} from '../../../../config/config';
import { AiFillStar } from 'react-icons/ai';
import dayjs from 'dayjs';
import './CardSeason.css';

const CardSeason = ({
	season,
	title,
	link,
	reviews,
	_media_type,
}) => {
	const air_date = dayjs(
		season ? season.air_date : reviews?.created_at,
	).format('MMM D, YYYY');
	if (season) {
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
	}
	if (reviews) {
		return (
			<div className='wrap_card cardSeason cardReviews'>
				<Link to={link}>
					<div className='wrap_poster reviewsAvatar'>
						{_media_type === 'tv' ? (
							<img
								src={
									reviews?.author_details?.avatar_path
										? `${img_avatar}/${reviews?.author_details?.avatar_path}`
										: noProfile
								}
								alt='Avatar'
							/>
						) : (
							<img
								src={
									reviews?.author_details?.avatar_path
										? reviews?.author_details?.avatar_path.substring(
												1,
										  )
										: noProfile
								}
								alt='Avatar'
							/>
						)}
					</div>
				</Link>
				<div className='des'>
					<div className='title titleSeason titleReviews'>
						<Link
							to={link}
							style={{
								textDecoration: 'none',
								color: '#fff',
							}}>
							<h4>{`A review by ${reviews?.author}`}</h4>
						</Link>

						<span>
							<AiFillStar />
							{reviews?.author_details?.rating}
						</span>

						<p>
							Written by{' '}
							<Link to={link}>{reviews?.author}</Link> on
							{air_date}
						</p>
					</div>
					<div className='synopsis teaser'>
						{reviews.content.length > 600 ? (
							<p>
								{`${reviews?.content.slice(0, 601)}... `}
								<Link>read the rest.</Link>
							</p>
						) : (
							<p>{reviews.content}</p>
						)}
					</div>
				</div>
			</div>
		);
	}
};

export default CardSeason;
