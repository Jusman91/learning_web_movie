import axios from 'axios';
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import './UserReviews.css';
import ContentHeader from '../../header/ContentHeader';
import CardReviews from '../../card/reviews/CardReviews';

export const UserReviews = () => {
	const [reviews, setReviews] = useState([]);
	const [allData, setAllData] = useState([]);
	const params = useParams();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';

	const getReviews = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=reviews`,
			);
			const results = response.data;
			const reviews = results.reviews.results;
			setAllData(results);
			setReviews(reviews);
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
	}, [_media_type, id]);

	useEffect(() => {
		getReviews();
	}, [getReviews]);

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
							<CardReviews key={i} reviews={r} />
						))}
				</aside>
			</div>
		</section>
	);
};
