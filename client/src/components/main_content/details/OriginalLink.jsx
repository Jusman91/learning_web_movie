import { useSelector } from 'react-redux';
import './OriginalLink.css';
import { FiExternalLink } from 'react-icons/fi';

const OriginalLink = () => {
	const { currentDetails } = useSelector(
		(state) => state.detailsMovieReducer,
	);
	return (
		<>
			{(currentDetails?.homepage ||
				currentDetails?.imdb_id) && (
				<div className='movie__link'>
					<h3>Original Link</h3>
					{currentDetails?.homepage && (
						<a
							rel='noopener noreferrer'
							href={currentDetails?.homepage}
							target='_blank'
							style={{ textDecoration: 'none' }}>
							<p>
								<span className='movie__homeBtn movie__btn'>
									Homepage <FiExternalLink />
								</span>
							</p>
						</a>
					)}
					{currentDetails?.imdb_id && (
						<a
							rel='noopener noreferrer'
							href={`https://www.imdb.com/title/${currentDetails?.imdb_id}`}
							target='_blank'
							style={{ textDecoration: 'none' }}>
							<p>
								<span className='movie__imdbBtn movie__btn'>
									IMDb <FiExternalLink />
								</span>
							</p>
						</a>
					)}
				</div>
			)}
		</>
	);
};

export default OriginalLink;
