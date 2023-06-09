import YouTube from 'react-youtube';
import './TrailerPlayer.css';
import { AiFillCloseCircle } from 'react-icons/ai';

const TrailerPlayer = ({
	hero,
	setPlayMedia,
	keys,
	titleVideos,
}) => {
	const heroId = hero?.videos.results.find(
		(vid) => vid.name === 'Official Trailer',
	)
		? hero.videos.results.find(
				(vid) => vid.name === 'Official Trailer',
		  ).key
		: hero?.videos.results[0].key;

	const heroTitle = hero?.videos.results.find(
		(vid) => vid.name === 'Official Trailer',
	)
		? hero.videos.results.find(
				(vid) => vid.name === 'Official Trailer',
		  ).name
		: hero?.videos.results[0].name;
	return (
		<div className='modal_bg'>
			<div className='container_modal'>
				<YouTube
					className='trailer'
					videoId={hero ? heroId : keys}
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
					<h2>{hero ? heroTitle : titleVideos}</h2>
					<button className='btn_t' onClick={setPlayMedia}>
						<AiFillCloseCircle />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TrailerPlayer;
