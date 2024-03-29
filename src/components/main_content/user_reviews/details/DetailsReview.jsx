import axios from 'axios';
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import './DetailsReview.css';
import dayjs from 'dayjs';
import { img_poster } from '../../../../config/tmdb';

const DetailsReview = () => {
	const [reviews, setReviews] = useState({});
	const [allData, setAllData] = useState({});
	const params = useParams();

	const reviewid = params.reviewid || '';

	const id = reviews.media_id;
	const _media_type = reviews.media_type;

	const title = reviews?.media_title;
	const release_date = dayjs(allData?.release_date).format(
		'YYYY',
	);
	const air_date = dayjs(reviews?.created_at).format(
		'MMM D, YYYY',
	);

	const getData = useCallback(async () => {
		try {
			if (_media_type && id) {
				const response = await axios.get(
					`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}`,
				);
				const results = response.data;
				setAllData(results);
			}
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
	}, [_media_type, id]);

	const getReviewDetails = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/review/${reviewid}?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data;
			setReviews(results);
			console.log('REVIEWS DATA', results);
		} catch (err) {
			console.error(err, '<==== get Review Details ====>');
		}
	}, [reviewid]);

	useEffect(() => {
		getData();
	}, [getData]);

	useEffect(() => {
		getReviewDetails();
	}, [getReviewDetails]);

	return (
		<section className='container_section'>
			<div className='content_detailsReview'>
				<aside className='left'>
					<Link className='content_left'>
						<img
							src={`${img_poster}/${allData?.poster_path}`}
							alt=''
						/>
					</Link>
				</aside>
				<aside className='right'>
					<div className='wrap_card cardSeason cardReviews detailsReview'>
						<div className='des'>
							<div className='titleReviews'>
								<Link to={''}>
									<h3>{`${title} (${release_date})`}</h3>
								</Link>
								<p className='author'>
									Written by{' '}
									<Link to={''}>{reviews?.author}</Link> on
									{air_date}
								</p>
							</div>
							<div className='synopsis teaser'>
								<p>{reviews.content}</p>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</section>
	);
};

export default DetailsReview;
