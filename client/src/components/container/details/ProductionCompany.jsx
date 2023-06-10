import './ProductionCompany.css';
import { img_logo } from '../../../config/config';

const ProductionCompany = ({ data }) => {
	return (
		<>
			{data.production_companies && (
				<div className='production_comapnay'>
					<h3>Production Companies</h3>
					<div className='movie__production'>
						{data.production_companies.map(
							(company, index) => (
								<div key={index}>
									<div className='productionCompanyImg'>
										<img
											src={`${img_logo}${company.logo_path}`}
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
