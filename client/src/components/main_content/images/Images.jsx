import axios from 'axios';
import React, {
	useCallback,
	useEffect,
	useState,
} from 'react';
import { useParams } from 'react-router-dom';
import './Images.css';
import TrailerPlayer from '../movie_list/trailers/TrailerPlayer';
import List from '../../list/List';
import CardImages from '../../card/images/CardImages';
import ContentHeader from '../../container/header/ContentHeader';

const Images = () => {
	const params = useParams();
	const id = params.movieid || '';
	const _media_type = params.mediatype || '';
	const type = params.typemedia || '';
	let images_language = params.image_language || '';
	const [details, setDetails] = useState({});
	const [videos, setVideos] = useState([]);
	const [backdrops, setBackdrops] = useState([]);
	const [posters, setPosters] = useState([]);
	const [newData, setNewData] = useState([]);
	const [language, setLanguage] = useState('en');
	images_language = language;
	const [typeVideos, setTypeVideos] = useState('Trailers');

	const [videosPerType, setVideosPerType] = useState([]);
	const [backdropsPerLang, setBackdropsPerLang] = useState(
		[],
	);
	const [postersPerLang, setPostersPerLang] = useState([]);
	const [newDataPerLang, setNewDataPerLang] = useState([]);

	const [key, setKey] = useState('');
	const [selectedItemName, setSelectedItemName] =
		useState('');
	const [playMedia, setPlayMedia] = useState(false);

	const typeMapping = {
		Trailer: 'Trailers',
		Teaser: 'Teasers',
		Clip: 'Clips',
		Blooper: 'Bloopers',
		Featurette: 'Featurettes',
	};
	const listTypeVideos = [
		'Trailers',
		'Teasers',
		'Clips',
		'Behind the Scenes',
		'Bloopers',
		'Featurettes',
	];

	const getData = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos,images`,
			);
			const results = response.data;
			const { videos, images } = results;
			const { backdrops, posters } = images;
			setDetails(results);
			setVideos(videos.results);
			setBackdrops(backdrops);
			setPosters(posters);
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
	}, [_media_type, id]);

	const getDataPerLanguage = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos,images&language=${images_language}`,
			);
			const results = response.data;
			const { videos, images } = results;
			const { backdrops, posters } = images;

			setVideosPerType(videos.results);
			setBackdropsPerLang(backdrops);
			setPostersPerLang(posters);
		} catch (err) {
			console.error(err, '<==== get data gagal ====>');
		}
	}, [_media_type, id, images_language]);

	const generateState = useCallback(() => {
		let generatedData = [];

		if (type === 'videos') {
			generatedData = videos;
		} else if (type === 'backdrops') {
			generatedData = backdrops;
		} else {
			generatedData = posters;
		}

		setNewData(generatedData);
	}, [type, videos, backdrops, posters]);

	const generateStatePerLang = useCallback(() => {
		let generatedData = [];

		if (type === 'videos') {
			generatedData = videosPerType;
		} else if (type === 'backdrops') {
			generatedData = backdropsPerLang;
		} else {
			generatedData = postersPerLang;
		}

		setNewDataPerLang(generatedData);
	}, [
		type,
		videosPerType,
		backdropsPerLang,
		postersPerLang,
	]);

	useEffect(() => {
		getData();
	}, [getData]);

	useEffect(() => {
		getDataPerLanguage();
	}, [getDataPerLanguage]);

	useEffect(() => {
		generateState();
	}, [generateState]);

	useEffect(() => {
		generateStatePerLang();
	}, [generateStatePerLang]);

	const handleLanguage = (value) => {
		setLanguage(value);
	};

	const handleTypeVideos = (value) => {
		setTypeVideos(value);
	};

	const getKey = (value) => {
		setKey(value);
		setPlayMedia(true);
	};

	// filter data dengan value yang sama
	const uniqueData = newData.filter((data, index) => {
		return (
			newData.findIndex(
				(item) => item && item.iso_639_1 === data.iso_639_1,
			) === index
		);
	});

	// menganti value type
	const newVideos = newData
		.map((item) => ({
			...item,
			type: typeMapping[item.type] || item.type,
		}))
		.reverse();

	const filteredNewVideosByType = newVideos.filter(
		(item) => item.type === typeVideos,
	);

	const getLanguageLength = (data) => {
		const languageLength = newData.filter(
			(item) => item.iso_639_1 === data.iso_639_1,
		);
		return languageLength.length;
	};

	const getTypeVideosLength = (data) => {
		const typeLenght = newVideos.filter(
			(item) => item.type === data,
		);
		return typeLenght.length;
	};

	function classNameWidth(type) {
		switch (type) {
			case 'videos':
				return 'right w330';
			case 'posters':
				return 'right w210';
			default:
				return 'right';
		}
	}

	const contentVideosPerType =
		filteredNewVideosByType.length > 0 ? (
			filteredNewVideosByType.map((items, index) => (
				<CardImages
					key={index}
					type={type}
					data={items}
					setSelectedItemName={setSelectedItemName}
					getKey={getKey}
				/>
			))
		) : (
			<p>{`There are no English ${typeVideos} added.`}</p>
		);

	return (
		<div className='container_images'>
			{details && (
				<ContentHeader
					_media_type={_media_type}
					id={id}
					allData={details}
				/>
			)}
			<div className='wrapper_content'>
				{type === 'videos'
					? newVideos.length > 0 && (
							<List
								type={type}
								listData={listTypeVideos}
								stateList={typeVideos}
								handlelist={handleTypeVideos}
								getListLength={getTypeVideosLength}
							/>
					  )
					: newData.length > 0 && (
							<List
								type={type}
								listData={uniqueData}
								stateList={language}
								handlelist={handleLanguage}
								getListLength={getLanguageLength}
							/>
					  )}
				<aside className={classNameWidth(type)}>
					{type === 'videos'
						? contentVideosPerType
						: newDataPerLang?.map((data, index) => (
								<CardImages
									key={index}
									type={type}
									data={data}
								/>
						  ))}
					{playMedia && (
						<TrailerPlayer
							titleVideos={selectedItemName}
							keys={key}
							setPlayMedia={() => setPlayMedia(false)}
						/>
					)}
				</aside>
			</div>
		</div>
	);
};

export default Images;
