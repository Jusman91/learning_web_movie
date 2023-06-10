import React from 'react';
import { Link } from 'react-router-dom';
import { img_poster } from '../../../config/config';
import { IoPlay } from 'react-icons/io5';
import './PartMiddleDetails.css';
import CardSeason from '../../card/season/CardSeason';
import CardReviews from '../../card/reviews/CardReviews';

const PartMiddleDetails = ({
	id,
	_media_type,
	season,
	currentDetail,
	reviews,
	dataMedia,
	handleList,
	media,
	show,
	onScroll,
	listInnerRef,
	mostPopular,
	videos,
	backdrops,
	posters,
	getKey,
	setSelectedItemName,
}) => {
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
								title={currentDetail}
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
							show
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
																setSelectedItemName(b.name);
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
