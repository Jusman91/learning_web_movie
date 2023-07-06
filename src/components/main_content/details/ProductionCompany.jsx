import { useSelector } from 'react-redux';
import { img_logo, noLogo } from '../../../config/tmdb';
import './ProductionCompany.css';

const ProductionCompany = () => {
	const { currentDetails } = useSelector(
		(state) => state.detailsMovieReducer,
	);

	return (
		<>
			{currentDetails.production_companies && (
				<div className='production_comapnay'>
					<h3>Production Companies</h3>
					<div className='movie__production'>
						{currentDetails.production_companies.map(
							(company, index) => (
								<div key={index}>
									<div className='productionCompanyImg'>
										<img
											src={
												company.logo_path
													? `${img_logo}${company.logo_path}`
													: noLogo
											}
											alt='ProductionCompany'
										/>
									</div>
									<span className='company_name'>
										{company.name}
									</span>
								</div>
							),
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default ProductionCompany;
