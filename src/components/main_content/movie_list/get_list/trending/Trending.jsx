import axios from 'axios';
import { useEffect, useState } from 'react';
import Carousel from '../../../../carousel/Carousel';
import '../getList.css';

const Trending = () => {
	const [dataTrending, setDataTrending] = useState([]);
	const [timeWindow, setTimeWindow] = useState('day');

	useEffect(() => {
		const getTrending = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BASEURL}/trending/all/${timeWindow}?api_key=${process.env.REACT_APP_APIKEY}`,
				);
				const trending = response.data.results;
				setDataTrending(trending);
			} catch (err) {
				console.error(err);
			}
		};

		getTrending();
	}, [timeWindow]);
	console.log('trending', dataTrending);

	const handleTimeWindow = (value) => {
		setTimeWindow(value);
	};
	console.log('data', dataTrending);
	return (
		<section className='container_section'>
			<div className='header'>
				<h2>Trending</h2>
				<div className='list_content'>
					<ul>
						<li
							className={timeWindow === 'day' ? 'time' : ''}
							onClick={() => handleTimeWindow('day')}>
							Today
						</li>
						<li
							className={
								timeWindow === 'week' ? 'time' : ''
							}
							onClick={() => handleTimeWindow('week')}>
							This Week
						</li>
						<div className='_before'></div>
					</ul>
				</div>
			</div>
			<div className='content'>
				{dataTrending.length > 0 ? (
					<Carousel data={dataTrending} />
				) : (
					<h2>Movies Not Found</h2>
				)}
			</div>
		</section>
	);
};

export default Trending;
