import logoImg from '../../../asset/logo/logo-movie.png';
import avatar from '../../..//asset/avatar.jpg';
import '../navbar/NavBar.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NavBar = ({ user }) => {
	const [listActive, setActiveList] = useState('');

	// <===== hidden & show navbar wirh scrolling
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState();

	const controlNavbar = () => {
		if (window.scrollY > lastScrollY) {
			// if scroll down hide the navbar
			setShow(false);
		} else {
			// if scroll up show the navbar
			setShow(true);
		}

		// remember current page location to use in the next move
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar);

		// cleanup function
		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, [lastScrollY]);
	// =====>

	return (
		<nav
			className={`hiddenNav ${
				show && 'container-nav-bar'
			}`}>
			<div className='nav__list_left'>
				<div className='logo'>
					<div className='logo-img'>
						<Link to='/' onClick={() => setActiveList('/')}>
							<img src={logoImg} alt='Logo' />
						</Link>
					</div>
					<Link
						to='/'
						onClick={() => setActiveList('/')}
						className='logo-title'>
						<h3>NontonAja</h3>
					</Link>
				</div>
				<div className='nav-movie-list'>
					<Link
						to='/'
						onClick={() => setActiveList('home')}
						className={
							listActive === 'home'
								? 'nav-movie-list-active'
								: ''
						}>
						Home
					</Link>
					<Link
						to='/trending'
						onClick={() => setActiveList('trending')}
						className={
							listActive === 'trending'
								? 'nav-movie-list-active'
								: ''
						}>
						Trending
					</Link>
					<Link
						to='/movies'
						onClick={() => setActiveList('movies')}
						className={
							listActive === 'movies'
								? 'nav-list-active'
								: ''
						}>
						Movies
					</Link>
					<Link
						to='/tv'
						onClick={() => setActiveList('tv')}
						className={
							listActive === 'tv' ? 'nav-list-active' : ''
						}>
						Tv
					</Link>
					<Link
						to='/search'
						onClick={() => setActiveList('search')}
						className={
							listActive === 'search'
								? 'nav-list-active'
								: ''
						}>
						Search
					</Link>
				</div>
			</div>
			{user ? (
				<ul className='nav-list-right'>
					<li className='list-item'>
						<img
							src={avatar}
							alt='avatar'
							className='avatar'
						/>
					</li>
					<li className='list-item'>Jusman</li>
					<li className='list-item'>Logout</li>
				</ul>
			) : (
				<Link to='/login' className='link'>
					Login
				</Link>
			)}
		</nav>
	);
};

export default NavBar;
