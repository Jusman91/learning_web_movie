import axios from 'axios';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import Card from '../../card/Card';

const LatestList = () => {
	const [latestList, setLatestList] = useState([]);
	const [mediaType, setMediaType] = useState('movie');

	const handleMediaTypes = (value) => {
		setMediaType(value);
	};

	const responsive = {
		0: {
			items: 1,
		},
		512: {
			items: 3,
		},
		1024: {
			items: 4,
		},
		// 1200: {
		// 	items: 5,
		// },
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/movie/latest?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&append_to_response=videos`,
			);
			const results = response.data;
			console.log(response);
			setLatestList(results);
		} catch (err) {
			console.error(err, 'gagal fetching');
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaType]);
	console.log(latestList);
	return (
		<>
			<div className='container__latest__conten'>
				<div className='latest__conten__header'>
					<h2>Latest Trailers</h2>
				</div>
				<div className='latest__content__list'>
					<ul>
						<li
							onClick={() => handleMediaTypes('movie')}
							className={
								mediaType === 'movie' ? 'list__active' : ''
							}>
							Movie
						</li>
						<li
							onClick={() => handleMediaTypes('tv')}
							className={
								mediaType === 'tv' ? 'list__active' : ''
							}>
							Tv
						</li>
					</ul>
				</div>
			</div>
			<div className='container__slider'>
				<div>{latestList.overview}</div>
				{/* {latestList && latestList.length > 0 ? (
					<AliceCarousel
						disableDotsControls
						disableButtonsControls
						responsive={responsive}>
						{latestList &&
							latestList?.map((movie, index) => (
								<Card
									key={index}
									movie={movie}
									link={`/details/${movie.id}/${mediaType}`}
								/>
							))}
					</AliceCarousel>
				) : (
					<h2>Movies Not Found</h2>
				)} */}
			</div>
		</>
	);
};

export default LatestList;
