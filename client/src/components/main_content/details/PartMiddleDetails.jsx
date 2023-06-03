import React from 'react';
import { Link } from 'react-router-dom';
import CardSeason from '../card/season/CardSeason';

const PartMiddleDetails = ({
	id,
	_media_type,
	season,
	currentDetail,
	reviews,
}) => {
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
						<CardSeason reviews={reviews} />
					</div>
					<Link
						to={`/details/${_media_type}/${id}/reviews`}
						className='all_seasons'>
						<h4>Read All Reviews ⇨</h4>
					</Link>
				</div>
			)}
		</div>
	);
};

export default PartMiddleDetails;
