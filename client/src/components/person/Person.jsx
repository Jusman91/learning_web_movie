import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Person.css';
import dayjs from 'dayjs';
import {
	img_profile,
	noProfile,
} from '../../config/config';
import Card from '../card/Card';

const Person = () => {
	const params = useParams();
	const id = params.personid;
	const [person, setPerson] = useState({});
	const [cast, setCast] = useState([]);
	const [crew, setCrew] = useState([]);
	const [selectedOption, setSelectedOption] = useState('');
	const [listOption, setListOption] = useState([]);
	const [departmentsActive, setDepartmentsActive] =
		useState(true);
	const [creditsPerson, setCreditsPerson] = useState([]);
	const newCredits = cast.concat(crew);
	const formatYard = (value) => {
		const airDate = dayjs(value).format('YYYY');
		return airDate;
	};

	const knownCredits = cast.length + crew.length;
	const gender = () => {
		if (person.gender === 1) {
			return 'Female';
		} else if (person.gender === 2) {
			return 'Male';
		}
	};

	const filterCredits = (event) => {
		const selectedValue = event.target.value;
		if (selectedValue === 'All') {
			setDepartmentsActive(true);
		} else if (selectedValue === 'Acting') {
			setCreditsPerson(cast);
			setDepartmentsActive(false);
		} else {
			const allCredits = newCredits.filter(
				(n) =>
					n.department === selectedValue ||
					n.media_type === selectedValue,
			);
			setCreditsPerson(allCredits);
			setDepartmentsActive(false);
		}
		setSelectedOption(selectedValue);
	};
	const getPerson = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/person/${id}?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data;
			setPerson(results);
			console.log('person', results);
		} catch (err) {
			console.error(err, 'Error getting person');
		}
	};
	const getPersonCredits = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/person/${id}/combined_credits?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data;
			const cast = results.cast;
			const crew = results.crew;
			const list = crew.map((c) => {
				return c.department;
			});
			list.unshift('Acting', 'movie', 'tv');
			setCast(cast);
			setCrew(crew);
			setListOption(list);
			console.log('person cast', cast);
			console.log('person crew', crew);
		} catch (err) {
			console.error(err, 'Error getting person');
		}
	};

	useEffect(() => {
		getPerson();
		getPersonCredits();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className='conatainer_details_person'>
			<div className='content_wrapper'>
				<aside className='left_side'>
					<div className='image_content'>
						<img
							src={
								person.profile_path
									? `${img_profile}/${person.profile_path}`
									: noProfile
							}
							alt='Profile'
						/>
					</div>
					<div className='personal_info'>
						<h3>Personal Info</h3>
						<p>
							<strong>
								<bdi>Known For</bdi>
							</strong>
							<br />
							<span>{person.known_for_department}</span>
						</p>
						<p>
							<strong>
								<bdi>Known Credits</bdi>
							</strong>
							<br />
							<span>{knownCredits}</span>
						</p>
						<p>
							<strong>
								<bdi>Gender</bdi>
							</strong>
							<br />
							<span>{gender()}</span>
						</p>
						<p>
							<strong>
								<bdi>Birthday</bdi>
							</strong>
							<br />
							<span>
								{person.birthday?.length > 0
									? person.birthday
									: '-'}
							</span>
						</p>
						<p>
							<strong>
								<bdi>Place of Birth</bdi>
							</strong>
							<br />
							<span>{person.place_of_birth}</span>
						</p>
						<p>
							<strong>
								<bdi>Also Known As</bdi>
							</strong>
							<br />
							<span>
								{person.also_known_as?.length > 0
									? person.also_known_as
									: '-'}
							</span>
						</p>
					</div>
				</aside>
				<aside className='right_side'>
					<div className='title' dir='auto'>
						<h2>{person.name}</h2>
					</div>
					<div className='biography'>
						<h3 dir='auto'>Biography</h3>
						<p dir='auto'>
							{person.biography?.length > 0
								? person.biography
								: "We don't have a biography for Jana Mitsoula."}
						</p>
					</div>
					<div className='knownFor'>
						<h3 dir='auto'>Known For</h3>
						<div className='flex_nowrap'>
							{cast.map((c, i) => (
								<div key={i} className='cardKnownFor'>
									<Card trending={c} />
									<p>{c.title || c.name}</p>
								</div>
							))}
						</div>
					</div>
					<div className='wrapper_credits'>
						<div className='credits_list'>
							<div className='header_option'>
								<h3 className='title_option'>
									{(selectedOption === 'movie' ||
										selectedOption === 'tv' ||
										departmentsActive === true ||
										creditsPerson === cast) &&
										'Acting'}
								</h3>
								<select
									className='filter'
									value={selectedOption}
									onChange={filterCredits}>
									<option value='All'>All</option>
									{listOption.map((a, i) => (
										<option key={i} value={a}>
											{a}
										</option>
									))}
								</select>
							</div>
							<div className='defaultData'>
								{departmentsActive === true &&
									newCredits.map((c, i) => (
										<div key={i}>
											<h3>{c.department}</h3>
											<table
												key={i}
												className='card_credits'
												border='0'
												cellSpacing='0'
												cellPadding='0'>
												<tbody>
													<tr>
														<td className='year'>
															{formatYard(
																c.release_date ||
																	c.first_air_date,
															)}
														</td>
														<td className='separator'>
															<span>
																<span></span>
															</span>
														</td>
														<td className='role'>
															<Link
																to={`/details/${c.media_type}/${c.id}`}>
																{c.title || c.name}
															</Link>

															<span className='group'>
																{c.episode_count && (
																	<span>
																		<Link>{`(${c.episode_count} episodes)`}</Link>
																	</span>
																)}{' '}
																{c.character?.length > 0 &&
																c.character
																	? 'as'
																	: c.job
																	? '...'
																	: ''}{' '}
																<span className='character'>
																	{c.character
																		? c.character
																		: c.job}
																</span>
															</span>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									))}
							</div>
							{departmentsActive === false &&
								creditsPerson.map((c, i) => (
									<div key={i}>
										<h3>
											{(selectedOption === c.media_type ||
												c.department) &&
												c.department}
										</h3>
										<table
											key={i}
											className='card_credits'
											border='0'
											cellSpacing='0'
											cellPadding='0'>
											<tbody>
												<tr>
													<td className='year'>
														{formatYard(
															c.release_date ||
																c.first_air_date,
														)}
													</td>
													<td className='separator'>
														<span>
															<span></span>
														</span>
													</td>
													<td className='role'>
														<Link
															to={`/details/${c.media_type}/${c.id}`}>
															{c.title || c.name}
														</Link>

														<span className='group'>
															{c.episode_count && (
																<span>
																	<Link>{`(${c.episode_count} episodes)`}</Link>
																</span>
															)}{' '}
															{c.character?.length > 0 &&
															c.character
																? 'as'
																: c.job
																? '...'
																: ''}{' '}
															<span className='character'>
																{c.character
																	? c.character
																	: c.job}
															</span>
														</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								))}
						</div>
					</div>
				</aside>
			</div>
		</section>
	);
};

export default Person;
