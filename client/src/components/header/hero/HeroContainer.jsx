import { Link } from 'react-router-dom';
import {
	HiInformationCircle,
	HiPlay,
} from 'react-icons/hi';
import heroImg from '../../../asset/hero/hero.jpg';
import '../hero/Hero.css';
import { img_1280, img_500 } from '../../../config/config';

const HeroContainer = ({
	poster,
	selectTrailers,
	mediaType,
}) => {
	if (poster) {
		const rating = poster.vote_average * 10;
		const media_type = poster.media_type
			? poster.media_type
			: mediaType;
		return (
			<>
				<div className='posterImage'>
					<img
						src={`${img_1280}${poster.backdrop_path}`}
						alt='poster'
					/>
				</div>
				<div className='hero__overlay'>
					<div className='posterImage__overlay'>
						<div className='overlay__left'>
							<div className='posterImage__title'>
								{poster.original_title || poster.name}
							</div>
							<div className='posterImage__runtime'>
								<div>
									{poster.release_date ||
										poster.first_air_date}
								</div>
								<div className='rating__percent'>
									<svg>
										<circle cx='20' cy='20' r='20'></circle>
										<circle
											style={{
												stroke: `${
													rating >= 80
														? '#57e32c'
														: rating <= 79 && rating >= 68
														? '#b7dd29'
														: rating <= 67 && rating >= 56
														? '#ffe234'
														: rating <= 55 && rating >= 45
														? '#ffa534'
														: rating <= 44 && rating >= 0
														? '#ff4545'
														: ''
												}`,
												strokeDashoffset: `calc(130 - (130 * ${Math.round(
													rating,
												)}) / 100)`,
											}}
											cx='20'
											cy='20'
											r='20'></circle>
									</svg>
									<div className='rating__number'>
										<h5>{Math.round(rating)}</h5>
										<span>%</span>
									</div>
								</div>
							</div>
							<div className='posterImage__description'>
								{poster.overview &&
									poster.overview.slice(0, 300) + '...'}
							</div>
							<div className='posterImage__icons'>
								<Link
									to={`/details/${poster.id}/${media_type}`}>
									<div className='details__icon'>
										<HiInformationCircle />
									</div>
								</Link>
								<div className='trailers__icon'>
									<HiPlay
										onClick={() => selectTrailers(poster)}
									/>
								</div>
							</div>
						</div>
						<div className='overlay__right'>
							<div className='__items'>
								<img
									src={`${img_500}${poster.poster_path}`}
									alt='poster'
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
						<img src={heroImg} alt='poster' />
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

export default HeroContainer;
