import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../card/CardContainer';
import '../movie_list/MovieList.css';
import SearchMovies from '../movie_search/SearchMovies';

const MovieList = () => {
	const [movieList, setMovieList] = useState([]);
	const { type } = useParams();

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/movie/${
					type ? type : 'popular'
				}?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data.results;
			setMovieList(results);
		} catch (err) {
			console.error(err, '<=== MOVIES coba lagi boss ===>');
		}
	};

	useEffect(() => {
		getData();
	}, [type]);

	return (
		<>
			<div className='movie__list'>
				<div className='movie__list__header'>
					<h2 className='list__title'>
						{(type ? type : 'Popular').toUpperCase()}
					</h2>
					<SearchMovies setMovieList={setMovieList} />
				</div>
				<div>
					{movieList.length > 0 ? (
						<div className='list__cards'>
							{movieList &&
								movieList?.map((movie, index) => (
									<Card key={index} movie={movie} />
								))}
						</div>
					) : (
						<h2>Movies Not Found</h2>
					)}
				</div>
			</div>
		</>
	);
};

export default MovieList;
