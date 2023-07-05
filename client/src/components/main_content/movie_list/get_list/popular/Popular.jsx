import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from '../../../../carousel/Carousel';
import '../getList.css';

const Popular = () => {
	const [dataPopular, setDataPopular] = useState([]);
	const [monetizationType, setMonetizationType] =
		useState('flatrate');
	const [media, setMedia] = useState('movie');
	const [releaseType, setReleaseType] = useState('3');

	useEffect(() => {
		const getPopular = async () => {
			try {
				let url = `${process.env.REACT_APP_BASEURL}/discover/${media}?api_key=${process.env.REACT_APP_APIKEY}&watch_region=ID`;

				if (media !== 'tv') {
					url = `${url}&with_watch_monetization_types=${monetizationType}&with_release_type=${releaseType}`;
				}

				const response = await axios.get(url);
				const results = response.data.results;
				setDataPopular(results);
			} catch (err) {
				console.error(err);
			}
		};
		// Mengatur posisi list aktif ke Streaming saat render awal atau reload
		if (dataPopular.length === 0) {
			handleMonetizationType('flatrate');
		}
		getPopular();
	}, [
		dataPopular.length,
		media,
		monetizationType,
		releaseType,
	]);

	const handleMedia = (value) => {
		setMedia(value);
		setReleaseType('');
		setMonetizationType('');
	};

	const handleMonetizationType = (value) => {
		setMonetizationType(value);
		setReleaseType('');
		setMedia('movie');
	};

	const handleReleaseType = (value) => {
		setReleaseType(value);
		setMedia('movie');
		setMonetizationType('');
	};

	console.log('dataPopular', dataPopular);

	return (
		<section className='container_section'>
			<div className='header'>
				<h2>What's Popular</h2>
				<div className='list_content'>
					<ul>
						<li
							className={
								monetizationType === 'flatrate'
									? 'time'
									: ''
							}
							onClick={() =>
								handleMonetizationType('flatrate')
							}>
							Streaming
						</li>
						<li
							className={media === 'tv' ? 'time' : ''}
							onClick={() => handleMedia('tv')}>
							On Tv
						</li>
						<li
							className={
								monetizationType === 'rent' ? 'time' : ''
							}
							onClick={() =>
								handleMonetizationType('rent')
							}>
							For Rent
						</li>
						<li
							className={releaseType === '3' ? 'time' : ''}
							onClick={() => handleReleaseType('3')}>
							In Theaters
						</li>
						<div className='_before'></div>
					</ul>
				</div>
			</div>
			<div className='content'>
				{dataPopular.length > 0 ? (
					<Carousel
						data={dataPopular}
						_media_type={media}
					/>
				) : (
					<h2>Movies Not Found</h2>
				)}
			</div>
		</section>
	);
};

export default Popular;
