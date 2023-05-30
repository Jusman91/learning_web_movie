import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import {
	img_profile,
	noProfile,
} from '../../../config/config';
import { Link } from 'react-router-dom';

const CreditsTvSeries = ({ id, _media_type }) => {
	const [cast, setCast] = useState([]);
	const [crew, setCrew] = useState([]);
	const [roles, setRoles] = useState([]);

	console.log('ROLE', roles);
	const characters = () => {
		const role = cast.map((c) => {
			return c.roles.map((r) => <span>{r.character}</span>);
		});
	};
	const responsive = {
		0: {
			items: 1,
		},
		512: {
			items: 3,
		},
		1024: {
			items: 6,
		},
	};
	const getCreditsTvSeries = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/tv/${id}/aggregate_credits?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			// const crewResults = response.data.crew;
			const castResults = response.data.cast;

			// setCrew(crewResults);
			setCast(castResults);
			// console.log('CREW', crewResults);
			console.log('CAST TV SERIES', castResults);
		} catch (err) {
			console.error(err, '<==== get credits gagal ====>');
		}
	};

	useEffect(() => {
		if (_media_type === 'tv') {
			getCreditsTvSeries();
		}
	}, [id, _media_type]);

	return (
		<div className='wrap_cast'>
			<h3>Series Cast</h3>
			<AliceCarousel
				disableDotsControls
				disableButtonsControls
				responsive={responsive}
				mouseTracking={true}>
				{cast &&
					cast.slice(0, 6).map((c, index) => (
						<div key={index} className='cast_profile'>
							<img
								src={
									c.profile_path
										? `${img_profile}${c.profile_path}`
										: noProfile
								}
								alt='Profile'
							/>
							<div className='character'>
								<span>{c.name}</span>
								{c.roles.map((r, i) => (
									<span key={i}>{r.character}</span>
								))}
							</div>
						</div>
					))}
			</AliceCarousel>
			<Link
				to={`/details/${_media_type}/${id}/cast`}
				className='full_castcrew'>
				<h4> View more Cast & Crew ⇨</h4>
			</Link>
		</div>
	);
};

export default CreditsTvSeries;
