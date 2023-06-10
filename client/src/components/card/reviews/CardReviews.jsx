import React from 'react';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import { AiFillStar } from 'react-icons/ai';
import './CardReviews.css';
import {
	img_avatar,
	noProfile,
} from '../../../config/config';

const CardReviews = ({ link, reviews }) => {
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
	function getVoteAverageColor(vote_average) {
		let color = '';

		switch (true) {
			case vote_average >= 9.0:
				color = '#57e32c';
				break;
			case vote_average <= 8 && vote_average >= 6:
				color = '#ffe234';
				break;
			case vote_average <= 5 && vote_average >= 3:
				color = '#ffa534';
				break;
			case vote_average <= 2:
				color = '#ff4545';
				break;
			default:
				color = '';
		}

		return color;
	}
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
							color={getVoteAverageColor(vote_average)}
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
};

export default CardReviews;
