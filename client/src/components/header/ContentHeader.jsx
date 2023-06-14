import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import './ContentHeader.css';
import { img_poster, noPoster } from '../../config/tmdb';

const ContentHeader = ({ allData, _media_type, id }) => {
	const title = allData.name
		? allData.name
		: allData.original_name || allData.title
		? allData.title
		: allData.original_title;
	const releaseDate =
		allData.release_date || allData.first_air_date;

	return (
		<div className='header_content'>
			<img
				src={
					allData.poster_path
						? `${img_poster}/${allData.poster_path}`
						: noPoster
				}
				alt='Poster'
			/>
			<div className='title'>
				<h1>
					{title}{' '}
					<span>{`${' ('}${dayjs(releaseDate).format(
						'YYYY',
					)}${')'}`}</span>
				</h1>
				<Link to={`/details/${_media_type}/${id}`}>
					← Back to main
				</Link>
			</div>
		</div>
	);
};

export default ContentHeader;
