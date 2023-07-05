import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import {
	IoIosArrowBack,
	IoIosArrowForward,
} from 'react-icons/io';
import CardContent from '../card/content/CardContent';
import Hero from '../header/hero/Hero';

const Carousel = ({
	data,
	_media_type,
	trailers,
	selectMovie,
	hero,
	handleImageSelect,
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
			items: 8,
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
			items: 4,
		},
	};

	const url = (params) => {
		let name = params.original_title || params.name;
		name = name.replace(/\s+/g, '-').toLowerCase();
		const url = `/details/${
			params.media_type || _media_type
		}/${`${params.id}${'-'}${name}`}`;
		return url;
	};

	if (data) {
		return (
			<AliceCarousel
				animationDuration={600}
				disableDotsControls
				renderNextButton={renderNextButton}
				renderPrevButton={renderPrevButton}
				responsive={responsive}>
				{data.map((m, i) => (
					<CardContent key={i} data={m} link={url(m)} />
				))}
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
						onImageSelect={handleImageSelect}
					/>
				))}
			</AliceCarousel>
		);
	}

	if (hero) {
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
				disableButtonsControls>
				{hero.map((m, i) => (
					<Hero
						key={i}
						mediaType={_media_type}
						data={m}
						link={url(m)}
					/>
				))}
			</AliceCarousel>
		);
	}
};

export default Carousel;
