import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import HeroContainer from './HeroContainer';

const Hero = () => {
	const [popularMovies, setPopularMovies] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/movie/popular?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data.results;
			setPopularMovies(results);
		} catch (err) {
			console.error(err, '<=== coba lagi boss ===>');
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			<Carousel
				showThumbs={false}
				showArrows={true}
				autoPlay={true}
				transitionTime={3}
				infiniteLoop={true}
				showStatus={false}
				showIndicators={false}>
				{popularMovies?.map((movie, index) => (
					<HeroContainer key={index} poster={movie} />
				))}
			</Carousel>
		</>
	);
};

export default Hero;
