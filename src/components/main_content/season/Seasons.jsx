import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Seasons.css';
import Loading from '../../loading/Loading';
import ContentHeader from '../../header/ContentHeader';
import CardSeason from '../../card/season/CardSeason';

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
			console.log('RESULTS DATA', results);
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
				<section className='container_section'>
					{currentTvShowDetails && (
						<ContentHeader
							allData={currentTvShowDetails}
							_media_type={_media_type}
							id={id}
						/>
					)}
					<div className='content_tv_season'>
						{seasons &&
							seasons.length > 0 &&
							seasons.map((item, index) => (
								<CardSeason
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
