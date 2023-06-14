import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import {
	IoIosArrowBack,
	IoIosArrowForward,
} from 'react-icons/io';
import CardContent from '../card/content/CardContent';

const Carousel = ({
	data,
	_media_type,
	trailers,
	selectMovie,
}) => {
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
	const responsiveTrailers = {
		0: {
			items: 1,
		},
		512: {
			items: 3,
		},
		1024: {
			items: 3,
		},
	};

	if (data) {
		return (
			<AliceCarousel
				animationDuration={600}
				disableDotsControls
				renderNextButton={renderNextButton}
				renderPrevButton={renderPrevButton}
				responsive={responsive}>
				{data.map((m, i) => {
					let name = m.original_title || m.name;
					name = name.replace(/\s+/g, '-').toLowerCase();
					const url = `/details/${_media_type}/${`${
						m.id
					}${'-'}${name}`}`;
					return (
						<CardContent key={i} data={m} link={url} />
					);
				})}
			</AliceCarousel>
		);
	}

	if (trailers) {
		return (
			<AliceCarousel
				animationDuration={1000}
				mouseTracking={true}
				autoPlay={true}
				autoPlayInterval={3000}
				infinite={true}
				touchMoveDefaultEvents={false}
				touchTracking={false}
				disableDotsControls
				disableButtonsControls
				responsive={responsiveTrailers}>
				{trailers.map((m, i) => (
					<CardContent
						key={i}
						trailers={m}
						selectMovie={selectMovie}
					/>
				))}
			</AliceCarousel>
		);
	}
};

export default Carousel;
