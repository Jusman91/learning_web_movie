import axios from 'axios';
import { useEffect, useState } from 'react';
import { SiOpenmined } from 'react-icons/si';
import { BsFillXCircleFill } from 'react-icons/bs';
import '../genres/Genres.css';

const Genres = ({
	selectedGenres,
	setSelectedGenres,
	genres,
	setGenres,
	type,
	setPage,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [listActive, setListActive] = useState(false);

	const toggleListGenres = () =>
		setIsOpen((prevIsOpen) => !prevIsOpen);

	const handleAdd = (genre) => {
		setSelectedGenres([...selectedGenres, genre]);
		setGenres(genres.filter((g) => g.id !== genre.id));
		setPage(1);
		setListActive(true);
	};

	const handleRemove = (genre) => {
		setSelectedGenres(
			selectedGenres.filter(
				(selected) => selected.id !== genre.id,
			),
		);
		setGenres([...genres, genre]);
		setPage(1);
	};

	const fetchGenres = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASEURL}/genre/${type}/list?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			const results = response.data.genres;
			setGenres(results);
			console.log(results);
		} catch (err) {
			console.error(err, 'Data Genres gagal');
		}
	};

	useEffect(() => {
		fetchGenres();
		return () => {
			setGenres({});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className='container__genres'>
				<button
					onClick={toggleListGenres}
					className='btn__genres'>
					Genres
					<SiOpenmined
						className={
							isOpen ? 'open__list' : 'close__list'
						}
					/>
				</button>
				{isOpen && (
					<>
						<ul className='wrapper__list'>
							{selectedGenres &&
								selectedGenres.map((gen) => (
									<li
										onClick={() => handleRemove(gen)}
										className={
											listActive
												? 'list__item list__item__active'
												: 'list__item'
										}
										key={gen.id}>
										{gen.name}
										<BsFillXCircleFill className='unselect__icon' />
									</li>
								))}
							{genres &&
								genres?.map((gen) => (
									<li
										onClick={() => handleAdd(gen)}
										className='list__item'
										key={gen.id}>
										{gen.name}
									</li>
								))}
						</ul>
					</>
				)}
			</div>
		</>
	);
};

export default Genres;
