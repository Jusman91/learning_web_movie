import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoPlay } from 'react-icons/io5';
import './PartMiddleDetails.css';
import CardSeason from '../../card/season/CardSeason';
import CardReviews from '../../card/reviews/CardReviews';
import { img_poster } from '../../../config/tmdb';
import { useDispatch, useSelector } from 'react-redux';
import {
	setKeyVideos,
	setMedia,
	setPlayMedia,
	setScrolled,
	setTitleVideos,
} from '../../../config/redux/action';

const PartMiddleDetails = ({ id, _media_type }) => {
	const dispatch = useDispatch();
	const {
		currentDetails,
		reviews,
		videos,
		backdrops,
		posters,
		media,
		onScrolled,
	} = useSelector((state) => state.detailsMovieReducer);
	const season = currentDetails.seasons?.slice(-1);

	const handleList = (value) => {
		dispatch(setMedia(value));
		const listInnerElement = listInnerRef.current;
		listInnerElement.scrollLeft = 0;
		dispatch(setScrolled(false));
	};

	// mengambil index pertama tiap-tiap data
	const mostPopular = [
		...videos.slice(-1),
		...backdrops.slice(0, 1),
		...posters.slice(0, 1),
	];

	// membalikan index pada data
	const videosReversed = [...videos].reverse();

	// menambahkan type ditiap-tiap state
	const dataMedia = [
		{ type: 'most popular', items: [...mostPopular] },
		{ type: 'videos', items: [...videosReversed] },
		{ type: 'backdrops', items: [...backdrops] },
		{ type: 'posters', items: [...posters] },
	];

	const listInnerRef = useRef();
	const onScroll = () => {
		if (listInnerRef.current) {
			const { scrollLeft } = listInnerRef.current;
			if (scrollLeft > 50) {
				dispatch({ type: 'ON_SCROLL', payload: true });
			} else {
				dispatch({ type: 'ON_SCROLL', payload: false });
			}
		}
	};

	let className = () => {
		if (media === 'most popular') {
			return mostPopular.length > 2
				? 'container_flex scrollX'
				: 'container_flex';
		} else if (media === 'videos') {
			return videos.length > 2
				? 'container_flex scrollX'
				: 'container_flex';
		} else if (media === 'backdrops') {
			return backdrops.length > 2
				? 'container_flex scrollX'
				: 'container_flex';
		} else if (media === 'posters') {
			return posters.length > 6
				? 'container_flex scrollX'
				: 'container_flex';
		} else {
			return '';
		}
	};

	const getKey = (value) => {
		dispatch(setKeyVideos(value));
		dispatch(setPlayMedia(true));
	};

	const getTitleVideos = (value) => {
		dispatch(setTitleVideos(value));
	};
	return (
		<div>
			{season && season.length > 0 && (
				<div className='wrap_current_season'>
					<h3>Current Season</h3>
					{season?.map((item, index) => (
						<div
							key={index}
							className='wrapper_card_season'>
							<CardSeason
								season={item}
								title={currentDetails.name}
							/>
						</div>
					))}
					<Link
						to={`/details/${_media_type}/${id}/season`}
						className='all_seasons'>
						<h4>View All Seasons ⇨</h4>
					</Link>
				</div>
			)}
			{reviews && (
				<div className='wrap_current_season'>
					<h3>Sosial</h3>
					<div className='wrapper_card_season'>
						<CardReviews reviews={reviews} />
					</div>
					<Link
						to={`/details/${_media_type}/${id}/reviews`}
						className='all_seasons'>
						<h4>Read All Reviews ⇨</h4>
					</Link>
				</div>
			)}
			{dataMedia && (
				<div className='wrap_content_media'>
					<div className='menu'>
						<h3>Media</h3>
						<ul>
							{dataMedia.map((list, i) => (
								<li
									className={
										media === list.type ? 'list_media' : ''
									}
									key={i}
									onClick={() => handleList(list.type)}>
									{list.type}{' '}
									<span>
										{list.type !== 'most popular'
											? list.items.length
											: ''}
									</span>
								</li>
							))}

							<div className='li_before'></div>
						</ul>
						<div className='view_all'>
							{media !== 'most popular' && (
								<Link
									to={`/details/${_media_type}/${id}/images/${media}`}>{`view all ${media}`}</Link>
							)}
						</div>
					</div>
					<div
						className={
							onScrolled
								? 'wrapper_list is_hidden'
								: 'wrapper_list is_blur'
						}>
						<div
							className={className()}
							onScroll={onScroll}
							ref={listInnerRef}>
							{dataMedia &&
								dataMedia.map((data, i) => {
									if (media === data.type) {
										return data.items
											?.slice(0, 7)
											.map((b, index) => (
												<div
													key={`${i}-${index}`}
													className={
														b.key
															? 'trailer_poster'
															: b.aspect_ratio > 1
															? 'backdrops'
															: b.aspect_ratio < 1
															? 'posters'
															: ''
													}>
													<img
														src={
															b.key
																? `https://img.youtube.com/vi/${b.key}/hqdefault.jpg`
																: `${img_poster}/${b.file_path}`
														}
														alt='Posters'
													/>
													{b.key && (
														<div
															className='btn_play'
															onClick={() => {
																getTitleVideos(b.name);
																getKey(b.key);
															}}>
															<IoPlay className='icon_play' />
														</div>
													)}
												</div>
											));
									}
									return null; // Kembalikan null jika media tidak cocok dengan data.type
								})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PartMiddleDetails;
