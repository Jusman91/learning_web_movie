import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './CastAndCrew.css';
import Loading from '../../loading/Loading';
import Pagiantion from '../pagination/Pagiantion';
import Card from '../../card/Card';
import {
	img_poster,
	unavailable,
} from '../../../config/tmdb';

const CastAndCrew = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [currentTvShowDetails, setTvShow] = useState({});
	const [crew, setCrew] = useState([]);
	const [cast, setCast] = useState([]);
	const params = useParams();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';
	const [departmentsActive, setDepartmentsActive] =
		useState('Art');
	const Departments = [
		'Art',
		'Camera',
		'Costume & Make-Up',
		'Directing',
		'Editing',
		'Lighting',
		'Production',
		'Sound',
		'Visual Effects',
		'Writing',
	];

	const [filterCrew, setFilterCrew] = useState();
	const [activePage, setActivePage] = useState(
		'active__pagination',
	);

	const filterResult = (value) => {
		const filteredCrew = crew.filter(
			(c) => c.department === value,
		);
		setFilterCrew(filteredCrew);
		setDepartmentsActive(value);
	};

	const itemsPerPage = 10;
	const [itemOffsetCast, setItemOffsetCast] = useState(0);
	const [itemOffsetCrew, setItemOffsetCrew] = useState(0);
	const endOffsetCast = itemOffsetCast + itemsPerPage;
	const endOffsetCrew = itemOffsetCrew + itemsPerPage;

	const currentItemsCast = useMemo(
		() => cast.slice(itemOffsetCast, endOffsetCast),
		[itemOffsetCast, endOffsetCast, cast],
	);

	const currentItemsCrew = useMemo(
		() => filterCrew?.slice(itemOffsetCrew, endOffsetCrew),
		[itemOffsetCrew, endOffsetCrew, filterCrew],
	);

	const pageCountCast = Math.ceil(
		cast.length / itemsPerPage,
	);
	const pageCountCrew = Math.ceil(
		filterCrew?.length / itemsPerPage,
	);
	console.log('pageCountCast', pageCountCast);

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
			console.log('credits', response);
			const crewResults = response.data.crew;
			const castResults = response.data.cast;
			setCrew(crewResults);
			setCast(castResults);
			setFilterCrew(
				crewResults?.filter((c) => c.department === 'Art'),
			);
			console.log('CREW', crewResults);
			console.log('CAST', castResults);
		} catch (err) {
			console.error(err, '<==== get credits gagal ====>');
		}
	};

	const getAggregateCreditsTv = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/tv/${id}/aggregate_credits?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			console.log('aggregate', response);
		} catch (err) {
			console.error(err, 'aggregateCreditsTv failed');
		}
	};

	const handlePageCast = (event) => {
		const newOffset =
			(event.selected * itemsPerPage) % cast.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`,
		);
		setItemOffsetCast(newOffset);
	};
	const handlePageCrew = (event) => {
		const newOffset =
			(event.selected * itemsPerPage) % filterCrew.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`,
		);
		setItemOffsetCrew(newOffset);
	};

	useEffect(() => {
		getData();
		getCredits();
		if (_media_type === 'tv') {
			getAggregateCreditsTv();
		}
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
									? `${img_poster}/${currentTvShowDetails.poster_path}`
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
								{_media_type === 'movie'
									? 'Cast'
									: 'Series Cast'}{' '}
								<span>{cast.length} </span>
							</h3>
							<div className='wrapper_profile'>
								{cast &&
									currentItemsCast.map((item, index) => (
										<Card key={index} castCrew={item} />
									))}
							</div>
							{
								<Pagiantion
									credits={handlePageCast}
									pageNum={pageCountCast}
									activenum={1}
								/>
							}
						</div>
						<div className='crew'>
							<h3>
								{_media_type === 'movie'
									? 'Crew'
									: 'Series Crew'}{' '}
								<span>{crew.length}</span>
							</h3>
							<ul>
								{Departments?.map((item, index) => (
									<li
										className={
											departmentsActive === item
												? 'list_departments list_departments_active'
												: 'list_departments'
										}
										onClick={() => filterResult(item)}
										key={index}>
										{item}
									</li>
								))}
							</ul>
							{crew && crew.length > 0 ? (
								<div className='wrapper_profile'>
									{currentItemsCrew?.map((item, index) => (
										<Card
											key={index}
											castCrew={item}
											link={`/person/${item.id}`}
										/>
									))}
								</div>
							) : (
								"There are no crew records added to Les Mystères de l'amour."
							)}
							{filterCrew?.length > 10 && (
								<Pagiantion
									credits={handlePageCrew}
									pageNum={pageCountCrew}
									activenum={1}
								/>
							)}
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default CastAndCrew;
