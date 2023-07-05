import axios from 'axios';
import './TrailerList.css';
import { useEffect, useState } from 'react';
import Carousel from '../../../../carousel/Carousel';
import '../getList.css';
import {
	img_poster,
	unavailable,
} from '../../../../../config/tmdb';
import TrailerPlayer from './TrailerPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayMedia } from '../../../../../config/redux/action';

const TrailerList = () => {
	const [dataTrailers, setDataTrailers] = useState([]);
	const [monetizationType, setMonetizationType] =
		useState('');
	const [releaseType, setReleaseType] = useState('3');
	const [selectMovie, setSelectMovie] = useState({});
	const [selectedImage, setSelectedImage] = useState(null);

	const dispatch = useDispatch();
	const { playMedia } = useSelector(
		(state) => state.trailersReducer,
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let combinedResults = []; // Array untuk menyimpan hasil penggabungan halaman

				// Melakukan loop untuk mengambil data dari setiap halaman
				for (let i = 1; i <= 2; i++) {
					const response = await axios.get(
						`${process.env.REACT_APP_BASEURL}/discover/movie?api_key=${process.env.REACT_APP_APIKEY}&watch_region=ID&with_watch_monetization_types=${monetizationType}&with_release_type=${releaseType}&page=${i}`,
					);

					const results = response.data.results;
					combinedResults = [
						...combinedResults,
						...results,
					]; // Menggabungkan hasil dari halaman saat ini dengan hasil sebelumnya
				}
				const selectedResults = combinedResults.slice(
					10,
					30,
				);
				console.log('trailers', selectedResults);

				setDataTrailers(selectedResults);
				setSelectMovie(selectedResults[0]);
				setSelectedImage(
					selectedResults[0]?.poster_path || null,
				); // Mengatur selectedImage dengan backdrop_path dari index pertama
			} catch (err) {
				console.error(err, 'Error fetching');
			}
		};
		fetchData();

		// Mengatur posisi list aktif ke Streaming saat render awal atau reload
		if (dataTrailers.length === 0) {
			handleMonetizationType('flatrate');
		}
	}, [dataTrailers.length, monetizationType, releaseType]);

	const fetchTrailers = async (id) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=videos`,
			);
			return response.data;
		} catch (err) {
			console.error(err, 'getTrailers error');
		}
	};

	const selectTrailers = async (video) => {
		const trailers = await fetchTrailers(video.id);
		setSelectMovie(trailers);
		dispatch(setPlayMedia(true));
	};

	const handleMonetizationType = (value) => {
		setMonetizationType(value);
		setReleaseType('');
	};

	const handleReleaseType = (value) => {
		setReleaseType(value);
		setMonetizationType('');
	};

	const handleImageSelect = (image) => {
		setSelectedImage(image);
	};
	return (
		<>
			<section className='container_section trailers'>
				<div className='header trailers'>
					<h2>Trailers</h2>
					<div className='list_content'>
						<ul>
							<li
								className={
									monetizationType === 'flatrate'
										? 'time'
										: ''
								}
								onClick={() =>
									handleMonetizationType('flatrate')
								}>
								Streaming
							</li>
							<li
								className={
									monetizationType === 'rent' ? 'time' : ''
								}
								onClick={() =>
									handleMonetizationType('rent')
								}>
								For Rent
							</li>
							<li
								className={
									releaseType === '3' ? 'time' : ''
								}
								onClick={() => handleReleaseType('3')}>
								In Theaters
							</li>
							<div className='_before'></div>
						</ul>
					</div>
				</div>
				<div className='container__slider__trailer'>
					{dataTrailers ? (
						<Carousel
							trailers={dataTrailers}
							selectMovie={selectTrailers}
							handleImageSelect={handleImageSelect}
						/>
					) : (
						<h2>Movies Not Found</h2>
					)}
				</div>
				<img
					className='backTrailers'
					src={
						selectedImage
							? `${img_poster}/${selectedImage}`
							: unavailable
					}
					alt='Posters'
				/>
				<div className='backOverlay'></div>
				{playMedia && (
					<TrailerPlayer trailers={selectMovie} />
				)}
			</section>
		</>
	);
};

export default TrailerList;
