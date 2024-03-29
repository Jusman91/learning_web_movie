import ReactPaginate from 'react-paginate';
import './Pagiantion.css';

const Pagiantion = ({
	pageNum,
	activenum,
	handleClick,
	credits,
	activePagination,
}) => {
	const forcePageActive = parseInt(activenum) - 1;
	const handlePageClick = (e) => {
		console.log(e.selected + 1);
		let currentPage = parseInt(e.selected + 1);
		handleClick(currentPage);
		window.scrollTo(0, 0);
	};

	return (
		<>
			<ReactPaginate
				previousLabel={'<<'}
				nextLabel={'>>'}
				breakLabel={'...'}
				pageCount={pageNum}
				marginPagesDisplayed={1}
				pageRangeDisplayed={1}
				onPageChange={credits ? credits : handlePageClick}
				containerClassName={'container__pagination'}
				previousClassName={'page__item'}
				pageClassName={'page__item'}
				breakClassName={'page__item'}
				nextClassName={'page__item'}
				previousLinkClassName={'page__link'}
				pageLinkClassName={'page__link'}
				breakLinkClassName={'page__link'}
				nextLinkClassName={'page__link'}
				activeClassName={'active__pagination'}
				renderOnZeroPageCount={null}
				forcePage={forcePageActive}
			/>
		</>
	);
};

export default Pagiantion;
