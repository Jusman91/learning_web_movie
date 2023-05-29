import axios from 'axios';
import { useEffect, useState } from 'react';
import {
	Link,
	useNavigate,
	useParams,
} from 'react-router-dom';
import {
	img_500,
	unavailable,
} from '../../../../config/config';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import dayjs from 'dayjs';
import CardDetailsTvSeason from '../../card/season/CardDetailsTvSeason';
import './DetailsTvSeason.css';
import Card from '../../card/Card';

const DetailsTvSeason = () => {
	const [dataTvSeason, setDataTvSeason] = useState([]);
	const [dataTvEpisode, setDataTvEpisode] = useState([]);
	const [episodes, setEpisodes] = useState([]);
	const [episodeNum, setEpisodeNum] = useState([1]);
	const [crew, setCrew] = useState([]);
	const [guestStars, setGuestStars] = useState([]);
	const [episodesImages, setEpisodesImages] = useState([]);
	const params = useParams();
	const navigate = useNavigate();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';
	const season_number = params.seasonnumber;
	const director = crew.filter((c) => c.job === 'Director');
	const writer = crew.filter((c) => c.job === 'Writer');

	const getDataTvSeason = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}/season/${season_number}?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			console.log('TV SEASON', response);
			const results = response.data;
			const episodes = results.episodes;
			const episodesNum = episodes.map((episode) => {
				return episode.episode_number;
			});
			setDataTvSeason(results);
			setEpisodes(episodes);
			setEpisodeNum(episodesNum);
		} catch (err) {
			console.error(err, 'GetDataTvSeason failed');
		}
	};
	const getDataTvEpisode = async (value) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}/season/${season_number}/episode/${episodeNum}?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data;
			const crew = results.crew;
			const guestStars = results.guest_stars;
			// setDataTvEpisode(results);
			setCrew(crew);
			setGuestStars(guestStars);
			console.log('epsidaofdahifd', results);
		} catch (err) {
			console.error(err, 'GetDataTvSeason failed');
		}
	};
	const getDataTvEpisodeImages = async (value) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}/season/${season_number}/episode/${episodeNum}/images?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data;
			const stills = results.stills;
			console.log('img epsode', results);
			setEpisodesImages(stills);
		} catch (err) {
			console.error(err, 'GetDataTvSeason failed');
		}
	};

	const handleExpand = (value) => {
		setEpisodeNum(value);

		navigate(
			`/details/${_media_type}/${id}/season/${season_number}/episode/${value}`,
		);
	};

	useEffect(() => {
		getDataTvSeason();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		getDataTvEpisode();
		getDataTvEpisodeImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_media_type, id, season_number, episodeNum]);
	console.log('TV season', dataTvSeason);
	// console.log('DataEpisode', dataTvEpisode);
	// console.log('crew', crew);
	// console.log('guest start', guestStars);
	return (
		<section className='container_season'>
			{dataTvSeason && episodes.length > 0 && (
				<>
					<div className='header_content'>
						<img
							src={
								dataTvSeason.poster_path
									? `${img_500}/${dataTvSeason.poster_path}`
									: unavailable
							}
							alt='Poster'
						/>
						<div className='season_title'>
							<h1>
								{dataTvSeason.name}{' '}
								<span>{`${' ('}${dayjs(
									dataTvSeason.air_date,
								).format('YYYY')}${')'}`}</span>
							</h1>
							<Link
								to={`/details/${_media_type}/${id}/season`}>
								← Back to season list
							</Link>
						</div>
					</div>

					<div className='content_detailsTvSeason'>
						<h3>
							Episodes <span>{episodes.length}</span>
						</h3>

						{episodes &&
							episodes.map((episode, i) => (
								<div
									key={i}
									className='wrapper_cardDetailsTvSeason'>
									<CardDetailsTvSeason episodes={episode} />
									<div
										className={
											episodeNum === episode.episode_number
												? 'wrapper_btn_expand hidden'
												: 'wrapper_btn_expand'
										}>
										<button
											type='button'
											className='btn_expand'
											onClick={() =>
												handleExpand(episode.episode_number)
											}>
											<span>
												<BsFillArrowDownCircleFill />
											</span>
											Expand {episode.episode_number}
										</button>
									</div>
									{episodeNum ===
										episode.episode_number && (
										<div className='expanded_wrapper'>
											<ul className='episode_shortcut_bar'>
												<li title='Videos'>Videos</li>
												<li title='Images'>Images</li>
												<li title='Changes'>Changes</li>
												<li title='Report'>Report</li>
											</ul>

											<div className='expanded_info'>
												<div className='crew'>
													<h3>
														Crew <span>{crew.length}</span>
													</h3>
													<p>
														<strong>Directed by: </strong>
														{director?.length > 0
															? director.map((d, i) => (
																	<Link key={i}>
																		{d.name}
																		{director.length - 1 !==
																			i && ', '}
																	</Link>
															  ))
															: 'No director has been added.'}
													</p>

													<p>
														<strong>Written by: </strong>
														{writer?.length > 0
															? writer.map((w, i) => (
																	<Link key={i}>
																		{w.name}
																		{writer.length - 1 !==
																			i && ', '}
																	</Link>
															  ))
															: 'No writer has been added.'}
													</p>
												</div>
												<div className='guest_starts'>
													<div className='wrapper_title'>
														<h3>
															Guest Start{' '}
															<span>
																{guestStars &&
																	guestStars.length}
															</span>
														</h3>
														<Link
															to={`/details/${_media_type}/${id}/season/${season_number}/episode/${episodeNum}/cast`}>
															Full Cast & Crew
														</Link>
													</div>
													<div className='people_credits'>
														{guestStars &&
															guestStars.map((g, i) => (
																<Card
																	key={i}
																	castCrew={g}
																	link={`/person/${g.id}`}
																/>
															))}
													</div>
												</div>
											</div>
											<div className='expanded_info_epsImg'>
												<div className='wrapper_title'>
													<h3>
														Episode Images{' '}
														<span>
															{episodesImages.length}
														</span>
													</h3>
													<Link>
														View All Episode Images
													</Link>
												</div>
												<div className='episide_images'>
													{episodesImages.length > 0 &&
														episodesImages.map(
															(epImg, i) => (
																<img
																	key={i}
																	src={`${img_500}/${epImg.file_path}`}
																	alt={
																		episode.name ||
																		episode.original_title
																	}
																/>
															),
														)}
												</div>
											</div>
										</div>
									)}
								</div>
							))}
					</div>
				</>
			)}
		</section>
	);
};

export default DetailsTvSeason;
