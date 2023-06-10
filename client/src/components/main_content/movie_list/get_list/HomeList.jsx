import axios from 'axios';
import { GiStarMedal } from 'react-icons/gi';
import { AiTwotoneLike } from 'react-icons/ai';
import {
	IoIosArrowBack,
	IoIosArrowForward,
} from 'react-icons/io';
import { MdUpcoming } from 'react-icons/md';
import { RiSlideshow2Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import './HomeList.css';
import Card from '../../../card/Card';

const HomeList = ({ mediaType, listCategory }) => {
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

	const renderNextButton = () => {
		return (
			<IoIosArrowForward
				style={{
					position: 'absolute',
					right: '-2%',
					top: '35%',
					fontSize: '40px',
					cursor: 'pointer',
				}}
			/>
		);
	};

	const renderPrevButton = () => {
		return (
			<IoIosArrowBack
				style={{
					position: 'absolute',
					left: '-2%',
					top: '35%',
					fontSize: '40px',
					cursor: 'pointer',
				}}
			/>
		);
	};

	const items = movieList.map((movie, index) => {
		let name = movie.original_title || movie.name;
		name = name.replace(/\s+/g, '-').toLowerCase();
		const url = `/details/${mediaType}/${`${
			movie.id
		}${'-'}${name}`}`;
		return <Card key={index} movie={movie} link={url} />;
	});

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
	};

	useEffect(() => {
		getMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categorys]);
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
				{movieList && movieList.length > 0 ? (
					<AliceCarousel
						animationDuration={600}
						mouseTracking
						disableDotsControls
						renderNextButton={renderNextButton}
						renderPrevButton={renderPrevButton}
						responsive={responsive}
						items={items}
					/>
				) : (
					<h2>Movies Not Found</h2>
				)}
			</div>
		</>
	);
};

export default HomeList;
