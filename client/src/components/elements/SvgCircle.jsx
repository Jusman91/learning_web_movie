import React from 'react';

const SvgCircle = ({ rating }) => {
	function stroke(rating) {
		let color = '';

		switch (true) {
			case rating >= 80:
				color = '#57e32c';
				break;
			case rating >= 68 && rating <= 79:
				color = '#b7dd29';
				break;
			case rating >= 56 && rating <= 67:
				color = '#ffe234';
				break;
			case rating >= 45 && rating <= 55:
				color = '#ffa534';
				break;
			case rating >= 0 && rating <= 44:
				color = '#ff4545';
				break;
			default:
				color = '';
				break;
		}

		return color;
	}

	return (
		<svg>
			<circle cx='19' cy='20' r='20'></circle>
			<circle
				style={{
					stroke: stroke(rating),
					strokeDashoffset: `calc(130 - (130 * ${Math.round(
						rating,
					)}) / 100)`,
				}}
				cx='19'
				cy='20'
				r='20'></circle>
		</svg>
	);
};

export default SvgCircle;
