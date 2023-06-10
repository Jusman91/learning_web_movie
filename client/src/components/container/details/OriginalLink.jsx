import './OriginalLink.css';
import { FiExternalLink } from 'react-icons/fi';

const OriginalLink = ({ data }) => {
	return (
		<>
			{(data?.homepage || data?.imdb_id) && (
				<div className='movie__link'>
					<h3>Original Link</h3>
					{data?.homepage && (
						<a
							rel='noopener noreferrer'
							href={data?.homepage}
							target='_blank'
							style={{ textDecoration: 'none' }}>
							<p>
								<span className='movie__homeBtn movie__btn'>
									Homepage <FiExternalLink />
								</span>
							</p>
						</a>
					)}
					{data?.imdb_id && (
						<a
							rel='noopener noreferrer'
							href={`https://www.imdb.com/title/${data?.imdb_id}`}
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
