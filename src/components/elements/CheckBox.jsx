import React from 'react';

const CheckBox = ({ checked, label, onChange }) => {
	return (
		<div>
			<input
				type='checkbox'
				checked={checked}
				onChange={onChange}
			/>
			<label htmlFor=''>{label}</label>
		</div>
	);
};

export default CheckBox;
