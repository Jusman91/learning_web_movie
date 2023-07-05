import { useSelector } from 'react-redux';
import Carousel from '../../carousel/Carousel';
import OriginalLink from './OriginalLink';
import ProductionCompany from './ProductionCompany';

const PartBottom = ({ _media_type }) => {
	const { similarMovies, recommendationMovies } =
		useSelector((state) => state.detailsMovieReducer);
	return (
		<>
			<OriginalLink />
			{similarMovies.length > 0 && (
				<div className='wrap_content'>
					<h3>Similar Movies</h3>
					<Carousel
						data={similarMovies}
						_media_type={_media_type}
					/>
				</div>
			)}
			{recommendationMovies.length > 0 && (
				<div className='wrap_content'>
					<h3>Recommendations</h3>
					<Carousel
						data={recommendationMovies}
						_media_type={_media_type}
					/>
				</div>
			)}
			<ProductionCompany />
		</>
	);
};

export default PartBottom;
