import Accordion from '../../elements/Accordion';
import CheckBox from '../../elements/CheckBox';
import Genres from '../../main_content/movie_search/Data';
import { IoFilterOutline } from 'react-icons/io5';

const FiltersMovies = () => {
	return (
		<div>
			<div>
				<div>
					<IoFilterOutline />
					<span>Filters</span>
				</div>
				<button>Clear All</button>
			</div>
			<div>
				<Accordion label={'Genres'}>
					{Genres.map((item, idx) => {
						return (
							<CheckBox
								key={idx}
								label={item.name}
								checked={false}
								onChange={(e) =>
									console.log(e.target.checked)
								}
							/>
						);
					})}
				</Accordion>
			</div>
		</div>
	);
};

export default FiltersMovies;
