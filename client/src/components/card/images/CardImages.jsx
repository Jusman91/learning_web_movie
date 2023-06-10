import dayjs from 'dayjs';
import './CardImages.css';
import { IoPlay } from 'react-icons/io5';
import { AiFillLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaCaretDown, FaCheck } from 'react-icons/fa';
import { img_poster } from '../../../config/config';

const CardImages = ({
	type,
	setSelectedItemName,
	getKey,
	data,
}) => {
	function classNameHeight(type) {
		switch (type) {
			case 'backdrops':
				return 'wrap_image';
			case 'posters':
			case 'videos':
				return 'wrap_image h300';
			default:
				return 'wrap_image';
		}
	}

	const languageNames = new Intl.DisplayNames(['en'], {
		type: 'language',
	});
	if (type === 'videos') {
		const published_at = (params) => {
			return dayjs(params).format('MMM D, YYYY');
		};
		return (
			<div className='images'>
				<div className={classNameHeight(type)}>
					<img
						src={`https://img.youtube.com/vi/${data.key}/hqdefault.jpg`}
						alt='Posters'
					/>
					<div
						className='btn_play'
						onClick={() => {
							setSelectedItemName(data.name);
							getKey(data.key);
						}}>
						<IoPlay className='icon_play' />
					</div>
				</div>
				<div className='info_video'>
					<h4>{data.name}</h4>
					<span>{published_at(data.published_at)}</span>
				</div>
			</div>
		);
	} else {
		return (
			<div className='images'>
				<div className={classNameHeight(type)}>
					<img
						src={`${img_poster}/${data.file_path}`}
						alt='Images'
					/>
				</div>
				<div className='info'>
					<div className='inf_header'>
						<h4>Info</h4>
						<AiFillLock className='icon_lock' />
					</div>
					<form className='a_form'>
						<label htmlFor=''>Size</label>
						<p className='origina_img'>
							<Link>{`${data.width}x${data.height}`}</Link>{' '}
							<span>
								<FaCheck />
							</span>
						</p>
						<label htmlFor=''>Language</label>
						<p className='input_language'>
							<span>
								{data.iso_639_1
									? languageNames.of(data.iso_639_1)
									: 'No Language'}
							</span>
							<span>
								<FaCaretDown />
							</span>
						</p>
					</form>
				</div>
			</div>
		);
	}
};

export default CardImages;
