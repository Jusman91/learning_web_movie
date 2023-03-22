import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

const GetTrailers = () => {
	const [trailersMovie, setTrailersMovie] = useState();
	const { mediatype, id } = useParams();
	const [playTrailer, setPlayTrailer] = useState(false);

	const getTrailers = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${mediatype}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos`,
			);
			console.log(response);
			const results = response.data;
			setTrailersMovie(results);
		} catch (err) {
			console.error(err, 'getTrailers error');
		}
	};

	useEffect(() => {
		getTrailers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediatype, id]);

	return (
		<>
			<YouTube
				className='trailer'
				videoId={trailersMovie?.videos.results[0].key}
				// videoId={
				// 	trailersMovie?.videos.results.find(
				// 		(vid) => vid.name === 'Official Trailer',
				// 	)
				// 		? playTrailer?.videos.results.find(
				// 				(vid) => vid.name === 'Official Trailer',
				// 		  ).key
				// 		: playTrailer?.videos.results[0].key
				// }
				opts={{
					width: '100%',
					height: '100%',
					playerVars: { autoplay: 1, controls: 0 },
				}}
			/>
		</>
	);
};

export default GetTrailers;
