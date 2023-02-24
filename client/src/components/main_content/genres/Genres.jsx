import axios from 'axios';
import { useEffect, useState } from 'react';
import Accordion from '../../elements/Accordion';
import '../genres/Genres.css';

const Genres = () => {
	const [genres, setGenres] = useState([]);

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/genre/movie/list?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data.genres;
			setGenres(results);
		} catch (err) {
			console.error(err, 'Data Genres gagal');
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<>
			<Accordion label={'Genres'}>
				<ul className='wrapper__list'>
					{genres &&
						genres?.map((gen) => (
							<li className='list__item' key={gen.id}>
								{gen.name}
							</li>
						))}
				</ul>
			</Accordion>
		</>
	);
};

export default Genres;
