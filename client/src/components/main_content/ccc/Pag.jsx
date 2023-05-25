import axios from 'axios';
import { useEffect } from 'react';

const Pag = () => {
	const getSeason = async () => {
		try {
			const response = await axios.get(`
			https://api.themoviedb.org/3/tv/${60735}/season/${1}?api_key=${
				process.env.REACT_APP_APIKEY
			}`);
			console.log('Respon', response);
		} catch (err) {
			console.error(err, 'Get Season failed');
		}
	};
	useEffect(() => {
		getSeason();
	}, []);
	return <div>Pag</div>;
};

export default Pag;
