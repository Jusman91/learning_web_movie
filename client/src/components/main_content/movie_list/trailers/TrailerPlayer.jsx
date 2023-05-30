import YouTube from 'react-youtube';
import './TrailerPlayer.css';

const TrailerPlayer = ({ trailer, setPlayTrailer }) => {
	return (
		<div>
			<YouTube
				className='trailer'
				videoId={
					trailer.videos.results.find(
						(vid) => vid.name === 'Official Trailer',
					)
						? trailer.videos.results.find(
								(vid) => vid.name === 'Official Trailer',
						  ).key
						: trailer.videos.results[0].key
				}
				opts={{
					width: '100%',
					height: '100%',
					playerVars: { autoplay: 1, controls: 0 },
				}}
			/>
			<button
				className='trailer_btn trailer_btn_close'
				onClick={setPlayTrailer}>
				Close Trailer
			</button>
		</div>
	);
};

export default TrailerPlayer;
