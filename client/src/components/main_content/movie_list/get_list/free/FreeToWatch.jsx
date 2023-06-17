import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from '../../../../carousel/Carousel';
import '../getList.css';

const FreeToWatch = () => {
	const [dataFreeToWatch, setDataFreeToWatch] = useState(
		[],
	);
	const [media, setMedia] = useState('movie');

	useEffect(() => {
		const getTrending = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BASEURL}/discover/${media}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&watch_region=ID&with_watch_monetization_types=free`,
				);
				const results = response.data.results;
				setDataFreeToWatch(results);
			} catch (err) {
				console.error(err);
			}
		};

		getTrending();
	}, [media]);

	const handleMedia = (value) => {
		setMedia(value);
	};
	console.log('dataFree', dataFreeToWatch);
	return (
		<section className='container_section'>
			<div className='header'>
				<h2>Free To Watch</h2>
				<div className='list_content'>
					<ul>
						<li
							className={media === 'movie' ? 'time' : ''}
							onClick={() => handleMedia('movie')}>
							Movies
						</li>
						<li
							className={media === 'tv' ? 'time' : ''}
							onClick={() => handleMedia('tv')}>
							TV
						</li>
						<div className='_before'></div>
					</ul>
				</div>
			</div>
			<div className='content'>
				{dataFreeToWatch ? (
					<Carousel
						data={dataFreeToWatch}
						_media_type={media}
					/>
				) : (
					<h2>Movies Not Found</h2>
				)}
			</div>
		</section>
	);
};

export default FreeToWatch;
