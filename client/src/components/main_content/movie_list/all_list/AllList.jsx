import axios from 'axios';
import { GiStarMedal } from 'react-icons/gi';
import { AiTwotoneLike } from 'react-icons/ai';
import { MdUpcoming } from 'react-icons/md';
import { RiSlideshow2Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import Card from '../../card/Card';
import './AllList.css';

const AllList = ({ mediaType, listCategory }) => {
	const [movieList, setMovieList] = useState([]);
	const [categorys, setCategorys] = useState('top_rated');

	const handleCategorys = (value) => {
		setCategorys(value);
	};

	const getMovies = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${mediaType}/${categorys}?api_key=${process.env.REACT_APP_APIKEY}&page=1`,
			);
			const results = response.data.results;
			setMovieList(results);
		} catch (err) {
			console.error(err, '<=== MOVIES coba lagi boss ===>');
		}
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

	useEffect(() => {
		getMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categorys]);
	return (
		<>
			<div className='container__main__content'>
				<div className='main__content__header'>
					<h1>{mediaType}</h1>
					<span>Choose Your Favorite Movies</span>
				</div>
				<div className='content__list'>
					<ul>
						<li
							onClick={() => handleCategorys('top_rated')}>
							<span>
								<GiStarMedal />
							</span>
							<span>Top Rated</span>
						</li>
						<li onClick={() => handleCategorys('popular')}>
							<span>
								<AiTwotoneLike />
							</span>
							<span>Popular</span>
						</li>
						{mediaType === 'movie' && (
							<li
								onClick={() => handleCategorys('upcoming')}>
								<span>
									<MdUpcoming />
								</span>
								<span>{listCategory}</span>
							</li>
						)}
						{mediaType === 'tv' && (
							<li
								onClick={() =>
									handleCategorys('airing_today')
								}>
								<span>
									<RiSlideshow2Fill />
								</span>
								<span>{listCategory}</span>
							</li>
						)}
					</ul>
				</div>
			</div>
			<div className='container__slider'>
				{movieList && movieList.length > 0 ? (
					<AliceCarousel
						disableDotsControls
						disableButtonsControls
						responsive={responsive}>
						{movieList &&
							movieList?.map((movie, index) => (
								<Card
									key={index}
									movie={movie}
									link={`/details/${movie.id}/${mediaType}`}
								/>
							))}
					</AliceCarousel>
				) : (
					<h2>Movies Not Found</h2>
				)}
			</div>
		</>
	);
};

export default AllList;
