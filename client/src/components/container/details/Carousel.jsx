import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import {
	IoIosArrowBack,
	IoIosArrowForward,
} from 'react-icons/io';
import Card from '../../card/Card';

const Carousel = ({ data, _media_type }) => {
	const renderNextButton = () => {
		return (
			<IoIosArrowForward
				style={{
					position: 'absolute',
					right: '-2%',
					top: '35%',
					fontSize: '40px',
					cursor: 'pointer',
				}}
			/>
		);
	};

	const renderPrevButton = () => {
		return (
			<IoIosArrowBack
				style={{
					position: 'absolute',
					left: '-2%',
					top: '35%',
					fontSize: '40px',
					cursor: 'pointer',
				}}
			/>
		);
	};
	const responsive = {
		0: {
			items: 1,
		},
		512: {
			items: 3,
		},
		1024: {
			items: 4,
		},
	};
	return (
		<AliceCarousel
			disableDotsControls
			renderNextButton={renderNextButton}
			renderPrevButton={renderPrevButton}
			responsive={responsive}>
			{data.map((m, i) => (
				<Card
					key={i}
					movie={m}
					link={`/details/${m.id}/${_media_type}`}
				/>
			))}
		</AliceCarousel>
	);
};

export default Carousel;
