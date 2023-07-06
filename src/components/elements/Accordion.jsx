import { useState } from 'react';
import {
	RiArrowDownSLine,
	RiArrowRightSLine,
} from 'react-icons/ri';
import '../elements/Accordion.css';

const Accordion = ({ label, children, ...res }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () =>
		setIsOpen((prevIsOpen) => !prevIsOpen);
	return (
		<>
			<div
				className={`container_accordion ${res.className}`}>
				<div
					className='wrap_title'
					onClick={toggleAccordion}>
					<div className='title'>{label}</div>
					<button>
						{isOpen ? (
							<RiArrowDownSLine className='icon_accordion open' />
						) : (
							<RiArrowRightSLine className='icon_accordion ' />
						)}
					</button>
				</div>
				<div className='genre__item'>
					{isOpen && (
						<>
							<div>{children}</div>
							{/* <div>{children}</div> */}
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Accordion;
