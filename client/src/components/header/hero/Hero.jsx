import { Link } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';
import './Hero.css';
import HeroImg from '../../../asset/hero/hero.jpg';
import {
	img_backdrop,
	img_poster,
	noPoster,
	unavailable,
} from '../../../config/tmdb';
import SvgCircle from '../../elements/SvgCircle';

const Hero = ({ data, link }) => {
	if (data) {
		const getRoundedRating = () => {
			const voteAverage = data.vote_average;
			if (voteAverage && typeof voteAverage === 'number') {
				const rating = voteAverage * 10;
				return Math.round(rating);
			}
			return 0;
		};
		const rating = getRoundedRating();
		return (
			<>
				<div className='posterImage'>
					<img
						src={
							data.backdrop_path
								? `${img_backdrop}/${data.backdrop_path}`
								: unavailable
						}
						alt='data'
					/>
				</div>
				<div className='hero__overlay'>
					<div className='posterImage__overlay'>
						<div className='overlay__left'>
							<div className='posterImage__title'>
								{data.original_title || data.name}
							</div>
							<div className='posterImage__runtime'>
								<div>
									{data.release_date || data.first_air_date}
								</div>
								<div className='rating__percent'>
									<SvgCircle rating={rating} />
									<div className='rating__number'>
										<h5>{rating}</h5>
										<span>%</span>
									</div>
								</div>
							</div>
							<div className='posterImage__description'>
								{data.overview.length > 0
									? data.overview
									: "We don't have an overview translated in English. Help us expand our database by adding one."}
							</div>
							<div className='posterImage__icons'>
								<Link to={link}>
									<div className='details__icon'>
										<HiInformationCircle />
									</div>
								</Link>
							</div>
						</div>
						<div className='overlay__right'>
							<div className='__items'>
								<img
									src={
										data.poster_path
											? `${img_poster}/${data.poster_path}`
											: noPoster
									}
									alt='Poster'
								/>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<section className='container__hero'>
					<div className='hero__img'>
						<img src={HeroImg} alt='Backdrops' />
					</div>
					<div className='overlay'>
						<div className='logo__text'>
							<span className='logo__text__s'>S</span>
							<span className='logo__text__3'>3</span>
						</div>
						<div className='text__hero'>
							<h1>Search, Save and Share</h1>
							<span>The Movies You Want To Watch</span>
						</div>
					</div>
				</section>
			</>
		);
	}
};

export default Hero;
