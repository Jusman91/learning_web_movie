import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	img_500,
	unavailable,
} from '../../../config/config';
import './Seasons.css';
import Card from '../card/Card';
import dayjs from 'dayjs';
import Loading from '../../loading/Loading';

const Seasons = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [currentTvShowDetails, setTvShow] = useState({});
	const [seasons, setSeasons] = useState([]);
	const params = useParams();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos`,
			);
			const results = response.data;
			const seasons = results.seasons;
			setTvShow(results);
			setSeasons(seasons);
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
	};

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_media_type, id]);
	console.log(currentTvShowDetails);
	return (
		<>
			{isLoading ? (
				<Loading type='component' />
			) : (
				<section className='container_season'>
					{currentTvShowDetails && (
						<div className='header_content'>
							<img
								src={
									currentTvShowDetails.poster_path
										? `${img_500}/${currentTvShowDetails.poster_path}`
										: unavailable
								}
								alt='Poster'
							/>
							<div className='season_title'>
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
					)}
					<div className='content_tv_season'>
						{seasons &&
							seasons.length > 0 &&
							seasons.map((item, index) => (
								<Card
									key={index}
									season={item}
									title={currentTvShowDetails.name}
									link={`/details/${_media_type}/${id}/season/${item.season_number}`}
								/>
							))}
					</div>
				</section>
			)}
		</>
	);
};

export default Seasons;
