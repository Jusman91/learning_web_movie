import axios from 'axios';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Card from '../card/CardContainer';
import '../movie_list/MovieList.css';

const MovieList = ({ movieType, type }) => {
	const [movieList, setMovieList] = useState([]);

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${movieType}/${type}?api_key=${process.env.REACT_APP_APIKEY}&page=1`,
			);
			const results = response.data.results;
			setMovieList(results);
		} catch (err) {
			console.error(err, '<=== MOVIES coba lagi boss ===>');
		}
	};

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className='movie__list'>
				<div className='movie__list__header'>
					<h2 className='list__title'>
						{`${type.toUpperCase()}${' '}${'('}${movieType.toUpperCase()}${')'}`}
					</h2>
				</div>
				<div>
					{movieList && movieList.length > 0 ? (
						<Carousel
							showThumbs={false}
							showArrows={true}
							autoPlay={true}
							transitionTime={3}
							infiniteLoop={true}
							showStatus={false}
							showIndicators={false}
							centerMode={true}
							centerSlidePercentage={20}>
							{movieList &&
								movieList?.map((movie, index) => (
									<Card
										key={index}
										movie={movie}
										link={`/details/${movie.id}/${movieType}`}
									/>
								))}
						</Carousel>
					) : (
						<h2>Movies Not Found</h2>
					)}
				</div>
			</div>
		</>
	);
};

export default MovieList;
