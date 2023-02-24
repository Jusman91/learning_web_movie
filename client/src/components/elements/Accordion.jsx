import { useState } from 'react';
import {
	TbArrowsMaximize,
	TbArrowsMinimize,
} from 'react-icons/tb';
import '../elements/Accordion.css';

const Accordion = ({ label, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () =>
		setIsOpen((prevIsOpen) => !prevIsOpen);
	return (
		<>
			<div className='wrapper__accordion'>
				<div className='title'>{label}</div>
				<button onClick={toggleAccordion}>
					{isOpen ? (
						<TbArrowsMinimize fontSize={20} color='red' />
					) : (
						<TbArrowsMaximize fontSize={20} />
					)}
				</button>
				<div className='genre__item'>
					{isOpen && <div>{children}</div>}
				</div>
			</div>
		</>
	);
};

export default Accordion;
