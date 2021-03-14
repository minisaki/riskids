import React from 'react';
import './Button.css';

const STYLE = ["btn-primary", "btn-outline"]
const SIZE = ["btn-medium", "btn-large"]
const DISABLED = "btn-disabled"
function Button({btnStyle, btnSize, btnContent, btnType, onClick, isDisabled}) {
	const btnCheckStyle = STYLE.includes(btnStyle) ? btnStyle : STYLE[0]
	
	const btnCheckSize = SIZE.includes(btnSize) ? btnSize : SIZE[0]

	const btnCheckIsDisabled = isDisabled ? DISABLED : ""
	
	return (
		<div className="btn-container">
			<button 
				className={`btn ${btnCheckStyle} ${btnCheckSize} ${btnCheckIsDisabled}`}
				onClick = {onClick}
				type={btnType}
				disabled={isDisabled}
			> {btnContent}
			</button>
			
		</div>
	)
}

export default Button
