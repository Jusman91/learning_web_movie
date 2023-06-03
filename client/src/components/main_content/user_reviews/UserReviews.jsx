import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ContentHeader from '../../container/header/ContentHeader';
import './UserReviews.css';
import CardSeason from '../card/season/CardSeason';

export const UserReviews = () => {
	const [reviews, setReviews] = useState([]);
	const [allData, setAllData] = useState([]);
	const params = useParams();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';

	const getReviews = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=reviews`,
			);
			const results = response.data;
			const reviews = results.reviews.results;
			setAllData(results);
			setReviews(reviews);
			console.log('RESULTS DATA', results);
			console.log('REVIEWS DATA', reviews);
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
	};

	useEffect(() => {
		getReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className='container_section'>
			<ContentHeader
				allData={allData}
				_media_type={_media_type}
				id={id}
			/>
			<div className='content_reviews'>
				<aside className='left'>
					<button>
						<Link>login to write a review.</Link>
					</button>
				</aside>
				<aside className='right'>
					{reviews &&
						reviews.map((r, i) => (
							<CardSeason
								key={i}
								reviews={r}
								id={id}
								_media_type={_media_type}
							/>
						))}
				</aside>
			</div>
		</section>
	);
};
