const CURSOR_STYLE = `
	.cursor::after {
		content: 'CURSOT_TYPE';
		font-weight: bold;

		animation-name: cursor;
		animation-duration: 0.5s;
		animation-iteration-count: infinite;
		animation-direction: alternate-reverse;
		animation-timing-function: linear;
	}

	@keyframes cursor {
		from { opacity: 0; }
		to { opacity: 1; }
	}
`;

function typewriter(element, text = element.textContent, time = 30, forward = true, cursor) {
	let
		__index = 0,
		__timer = null;
	
	element.textContent = '';
	cursor.activated = typeof(cursor.activated) == 'undefined' ? false : cursor.activated;
	cursor.type = typeof(cursor.type) == 'undefined' ? 1 : cursor.type > 2 || cursor.type < 1 ? 1 : cursor.type;
	
	if(cursor.activated === true) {
		let style = document.createElement('style');
		
		style.innerHTML = CURSOR_STYLE;
		style.innerHTML = cursor.type == 1 ? style.innerHTML.replace('CURSOT_TYPE', '_') : style.innerHTML.replace('CURSOT_TYPE', '|');
		
		document.getElementsByTagName('head')[0].appendChild(style);
		element.classList.add('cursor');
	}
	
	if(forward === true) {
		__timer = setInterval(() => {
			element.textContent += text[__index++];
			if(__index >= text.length) clearInterval(__timer);
		}, time);
	}
	
	else {
		__index = text.length - 1;
		
		__timer = setInterval(() => {
			element.textContent += text[__index--];
			if(__index < 0) clearInterval(__timer);
		}, time);
	}
}