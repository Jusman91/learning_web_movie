import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import CardProfile from '../card/profile/CardProfile';
import './Credits.css';

const Credits = ({ id, _media_type }) => {
	const [cast, setCast] = useState([]);
	const [show, setShow] = useState(false);
	const listInnerRef = useRef();

	const onScroll = () => {
		if (listInnerRef.current) {
			const { scrollLeft } = listInnerRef.current;
			if (scrollLeft > 50) {
				setShow(true);
			} else {
				setShow(false);
			}
		}
	};

	const getCreditsMovie = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/movie/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const castResults = response.data.cast;
			console.log('MOVIE Credits', castResults);
			setCast(castResults);
		} catch (err) {
			console.error(
				err,
				'<==== get creditsMovie gagal ====>',
			);
		}
	};

	const getCreditsTvSeries = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/tv/${id}/aggregate_credits?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const castResults = response.data.cast;
			console.log('TV Credits', castResults);

			setCast(castResults);
		} catch (err) {
			console.error(err, '<==== get creditsTv gagal ====>');
		}
	};

	useEffect(() => {
		if (_media_type === 'tv') {
			getCreditsTvSeries();
		} else {
			getCreditsMovie();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='wrap_cast'>
			<h3>
				{_media_type === 'movie'
					? 'Top Billed Cast'
					: 'Series Cast'}
			</h3>

			<div
				className={
					show
						? 'wrapper_list is_hidden'
						: 'wrapper_list is_blur'
				}>
				<div
					className={
						cast.length > 7
							? 'container_flex scrollX'
							: 'container_flex'
					}
					onScroll={() => onScroll()}
					ref={listInnerRef}>
					{cast &&
						cast
							.slice(0, 11)
							.map((c, index) => (
								<CardProfile key={index} profile={c} />
							))}
					{cast.length > 11 && (
						<div className='goMore'>
							<Link
								to={`/details/${_media_type}/${id}/cast`}>
								Go{' '}
								<span>
									<HiArrowNarrowRight />
								</span>
							</Link>
						</div>
					)}
				</div>
			</div>
			<Link
				to={`/details/${_media_type}/${id}/cast`}
				className='go_castcrew'>
				<h4> Full Cast & Crew ⇨</h4>
			</Link>
		</div>
	);
};

export default Credits;
