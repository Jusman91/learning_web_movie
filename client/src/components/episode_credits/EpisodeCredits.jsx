import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { img_500, unavailable } from '../../config/config';
import dayjs from 'dayjs';
import './EpisodeCredits.css';
import Card from '../main_content/card/Card';

const EpisodeCredits = () => {
	const [dataTvEpisode, setDataTvEpisode] = useState([]);

	const [cast, setCast] = useState([]);
	const [guestStars, setGuestStars] = useState([]);

	const params = useParams();
	// const navigate = useNavigate();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';
	const season_number = params.seasonnumber;
	const episode_number = params.episodenumber;

	const getDataTvEpisode = async (value) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}/season/${season_number}/episode/${episode_number}?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data;

			setDataTvEpisode(results);

			console.log('epsidaofdahifd', results);
		} catch (err) {
			console.error(err, 'GetDataTvSeason failed');
		}
	};

	const getCredits = async (value) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}/season/${season_number}/episode/${episode_number}/credits?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data;
			const cast = results.cast;
			const guestStars = results.guest_stars;
			console.log('credits episode', results);
			console.log('guest stars', guestStars);
			console.log('cast episode', cast);
			setCast(cast);
			setGuestStars(guestStars);
		} catch (err) {
			console.error(err, 'GetCredits failed');
		}
	};

	useEffect(() => {
		getDataTvEpisode();
		getCredits();
	}, []);
	return (
		<section className='container_season'>
			{dataTvEpisode && (
				<>
					<div className='header_content'>
						<img
							src={
								dataTvEpisode.still_path
									? `${img_500}/${dataTvEpisode.still_path}`
									: unavailable
							}
							alt='Poster'
						/>
						<div className='season_title'>
							<h1>
								<span>
									{season_number}x{episode_number}{' '}
								</span>
								{dataTvEpisode.name}{' '}
								<span>{`${' ('}${dayjs(
									dataTvEpisode.air_date,
								).format('YYYY')}${')'}`}</span>
							</h1>
							<Link
								to={`/details/${_media_type}/${id}/season/${season_number}/episode/${episode_number}`}>
								← Back to episode
							</Link>
						</div>
					</div>
					<div className='wrapper_parts'>
						<div className='part_cast'>
							<h3>
								Season Regular <span>{cast.length}</span>
							</h3>
							<div className='wrapper_profile'>
								{cast.map((c, i) => (
									<Card
										key={i}
										castCrew={c}
										link={`/person/${c.id}`}
									/>
								))}
							</div>
						</div>
						<div className='part_guestStars'>
							<h3>
								Guest Stars <span>{guestStars.length}</span>
							</h3>
							<div className='wrapper_profile'>
								{guestStars.map((c, i) => (
									<Card
										key={i}
										castCrew={c}
										link={`/person/${c.id}`}
									/>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</section>
	);
};

export default EpisodeCredits;
