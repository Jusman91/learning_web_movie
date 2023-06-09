import React from 'react';
import {
	img_poster,
	noPoster,
} from '../../../config/config';
import dayjs from 'dayjs';
import {
	MdBookmark,
	MdFavorite,
	MdList,
	MdOutlinePlayCircle,
	MdStar,
} from 'react-icons/md';
import './PartTopDetails.css';

const PartTopDitails = ({
	details,
	crew,
	setPlayTrailer,
}) => {
	const languageNames = new Intl.DisplayNames(['en'], {
		type: 'language',
	});

	const toHoursAndMinutes = (totalMinutes) => {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
	};

	function numberWithCommas(x) {
		return x
			.toString()
			.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	}

	const rating = details.vote_average * 10;
	const director = crew?.filter(
		(f) => f.job === 'Director',
	);
	const writer = crew?.filter(
		(f) =>
			f.job === 'Story' ||
			f.job === 'Screenplay' ||
			f.job === 'writer',
	);

	return (
		<section className='wrapper_top_content'>
			<div className='movie_detailLeft'>
				<img
					src={
						details.poster_path
							? `${img_poster}/${details.poster_path}`
							: noPoster
					}
					alt='poster'
				/>
				<div className='goStreaming'>Wach Now</div>
			</div>
			<div className='movie_detailRight'>
				<div className='top_part'>
					<h3 className='movie_name'>
						{`${details.title || details.name}`}
						<span>
							{` (${dayjs(details.release_date).format(
								'YYYY',
							)})`}
						</span>
					</h3>
					<span className='movie_tagline'>
						{details.tagline}
					</span>
				</div>
				<div className='middle_part'>
					<div className='items1'>
						<div className='movie__voteCount'>
							<div>Original Language: </div>
							<span>
								{languageNames?.of(
									details.original_language || 'en',
								)}
							</span>
						</div>
						<div className='movie__status'>
							<div>Status: </div>
							<span>{details.status}</span>
						</div>
						{details.runtime && (
							<div className='movie__runtime'>
								<div>Duration: </div>
								<span>
									{toHoursAndMinutes(details.runtime)}
								</span>
							</div>
						)}
						{details.episode_run_time?.length > 0 && (
							<div className='movie__runtime'>
								<div>Duration: </div>
								<span>
									{toHoursAndMinutes(
										details.episode_run_time,
									)}
								</span>
							</div>
						)}
						<div className='movie__releaseDate'>
							<div>Release date: </div>
							<span>
								{dayjs(
									details.release_date ||
										details.first_air_date,
								).format('MMM D, YYYY')}
							</span>
						</div>
						<div>
							<div>Budget: </div>
							{details.budget ? (
								<span>
									{numberWithCommas(
										`${'$'}${details.budget}${'.00'}`,
									)}
								</span>
							) : (
								<span>_</span>
							)}
						</div>
						<div>
							<div>Revenue: </div>
							{details.revenue ? (
								<span>
									{numberWithCommas(
										`${'$'}${details.revenue}${'.00'}`,
									)}
								</span>
							) : (
								<span>_</span>
							)}
						</div>
					</div>
					<div className='items2'>
						<div className='movie_genres'>
							{details.genres?.map((genre, index) => (
								<span
									key={index}
									className='movie_genre'
									id={genre.id}>
									{genre.name}
								</span>
							))}
						</div>
					</div>
					<ul className='items3'>
						<li>
							<div className='movie_rating_percent'>
								<svg>
									<circle cx='19' cy='20' r='20'></circle>
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
										cx='19'
										cy='20'
										r='20'></circle>
								</svg>
								<div className='movie_rating_number'>
									<h5>{Math.round(rating)}</h5>
									<span>%</span>
								</div>
							</div>
						</li>
						<li>
							<span>
								<MdList />
							</span>
						</li>
						<li>
							<span>
								<MdFavorite />
							</span>
						</li>
						<li>
							<span>
								<MdBookmark />
							</span>
						</li>
						<li>
							<span>
								<MdStar />
							</span>
						</li>
						<li onClick={setPlayTrailer}>
							<span>
								<MdOutlinePlayCircle />
							</span>
							Play Trailer
						</li>
					</ul>
					<div className='items4'>
						{director?.length > 0 && (
							<div>
								Director:{' '}
								{director.map((d, i) => (
									<span key={i}>
										{d.name}
										{director.length - 1 !== i && ', '}
									</span>
								))}
							</div>
						)}
						{writer?.length > 0 && (
							<div>
								Writer:{' '}
								{writer.map((d, i) => (
									<span key={i}>
										{d.name}
										{writer.length - 1 !== i && ', '}
									</span>
								))}
							</div>
						)}
						{details.created_by?.length > 0 && (
							<div>
								Creator:{' '}
								{details.created_by?.map((d, i) => (
									<span key={i}>
										{d.name}
										{details.created_by?.length - 1 !== i &&
											', '}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
				<div className='movie_detailRightBottom'>
					<div className='synopsisText'>Synopsis</div>
					<span>
						{details.overview?.length > 0
							? details.overview
							: "We don't have an overview translated in English. Help us expand our database by adding one."}
					</span>
				</div>
			</div>
		</section>
	);
};

export default PartTopDitails;
