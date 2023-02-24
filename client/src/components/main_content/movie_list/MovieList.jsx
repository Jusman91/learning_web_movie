/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import Card from '../card/CardContainer';
import '../movie_list/MovieList.css';
// import FiltersMovies from '../movie_search/FiltersMovies';
import SearchMovies from '../movie_search/SearchMovies';
// import Pagiantion from '../pagination/Pagiantion';

const MovieList = (props) => {
	const [movieList, setMovieList] = useState([]);
	const { type } = useParams();

	// const [pageNum, setPageNum] = useState();

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/${props.movieType}/${props.type}?api_key=${process.env.REACT_APP_APIKEY}&page=1`,
			);
			const results = response.data.results;
			setMovieList(results);
			// setPageNum(response.data.total_pages);
		} catch (err) {
			console.error(err, '<=== MOVIES coba lagi boss ===>');
		}
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	// const fetcData = async (currentPage) => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/movie/${
	// 				props.type ? props.type : 'popular'
	// 			}?api_key=${
	// 				process.env.REACT_APP_APIKEY
	// 			}&page=${currentPage}`,
	// 		);
	// 		const results = response.data.results;
	// 		return results;
	// 	} catch (err) {
	// 		console.error(err, 'PageMovie gagal');
	// 	}
	// };

	// const handlePageClick = async (data) => {
	// 	console.log(data.selected + 1);
	// 	let currentPage = data.selected + 1;
	// 	const dataFormServer = await fetcData(currentPage);
	// 	setMovieList(dataFormServer);
	// };

	return (
		<>
			<div className='movie__list'>
				<div className='movie__list__header'>
					<h2 className='list__title'>
						{`${props.type.toUpperCase()}${' '}${'('}${props.movieType.toUpperCase()}${')'}`}
					</h2>
				</div>
				<div>
					{movieList && movieList.length > 0 ? (
						<Carousel
							showThumbs={false}
							showArrows={true}
							autoPlay={true}
							transitionTime={3}
							infiniteLoop={true}
							showStatus={false}
							showIndicators={false}
							centerMode={true}
							centerSlidePercentage={20}>
							{movieList &&
								movieList?.map((movie, index) => (
									<Card key={index} movie={movie} />
								))}
						</Carousel>
					) : (
						<h2>Movies Not Found</h2>
					)}
				</div>
			</div>
		</>
	);
};

export default MovieList;
