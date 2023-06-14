import axios from 'axios';
import { GiStarMedal } from 'react-icons/gi';
import { AiTwotoneLike } from 'react-icons/ai';
import { MdUpcoming } from 'react-icons/md';
import { RiSlideshow2Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import './HomeList.css';
import Carousel from '../../../carousel/Carousel';

const HomeList = ({ mediaType, listCategory }) => {
	const [movieList, setMovieList] = useState([]);
	const [categorys, setCategorys] = useState('top_rated');

	const handleCategorys = (value) => {
		setCategorys(value);
	};

	useEffect(() => {
		const getMovies = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BASEURL}/${mediaType}/${categorys}?api_key=${process.env.REACT_APP_APIKEY}&page=1`,
				);
				const results = response.data.results;
				setMovieList(results);
			} catch (err) {
				console.error(
					err,
					'<=== MOVIES coba lagi boss ===>',
				);
			}
		};

		getMovies();
	}, [categorys, mediaType]);

	return (
		<>
			<div className='container__main__content'>
				<div className='main__content__header'>
					<h2>{mediaType}</h2>
					<span>Choose Your Favorite {mediaType}</span>
				</div>
				<div className='content__list'>
					<ul>
						<li
							onClick={() => handleCategorys('top_rated')}
							className={
								categorys === 'top_rated'
									? 'list__active'
									: ''
							}>
							<div>
								<span className='list__icon'>
									<GiStarMedal />
								</span>
								<span className='list__text'>
									Top Rated
								</span>
							</div>
						</li>
						<li
							onClick={() => handleCategorys('popular')}
							className={
								categorys === 'popular'
									? 'list__active'
									: ''
							}>
							<div>
								<span className='list__icon'>
									<AiTwotoneLike />
								</span>
								<span className='list__text'>Popular</span>
							</div>
						</li>
						{mediaType === 'movie' && (
							<li
								onClick={() => handleCategorys('upcoming')}
								className={
									categorys === 'upcoming'
										? 'list__active'
										: ''
								}>
								<div>
									<span className='list__icon'>
										<MdUpcoming />
									</span>
									<span className='list__text'>
										{listCategory}
									</span>
								</div>
							</li>
						)}
						{mediaType === 'tv' && (
							<li
								onClick={() =>
									handleCategorys('airing_today')
								}
								className={
									categorys === 'airing_today'
										? 'list__active'
										: ''
								}>
								<div>
									<span className='list__icon'>
										<RiSlideshow2Fill />
									</span>
									<span className='list__text'>
										{listCategory}
									</span>
								</div>
							</li>
						)}
						<div className='indicator'></div>
					</ul>
				</div>
			</div>
			<div className='container__slider'>
				{movieList ? (
					<Carousel
						data={movieList}
						_media_type={mediaType}
					/>
				) : (
					<h2>Movies Not Found</h2>
				)}
			</div>
		</>
	);
};

export default HomeList;
