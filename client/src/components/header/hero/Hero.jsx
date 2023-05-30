import React from 'react';
import {
	img_backdrop,
	unavailable,
} from '../../../config/config';

const Hero = ({ detail }) => {
	return (
		<>
			<div className='wrapper_hero'>
				<img
					className='movie__backdrop'
					src={
						detail.backdrop_path
							? `${img_backdrop}/${detail.backdrop_path}`
							: unavailable
					}
					alt='Backdrop'
				/>
			</div>
			<div className='movie__intro__overlay'></div>
		</>
	);
};

export default Hero;
