import React from 'react';
import { Link } from 'react-router-dom';
import {
	img_avatar,
	img_poster,
	noPoster,
	noProfile,
} from '../../../../config/config';
import { AiFillStar } from 'react-icons/ai';
import dayjs from 'dayjs';
import './CardSeason.css';

const CardSeason = ({ season, title, link, reviews }) => {
	if (season) {
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
	}
	if (reviews) {
		const regex = /https:\/\/\S+/g;
		const path = reviews?.author_details?.avatar_path;
		const avatarUrl = path?.match(regex);
		const avatar = `${img_avatar}/${path}`;
		const air_date = dayjs(reviews?.created_at).format(
			'MMM D, YYYY',
		);
		const vote_average = reviews.author_details.rating
			? reviews.author_details.rating
			: '0';
		return (
			<div className='wrap_card cardSeason cardReviews'>
				<Link to={link}>
					<div className='wrap_poster reviewsAvatar'>
						<img
							src={path ? avatarUrl || avatar : noProfile}
							alt='Avatar'
						/>
					</div>
				</Link>
				<div className='des'>
					<div className='titleReviews'>
						<Link
							to={`/review/${reviews?.id}`}
							style={{
								textDecoration: 'none',
								color: '#fff',
							}}>
							<h4>{`A review by ${reviews?.author}`}</h4>
						</Link>
						<p className='wrap_vote'>
							<AiFillStar
								className='icon_star'
								color={
									vote_average >= 9.0
										? '#57e32c'
										: vote_average <= 8 && vote_average >= 6
										? '#ffe234'
										: vote_average <= 5 && vote_average >= 3
										? '#ffa534'
										: vote_average <= 2
										? '#ff4545'
										: ''
								}
							/>
							<span className='votes'>{vote_average}</span>
						</p>

						<p className='author'>
							Written by{' '}
							<Link to={link}>{reviews?.author}</Link> on
							{air_date}
						</p>
					</div>
					<div className='synopsis teaser'>
						{reviews.content.length > 600 ? (
							<p>
								{`${reviews?.content.slice(0, 601)}... `}
								<Link to={`/review/${reviews?.id}`}>
									read the rest.
								</Link>
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
