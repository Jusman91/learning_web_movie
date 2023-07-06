import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import '../login/Login.css';

const Login = () => {
	const google = () => {
		window.open(
			'http://localhost:4000/auth/google',
			'_self',
		);
	};

	return (
		<>
			<div className='container_login'>
				<h2 className='title'>Choose a Login Method</h2>
				<div className='wrapper'>
					<div className='left'>
						<div
							className='login__btn google'
							onClick={google}>
							<FcGoogle className='icon_login' />
							Google
						</div>
						<div className='login__btn facebook'>
							<FaFacebookF className='icon_login' />
							Facebook
						</div>
						<div className='login__btn github'>
							<FiGithub className='icon_login' />
							Github
						</div>
					</div>
					<div className='center'>
						<div className='line' />
						<div className='or'>Or</div>
					</div>
					<div className='right'>
						<input type='text' placeholder='Username' />
						<input type='password' placeholder='Password' />
						<button className='btn__submit' type='submit'>
							Login
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
