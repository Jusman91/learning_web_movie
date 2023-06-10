import { Link } from 'react-router-dom';
import '../card/Card.css';
import { IoPlay } from 'react-icons/io5';
import {
	img_poster,
	img_profile,
	noProfile,
	unavailable,
} from '../../config/config';
import SvgCircle from '../elements/SvgCircle';

const Card = ({
	movie,
	link,
	trailers,
	selectMovie,
	trending,
	mediaType,
	search,
	season,
	title,
	castCrew,
}) => {
	if (movie) {
		const rating = movie.vote_average * 10;
		return (
			<>
				<Link to={link}>
					<div></div>
					<div className='card'>
						<div className='poster'>
							<img
								src={
									movie.poster_path
										? `${img_poster}/${movie.poster_path}`
										: unavailable
								}
								alt='poster'
							/>
						</div>
						<div className='card__details'>
							<div className='card__title'>
								{movie.original_title || movie.name}
							</div>
							<div className='card__runtime'>
								<h5>
									{movie.release_date ||
										movie.first_air_date}
								</h5>
							</div>
							<div className='card__language'>
								Language:{' '}
								<span>{movie.original_language}</span>
							</div>
							<div className='card__description'>
								{movie.overview?.length > 0
									? movie.overview.slice(0, 125) + '...'
									: "We don't have an overview translated in English. Help us expand our database by adding one."}
							</div>
						</div>
						<div className='rating__percent'>
							<SvgCircle rating={rating} />
							<div className='rating__number'>
								<h5>{Math.round(rating)}</h5>
								<span>%</span>
							</div>
						</div>
					</div>
				</Link>
			</>
		);
	}
	if (trailers) {
		return (
			<>
				<div className='trailers__card'>
					<div className='trailers__poster'>
						<img
							src={
								trailers.poster_path
									? `${img_poster}/${trailers.poster_path}`
									: unavailable
							}
							alt='poster'
						/>
					</div>
					<div className='btn__play__trailers'>
						<IoPlay
							onClick={() => selectMovie(trailers)}
							className='play__icon'
						/>
					</div>
				</div>
				<div className='trailers__details'>
					<div className='trailers__title'>
						{trailers.original_title || trailers.name}
					</div>
				</div>
			</>
		);
	}
	if (trending) {
		const rating = trending.vote_average * 10;
		const id = trending.id;
		const media_type = trending.media_type
			? trending.media_type
			: trending.type
			? trending.type
			: mediaType;
		let name = trending.original_title || trending.name;
		name = name.replace(/\s+/g, '-').toLowerCase();
		const url = `/details/${media_type}/${`${id}${'-'}${name}`}`;
		return (
			<>
				<Link to={url}>
					<div className='trending__card'>
						<div className='trending__poster'>
							<img
								src={
									trending.poster_path
										? `${img_poster}/${trending.poster_path}`
										: unavailable
								}
								alt='poster'
							/>
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
												: rating <= 44 && rating >= 1
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
				</Link>
			</>
		);
	}
	if (search) {
		const id = search.id;
		let name = search.original_title || search.name;
		name = name.replace(/\s+/g, '-').toLowerCase();
		const url = `/details/${mediaType}/${`${id}${'-'}${name}`}`;
		return (
			<div className='container_card'>
				{(mediaType === 'movie' || mediaType === 'tv') && (
					<Link to={url} className='wrap_card'>
						<div className='wrap_poster'>
							<img
								src={
									search.poster_path
										? `${img_poster}/${search.poster_path}`
										: unavailable
								}
								alt='poster'
							/>
						</div>
						<div className='des'>
							<div className='title'>
								<h4>
									{search.original_title || search.name}
								</h4>
								<p>
									{search.release_date ||
										search.first_air_date}
								</p>
							</div>
							<div className='synopsis'>
								{search.overview?.length > 0
									? search.overview?.slice(0, 130) + '...'
									: "We don't have an overview translated in English. Help us expand our database by adding one."}
							</div>
						</div>
					</Link>
				)}
				{mediaType === 'person' && (
					<div className='wrap_card'>
						<div className='wrap_poster'>
							<img
								src={
									search.profile_path
										? `${img_profile}/${search.profile_path}`
										: noProfile
								}
								alt='poster'
							/>
						</div>
						<div className='des'>
							<span>{search.name}</span>
							<ul>
								{search.known_for_department}
								{' • '}
								{search.known_for?.map((item, i) => (
									<li key={i}>
										{item.original_title ||
											item.original_name}
										{search.known_for?.length - 1 !== i &&
											', '}
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
				{mediaType === 'company' && (
					<div className='wrap_card'>
						<div className='wrap_poster'>
							<img
								src={
									search.logo_path
										? `${img_poster}/${search.logo_path}`
										: unavailable
								}
								alt='poster'
							/>
						</div>
						<div className='des'>
							<ul>
								<li>{search.name}</li>
								{search.origin_country && ','}
								<li>{search.origin_country}</li>
							</ul>
						</div>
					</div>
				)}
				{mediaType === 'collection' && (
					<div className='wrap_card'>
						<div className='wrap_poster'>
							<img
								src={
									search.poster_path
										? `${img_poster}/${search.poster_path}`
										: unavailable
								}
								alt='poster'
							/>
						</div>
						<div className='des'>
							<div className='title'>
								<h4>
									{search.original_title || search.name}
								</h4>
							</div>
							<div className='synopsis'>
								{search.overview?.length > 0
									? search.overview.slice(0, 175) + '...'
									: "We don't have an overview translated in English. Help us expand our database by adding one."}
							</div>
						</div>
					</div>
				)}
				{mediaType === 'keyword' && (
					<div className='keywords'>
						<span>{search.name}</span>
					</div>
				)}
			</div>
		);
	}
	// if (season) {
	// 	const id = season.id;
	// 	let seasonnumber = season.season_number;
	// 	const url = `/details/${mediaType}/${id}${seasonnumber}`;
	// 	return (
	// 		<div className='container_card'>
	// 			<div className='wrap_card cardSeason'>
	// 				<Link to={link}>
	// 					<div className='wrap_poster posterSeason'>
	// 						<img
	// 							src={
	// 								season.poster_path
	// 									? `${img_poster}/${season.poster_path}`
	// 									: unavailable
	// 							}
	// 							alt='poster'
	// 						/>
	// 					</div>
	// 				</Link>
	// 				<div className='des'>
	// 					<div className='title titleSeason'>
	// 						<Link
	// 							to={link}
	// 							style={{
	// 								textDecoration: 'none',
	// 								color: '#fff',
	// 							}}>
	// 							<h4>{season.name}</h4>
	// 						</Link>
	// 						<p>
	// 							{dayjs(season.air_date).format('YYYY')}
	// 							{' | '}
	// 							{`${season.episode_count} Episode`}
	// 						</p>
	// 					</div>
	// 					<div className='synopsis'>
	// 						<p>
	// 							{`Season ${
	// 								season.season_number
	// 							} of ${title} premiered on ${dayjs(
	// 								season.air_date,
	// 							).format('MMM D, YYYY')}`}
	// 						</p>
	// 						<br />
	// 						<p>{season.overview}</p>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }
	if (castCrew) {
		return (
			<div className='container_card'>
				<div className='wrap_card cardCastCrew'>
					<Link to={link} className='cast_profile'>
						<div className='wrap_poster profile'>
							<img
								src={
									castCrew.profile_path
										? `${img_poster}/${castCrew.profile_path}`
										: noProfile
								}
								alt='Profile'
							/>
						</div>
					</Link>
					<div className='character'>
						<Link to={link}>{castCrew.name}</Link>
						<div>{castCrew.character}</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Card;
