import React from 'react';
import './Hero.css';
import {
	img_backdrop,
	unavailable,
} from '../../../config/tmdb';
import { useSelector } from 'react-redux';

const Hero = () => {
	const { currentDetails } = useSelector(
		(state) => state.detailsMovieReducer,
	);

	return (
		<div className='wrapper_hero'>
			<img
				className='movie_backdrop'
				src={
					currentDetails?.backdrop_path
						? `${img_backdrop}/${currentDetails?.backdrop_path}`
						: unavailable
				}
				alt='Backdrop'
			/>
			<div className='overlay_hero'></div>
		</div>
	);
};

export default Hero;
