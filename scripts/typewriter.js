const 
	CURSOR_STYLE = `
		#ELEMENT_ID.cursor::after {
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
	`,
	  __audio = [new Audio('../sounds/type_1.mp3'), new Audio('../sounds/type_1.mp3'), new Audio('../sounds/type_2.mp3'), new Audio('../sounds/type_1.mp3'), new Audio('../sounds/type_3.mp3'), new Audio('../sounds/type_1.mp3')];
	  
for(__a of __audio) __a.volume = 0.4;

function typewriter({element = 'undefined', text = element.textContent.trim(), time = 30, audio = false, forward = true, cursor = 'undefined', loop = false, callback = () => {}}) {
	let
		__index = 0,
		__timer = null,
		__rand = 0;
	
	element.textContent = forward === true ? '' : text;
	
	if(cursor !== 'undefined') {
		cursor.activated = typeof(cursor.activated) == 'undefined' ? false : cursor.activated;
		cursor.type = typeof(cursor.type) == 'undefined' ? 1 : cursor.type > 2 || cursor.type < 1 ? 1 : cursor.type;
		
		if(cursor.activated === true) {
			let style = document.createElement('style');

			style.innerHTML = CURSOR_STYLE;
			style.innerHTML = style.innerHTML.replace('ELEMENT_ID', element.id);
			style.innerHTML = cursor.type == 1 ? style.innerHTML.replace('CURSOT_TYPE', '_') : style.innerHTML.replace('CURSOT_TYPE', '|');

			document.getElementsByTagName('head')[0].appendChild(style);
			element.classList.add('cursor');
		}
	}
	
	
	if(forward === true) {
		__timer = setInterval(() => {
			if(__index >= text.length) {
				clearInterval(__timer);
				callback();
				if(loop === true)
					typewriter({element: element, text: text, time: time, audio: audio, forward: forward, cursor: cursor, loop: loop, callback: callback});
			}
			else {
				element.textContent += text[__index++];
				if(audio !== false) {
					__rand = Math.floor(Math.random() * __audio.length);
					__audio[__rand].play();
				}
			}
		}, time);
	}
	
	else {
		__index = text.length - 1;
		
		__timer = setInterval(() => {
			if(element.textContent.length <= 0) {
				clearInterval(__timer);
				callback();
				if(loop === true)
					typewriter({element: element, text: text, time: time, audio: audio, forward: forward, cursor: cursor, loop: loop, callback: callback});
			}
			else {
				element.textContent = element.textContent.substring(0, __index--);
				if(audio !== false) __audio[0].play();
			}
		}, time);
	}
	
	return {element: element, text: text, time: time, audio: audio, forward: forward, cursor: cursor, loop, callback: callback, timer: __timer};
}

stoptypewriter = (tw) => clearInterval(tw.timer);