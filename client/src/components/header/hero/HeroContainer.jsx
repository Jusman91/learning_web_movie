import { Link } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import '../hero/Hero.css';

const Hero = ({ poster }) => {
	return (
		<>
			<Link
				style={{
					textDecoration: 'none',
					color: 'white',
				}}
				to={`/movie/${poster.id}`}>
				<div className='posterImage'>
					<img
						src={`${process.env.REACT_APP_BASEIMGURL}${poster.backdrop_path}`}
						alt='poster'
					/>
				</div>
				<div className='posterImage__overlay'>
					<div className='posterImage__title'>
						{poster.original_title}
					</div>
					<div className='posterImage__runtime'>
						<h4>{poster.release_date}</h4>
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
};

export default Hero;
