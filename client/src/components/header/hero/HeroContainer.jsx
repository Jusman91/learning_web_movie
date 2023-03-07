import { Link } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import heroImg from '../../../asset/hero/hero.jpg';
import '../hero/Hero.css';

const HeroContainer = ({ poster, hero }) => {
	if (poster) {
		return (
			<>
				<Link
					style={{
						textDecoration: 'none',
						color: 'white',
					}}
					to={`/details/${poster.id}/${poster.media_type}`}>
					<div className='posterImage'>
						<img
							src={`${process.env.REACT_APP_BASEIMGURL}${poster.backdrop_path}`}
							alt='poster'
						/>
					</div>
					<div className='posterImage__overlay'>
						<div className='posterImage__title'>
							{poster.original_title ||
								poster.original_name}
						</div>
						<div className='posterImage__runtime'>
							<h4>
								{poster.release_date ||
									poster.first_air_date}
							</h4>
							<div className='posterImage__rating'>
								<span>{poster.vote_average}</span>
								<div className='icon__rating'>
									<BsStarFill />
								</div>
							</div>
						</div>
						<div className='posterImage__description'>
							{poster.overview}
						</div>
					</div>
				</Link>
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
