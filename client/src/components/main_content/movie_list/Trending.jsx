import axios from 'axios';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import Card from '../card/Card';
import HeroContainer from '../../header/hero/HeroContainer';
import Genres from '../genres/Genres';
import Pagination from '../pagination/Pagiantion';

const Trending = ({ mediaType }) => {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [pageNum, setPageNum] = useState();

	const getData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/trending/${mediaType}/day?api_key=${process.env.REACT_APP_APIKEY}&page=${page}`,
			);
			const results = response.data.results;
			setData(results);
			setPageNum(response.data.total_pages);
		} catch (err) {
			console.error(err, 'Data Trending Gagal');
		}
	};

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// didupdate mount
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const handleClick = (number) => {
		setPage(number);
	};

	return (
		<>
			{/* <Carousel
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
			</Carousel> */}
			<AliceCarousel
				disableDotsControls
				disableButtonsControls
				autoPlay={true}
				autoPlayInterval={3000}
				animationDuration={1000}
				infinite={true}>
				{data &&
					data?.map((movie, index) => (
						<HeroContainer key={index} poster={movie} />
					))}
			</AliceCarousel>
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
					data?.map((movie) => (
						<Card
							key={movie.id}
							movie={movie}
							link={`/details/${movie.id}/${movie.media_type}`}
						/>
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
};

export default Trending;
