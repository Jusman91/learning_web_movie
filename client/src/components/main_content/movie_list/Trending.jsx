import axios from 'axios';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Card from '../card/CardContainer';
import HeroContainer from '../../header/hero/HeroContainer';
import Genres from '../genres/Genres';
import Pagination from '../pagination/Pagiantion';

const Trending = ({ carousel }) => {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [pageNum, setPageNum] = useState();
	const [query, setQuery] = useState('');

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/trending/all/day?api_key=${process.env.REACT_APP_APIKEY}&page=${page}`,
			);
			const results = response.data.results;
			setData(results);
			setPageNum(response.data.total_pages);
		} catch (err) {
			console.error(err, 'Data Trending Gagal');
		}
	};

	// const searchTrending = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/search/tv?api_key=${process.env.REACT_APP_APIKEY}&query=${query}&page=${page}`,
	// 		);
	// 		const results = response.data.results;
	// 		console.log(results);
	// 		setData(results);
	// 		setPageNum(response.data.total_pages);
	// 	} catch (err) {
	// 		console.error(
	// 			err,
	// 			'<=== searchMOVIES coba lagi boss ===>',
	// 		);
	// 	}
	// };

	// const changeHandler = (e) => {
	// 	setQuery(e.target.value);
	// };

	// const fetchData = async (currentPage) => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${process.env.REACT_APP_BASEURL}/trending/all/day?api_key=${process.env.REACT_APP_APIKEY}&page=${currentPage}`,
	// 		);
	// 		const results = response.data.results;
	// 		return results;
	// 	} catch (err) {
	// 		console.error(err, 'PageMovie gagal');
	// 	}
	// };

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		// didupdate mount
		getData();
	}, [page]);

	const handleClick = (number) => {
		setPage(number);
	};

	if (carousel) {
		return (
			<>
				<div className='movie__list'>
					<div className='movie__list__header'>
						<h2 className='list__title'>TRENDING</h2>
					</div>
					<div>
						{data && data.length > 0 ? (
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
								{data &&
									data?.map((movie, index) => (
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
	} else {
		return (
			<>
				<Carousel
					showThumbs={false}
					showArrows={true}
					autoPlay={true}
					transitionTime={3}
					infiniteLoop={true}
					showStatus={false}
					showIndicators={false}>
					{data &&
						data?.map((movie, index) => (
							<HeroContainer key={index} poster={movie} />
						))}
				</Carousel>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						margin: '2rem 2rem 1rem 2rem',
					}}>
					<Genres />
				</div>
				<div
					style={{
						margin: '0 6rem',
						display: 'flex',
						justifyContent: 'space-between',
						flexWrap: 'wrap',
						gap: '2rem',
					}}>
					{data &&
						data.map((movie) => (
							<Card key={movie.id} movie={movie} />
						))}
				</div>
				{pageNum && pageNum > 1 ? (
					<Pagination
						handleClick={handleClick}
						pageNum={pageNum}
						activenum={page}
					/>
				) : (
					''
				)}
			</>
		);
	}
};

export default Trending;
