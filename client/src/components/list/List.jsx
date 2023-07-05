import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import './List.css';

const List = ({
	type,
	listData,
	stateList,
	handlelist,
	getListLength,
}) => {
	const languageNames = new Intl.DisplayNames(['en'], {
		type: 'language',
	});
	return (
		<aside className='left'>
			<div className='titleList'>
				<h3>{type}</h3>
				<FaQuestionCircle className='icon_ques' />
			</div>
			<ul>
				{listData.map((data, index) => {
					if (typeof data === 'object') {
						// Render data objek sebagai child
						return (
							<li
								style={{
									zIndex: listData.length - index,
								}}
								key={index}
								className={
									stateList === data.iso_639_1
										? 'list active_list'
										: 'list'
								}
								onClick={() => handlelist(data.iso_639_1)}>
								{data.iso_639_1
									? languageNames.of(data.iso_639_1)
									: 'No Language'}
								<span>{getListLength(data)}</span>
							</li>
						);
					} else {
						// Render data non-objek sebagai child
						return (
							<li
								style={{
									zIndex: listData.length - index,
								}}
								key={index}
								className={
									stateList === data
										? 'list active_list'
										: 'list'
								}
								onClick={() => handlelist(data)}>
								{data}
								<span>{getListLength(data)}</span>
							</li>
						);
					}
				})}
			</ul>
		</aside>
	);
};

export default List;
