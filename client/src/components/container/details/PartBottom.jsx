import Carousel from './Carousel';
import OriginalLink from './OriginalLink';
import ProductionCompany from './ProductionCompany';

const PartBottom = ({
	_media_type,
	similarMovies,
	recommendationMovies,
	data,
}) => {
	return (
		<>
			<OriginalLink data={data} />
			{similarMovies && (
				<div className='wrap_content'>
					<h3>Similar Movies</h3>
					<Carousel
						data={similarMovies}
						_media_type={_media_type}
					/>
				</div>
			)}
			{recommendationMovies && (
				<div className='wrap_content'>
					<h3>Recommendations</h3>
					<Carousel
						data={recommendationMovies}
						_media_type={_media_type}
					/>
				</div>
			)}
			<ProductionCompany data={data} />
		</>
	);
};

export default PartBottom;
