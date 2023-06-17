import YouTube from 'react-youtube';
import './TrailerPlayer.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const TrailerPlayer = ({ Hero, trailers }) => {
	const dispatch = useDispatch();
	const { currentDetails } = useSelector(
		(state) => state.detailsMovieReducer,
	);
	const { keyVideos, titleVideos } = useSelector(
		(state) => state.trailersReducer,
	);

	const playMedia = (value) => {
		dispatch({
			type: 'PLAY_MEDIA_IN_HERO',
			payload: value,
		});
		dispatch({
			type: 'PLAY_MEDIA',
			payload: value,
		});
	};

	const keyVideoIn = (params) => {
		const trailer = params.videos?.results.find(
			(v) => v.name === 'Official Trailer',
		);

		const key = trailer
			? trailer?.key
			: params.videos?.results[0]?.key;

		return key;
	};
	const titleVideoIn = (params) => {
		const trailer = params.videos?.results.find(
			(v) => v.name === 'Official Trailer',
		);

		const title = trailer
			? trailer?.name
			: params.videos?.results[0]?.name;

		return title;
	};

	const videoId = () => {
		if (Hero) {
			return keyVideoIn(currentDetails);
		} else if (trailers) {
			return keyVideoIn(trailers);
		} else {
			return keyVideos;
		}
	};
	const videoTitle = () => {
		if (Hero) {
			return titleVideoIn(currentDetails);
		} else if (trailers) {
			return titleVideoIn(trailers);
		} else {
			return titleVideos;
		}
	};

	return (
		<div className='modal_bg'>
			<div className='container_modal'>
				<YouTube
					className='trailer'
					videoId={videoId()}
					opts={{
						width: '100%',
						height: '100%',
						playerVars: {
							autoplay: 0,
							controls: 1,
						},
					}}
				/>
				<div className='wrap_titleVideos'>
					<h2>{videoTitle()}</h2>
					<button
						className='btn_t'
						onClick={() => playMedia(false)}>
						<AiFillCloseCircle />
					</button>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default TrailerPlayer;
