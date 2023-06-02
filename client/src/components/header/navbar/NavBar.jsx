/* eslint-disable jsx-a11y/anchor-is-valid */
import avatar from '../../..//asset/avatar.jpg';
import '../navbar/NavBar.css';
import logoImg from '../../../asset/logo/logo_s3.png';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MdPersonalVideo } from 'react-icons/md';
import { RiMovie2Line } from 'react-icons/ri';
import { GoHome } from 'react-icons/go';
import { BsSearch } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';
import SearchMovies from '../../main_content/search/input/SearchMovies';

const NavBar = ({ user }) => {
	// <===== hidden & show navbar with scrolling
	const [show, setShow] = useState(false);
	const [lastScrollY, setLastScrollY] = useState();
	const [showSearch, setShowSearch] = useState(false);

	const handleShowSearch = () => {
		setShowSearch(!showSearch);
	};

	const controlNavbar = () => {
		if (window.scrollX > 10) {
			// if scroll down hide the navbar
			setShow(true);
		} else {
			// if scroll up show the navbar
			setShow(false);
		}

		// remember current page location to use in the next move
		setLastScrollY(window.scrollX);
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
			className={`container__navbar ${
				show && 'hiddenNav'
			}`}>
			<div className='nav__item'>
				<div className='left__nav'>
					<NavLink to='/'>
						<img
							src={logoImg}
							alt='Logo'
							className='logo'
						/>
						<span>movies</span>
					</NavLink>
				</div>
				<div className='middle__nav'>
					<ul>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? 'active__nav' : ''
								}
								to='/'>
								<span className='icon'>
									<GoHome />
								</span>
								<span className='text'>Home</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/movies'
								className={({ isActive }) =>
									isActive ? 'active__nav' : ''
								}>
								<span className='icon'>
									<RiMovie2Line />
								</span>
								<span className='text'>Movies</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? 'active__nav' : ''
								}
								to='/tv'>
								<span className='icon'>
									<MdPersonalVideo />
								</span>
								<span className='text'>Tv</span>
							</NavLink>
						</li>
						<li>
							<a
								onClick={() => handleShowSearch(true)}
								className={
									showSearch === true ? 'active__nav' : ''
								}>
								<span className='icon'>
									{showSearch === true ? (
										<IoCloseSharp />
									) : (
										<BsSearch />
									)}
								</span>
								<span className='text'>Search</span>
							</a>
						</li>
					</ul>
				</div>
				<div className='right__nav'>
					{user ? (
						<ul>
							<li>
								<img
									src={avatar}
									alt='avatar'
									className='avatar'
								/>
							</li>
							<li>Jusman</li>
							<li>Logout</li>
						</ul>
					) : (
						<div className='login__item'>
							<NavLink to='/login'>Login</NavLink>
						</div>
					)}
				</div>
			</div>
			{showSearch === true && <SearchMovies />}
		</nav>
	);
};

export default NavBar;
