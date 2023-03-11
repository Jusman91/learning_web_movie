import React from 'react';

const Form = ({
	onSubmit,
	className,
	name,
	value,
	onChange,
}) => {
	return (
		<div>
			<form
				onSubmit={onSubmit}
				className={className}
				name={name}
				value={value}
				onChange={onChange}>
				<input type='text' placeholder='Search' />
				<button className='search__btn' type='submit'>
					Search
				</button>
			</form>
		</div>
	);
};

export default Form;
