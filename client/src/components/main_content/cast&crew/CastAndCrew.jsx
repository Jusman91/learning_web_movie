import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	img_500,
	unavailable,
} from '../../../config/config';
import dayjs from 'dayjs';
import './CastAndCrew.css';
import Card from '../card/Card';
import Loading from '../../loading/Loading';

const CastAndCrew = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [currentTvShowDetails, setTvShow] = useState({});
	const [crew, setCrew] = useState([]);
	const [cast, setCast] = useState([]);
	const params = useParams();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos`,
			);
			const results = response.data;
			setTvShow(results);
		} catch (err) {
			console.error(err, 'get data gagal');
		}
	};

	const getCredits = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			console.log(response);
			const crewResults = response.data.crew;
			const castResults = response.data.cast;
			setCrew(crewResults);
			setCast(castResults);
			console.log('CREW', crewResults);
			console.log('CAST', castResults);
		} catch (err) {
			console.error(err, '<==== get credits gagal ====>');
		}
	};

	useEffect(() => {
		getData();
		getCredits();
		window.scrollTo(0, 0);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, _media_type]);

	return (
		<>
			{isLoading ? (
				<Loading type='component' />
			) : (
				<section className='container_cast__crew'>
					<div className='header_content'>
						<img
							src={
								currentTvShowDetails.poster_path
									? `${img_500}/${currentTvShowDetails.poster_path}`
									: unavailable
							}
							alt='Poster'
						/>
						<div className='cast__crew_title'>
							<h1>
								{currentTvShowDetails.name}{' '}
								<span>{`${' ('}${dayjs(
									currentTvShowDetails.first_air_date,
								).format('YYYY')}${')'}`}</span>
							</h1>
							<Link to={`/details/${_media_type}/${id}`}>
								← Back to main
							</Link>
						</div>
					</div>
					<div className='content_cast__crew'>
						<div className='cast'>
							<h3>
								Series Cast <span>{cast.length} </span>
							</h3>
							<div className='wrapper_profile'>
								{cast &&
									cast.map((item, index) => (
										<Card key={index} castCrew={item} />
									))}
							</div>
						</div>
						<div className='crew'>
							<h3>
								Series Crew <span>{crew.length}</span>
							</h3>
							{crew && crew.length > 0 ? (
								<div className='wrapper_profile'>
									{crew &&
										crew.map((item, index) => (
											<Card key={index} castCrew={item} />
										))}
								</div>
							) : (
								"There are no crew records added to Les Mystères de l'amour."
							)}
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default CastAndCrew;
