import YouTube from 'react-youtube';
import './TrailerPlayer.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const TrailerPlayer = ({ inHero }) => {
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
	const keyVideosInHero =
		currentDetails?.videos.results.find(
			(vid) => vid.name === 'Official Trailer',
		)
			? currentDetails.videos.results.find(
					(vid) => vid.name === 'Official Trailer',
			  ).key
			: currentDetails?.videos.results[0].key;

	const tiltelVideosInHero =
		currentDetails?.videos.results.find(
			(vid) => vid.name === 'Official Trailer',
		)
			? currentDetails.videos.results.find(
					(vid) => vid.name === 'Official Trailer',
			  ).name
			: currentDetails?.videos.results[0].name;
	return (
		<div className='modal_bg'>
			<div className='container_modal'>
				<YouTube
					className='trailer'
					videoId={inHero ? keyVideosInHero : keyVideos}
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
					<h2>
						{inHero ? tiltelVideosInHero : titleVideos}
					</h2>
					<button
						className='btn_t'
						onClick={() => playMedia(false)}>
						<AiFillCloseCircle />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TrailerPlayer;
