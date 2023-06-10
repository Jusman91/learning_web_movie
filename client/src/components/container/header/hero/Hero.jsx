import React from 'react';
import {
	img_backdrop,
	unavailable,
} from '../../../config/config';
import './Hero.css';

const Hero = ({ detail }) => {
	return (
		<div className='wrapper_hero'>
			<img
				className='movie_backdrop'
				src={
					detail.backdrop_path
						? `${img_backdrop}/${detail.backdrop_path}`
						: unavailable
				}
				alt='Backdrop'
			/>
			<div className='overlay_hero'></div>
		</div>
	);
};

export default Hero;
