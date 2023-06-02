import React from 'react';
import { Link } from 'react-router-dom';
import {
	img_profile,
	noProfile,
} from '../../../../config/config';
import './CardProfile.css';

const CardProfile = ({ profile }) => {
	const replaceSeparator = (v) => {
		return v.toLowerCase().replace(/\s+/g, '-');
	};
	return (
		<div className='wrapper_card'>
			<Link
				to={`/person/${`${
					profile.id
				}${'-'}${replaceSeparator(profile.name)}`}`}
				className='cast_profile'>
				<img
					src={
						profile.profile_path
							? `${img_profile}${profile.profile_path}`
							: noProfile
					}
					alt='Profile'
				/>
			</Link>
			<div className='wrapper_character'>
				<span className='original_name'>
					<Link
						to={`/person/${`${
							profile.id
						}${'-'}${replaceSeparator(profile.name)}`}`}>
						{profile.name}
					</Link>
				</span>
				<span className='character'>
					{profile.character}
				</span>
				{profile.roles?.slice(0, 4).map((r, i) => (
					<span className='character' key={i}>
						{r.character}

						{profile.roles?.length - 1 !== i && ', '}
					</span>
				))}
				{profile.roles?.length > 4 && (
					<span className='slice'>{`and ${profile.roles?.length} more...`}</span>
				)}
				{profile.total_episode_count && (
					<span className='episodes'>
						{profile.total_episode_count} Episodes
					</span>
				)}
			</div>
		</div>
	);
};

export default CardProfile;
