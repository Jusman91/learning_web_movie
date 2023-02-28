import logoImg from '../../../asset/logo/logo-movie.png';
import avatar from '../../..//asset/avatar.jpg';
import '../navbar/NavBar.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NavBar = ({ user }) => {
	// <===== hidden & show navbar with scrolling
	const [show, setShow] = useState(false);
	const [lastScrollY, setLastScrollY] = useState();

	const controlNavbar = () => {
		if (window.scrollY > lastScrollY) {
			// if scroll down hide the navbar
			setShow(true);
		} else {
			// if scroll up show the navbar
			setShow(false);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastScrollY]);
	// =====>

	return (
		<nav
			className={`container-nav-bar ${
				show && 'hiddenNav'
			}`}>
			<div className='nav__list_left'>
				<div className='logo'>
					<div className='logo-img'>
						<Link to='/'>
							<img src={logoImg} alt='Logo' />
						</Link>
					</div>
					<NavLink to='/' className='logo-title'>
						<h3>NontonAja</h3>
					</NavLink>
				</div>
				<div className='nav-movie-list'>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive ? 'nav-movie-list-active' : ''
						}>
						Home
					</NavLink>
					<NavLink
						to='/movies'
						className={({ isActive }) =>
							isActive ? 'nav-movie-list-active' : ''
						}>
						Movies
					</NavLink>
					<NavLink
						to='/tv'
						className={({ isActive }) =>
							isActive ? 'nav-movie-list-active' : ''
						}>
						Tv
					</NavLink>
					<NavLink
						to='/search'
						className={({ isActive }) =>
							isActive ? 'nav-movie-list-active' : ''
						}>
						Search
					</NavLink>
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
				<NavLink to='/login' className='link'>
					Login
				</NavLink>
			)}
		</nav>
	);
};

export default NavBar;
