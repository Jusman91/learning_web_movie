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
						to='/movies/popular'
						onClick={() => setActiveList('popular')}
						className={
							listActive === 'popular'
								? 'nav-movie-list-active'
								: ''
						}>
						Popular
					</Link>
					<Link
						to='/movies/top_rated'
						onClick={() => setActiveList('top_rated')}
						className={
							listActive === 'top_rated'
								? 'nav-list-active'
								: ''
						}>
						Top Rated
					</Link>
					<Link
						to='/movies/upcoming'
						onClick={() => setActiveList('upcoming')}
						className={
							listActive === 'upcoming'
								? 'nav-list-active'
								: ''
						}>
						Upcoming
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
