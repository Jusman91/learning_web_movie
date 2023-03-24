import './Footer.css';
import logoImg from '../../asset/logo/logo_s3.png';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer__content'>
				<div className='footer__content__logo'>
					<Link to='/'>
						<img
							src={logoImg}
							alt='Logo'
							className='logo'
						/>
						<span>movies</span>
					</Link>
				</div>
				<div className='footer__content__menus'>
					<div className='footer__content__menu'>
						<Link to='/'>Home</Link>
						<Link to='/'>Contact Us</Link>
						<Link to='/'>Term of Services</Link>
						<Link to='/'>About Us</Link>
					</div>
					<div className='footer__content__menu'>
						<Link to='/'>Live</Link>
						<Link to='/'>FAQ</Link>
						<Link to='/'>Premium</Link>
						<Link to='/'>Pravacy Policy</Link>
					</div>
					<div className='footer__content__menu'>
						<Link to='/'>You Must Watch</Link>
						<Link to='/'>Recent Release</Link>
						<Link to='/'>Top iMDB</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
