import './Loading.css';
import LoadingImg from '../../asset/logo/logo_s3.png';
import ReactDOM from 'react-dom';

const Loading = ({ type }) => {
	if (type === 'root') {
		return ReactDOM.createPortal(
			<div className='custom'>
				<div className='imgLoading'>
					<img src={LoadingImg} alt='Loading...' />
				</div>
				<div className='balls'>
					<div className='ball ball1'></div>
					<div className='ball ball2'></div>
					<div className='ball ball3'></div>
				</div>
			</div>,
			document.getElementById('loader'),
		);
	}
	if (type === 'component') {
		return (
			<div className='custom'>
				<div className='imgLoading'>
					<img src={LoadingImg} alt='Loading...' />
				</div>
				<div className='balls'>
					<div className='ball ball1'></div>
					<div className='ball ball2'></div>
					<div className='ball ball3'></div>
				</div>
			</div>
		);
	}
};

export default Loading;
