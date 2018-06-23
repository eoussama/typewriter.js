/*
			Title: 			TypeWriterJS
			Version: 		3.3.4
			Author: 		Eoussama
			Description: 	JS library for typewriter animations
			License:		Apache v2.0

*/

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
	  AUDIO = [new Audio('sounds/type_1.mp3'), new Audio('sounds/type_1.mp3'), new Audio('sounds/type_2.mp3'), new Audio('sounds/type_1.mp3'), new Audio('sounds/type_3.mp3'), new Audio('sounds/type_1.mp3')];

var
	isTabFocused = false;

class TypeWriter {
	
	constructor({target = 'undefined', text = target.textContent.trim(), time = 30, audio = false, cursor = {activated: false, type: 1}}) {
		this.target = target;
		this.text = text;
		this.time = time;
		this.audio = audio;
		this.cursor = cursor;
		
		this.timer = null;
		this.index = 0;
		this.finished = true;
		this.paused = false;
		this.loop = false;
		this.start = 0;
		this.chars = 0;
		this.delay = 0;
		this.callbacks = [];
		
		if(this.cursor.activated === true)
			this.setCursor({activated: true, type: 1});
	}
	
	static get volume() { 
		return AUDIO[0].volume;
	}
	
	static set volume(vol) {
		if(vol > 1.0) {
			vol = 1.0;
			console.warn('The volume must be lower than or equal 1.0');
		}

		if(vol < 0.0) {
			vol = 0.0;
			console.warn('The volume must be greater than or equal to 0.0');
		}

		for(let __a of AUDIO)
			__a.volume = vol;
	}
	
	type({callback = () => {}, start = 0, chars = this.text.trim().length, delay = 0, loop = false} = {callback: () => {}, start: 0, chars: this.text.trim().length, delay: 0, loop: false}) {
		let __rand = 0;
		
		this.start = start;
		this.chars = chars;
		this.delay = delay;
		this.callbacks[0] = callback;
		this.finished = false;
		this.paused = false;
		this.loop = loop;
		
		setTimeout(() => {
			
			this.target.textContent = this.text.substring(0, this.start);
			this.index = this.start;

			this.timer = setInterval(() => {
				if(isTabFocused !== false) {
					if(this.index >= this.text.length || this.index >= this.start + this.chars) {
						if(this.loop === false) {
							clearInterval(this.timer);
							this.stop();
						} else {
							this.pause();
							setTimeout(() => {
								this.resume();
								this.target.textContent = this.text.substring(0, this.start);
								this.index = this.start;
							}, this.delay);
						}
						
						this.callbacks[0]();
					} else {
						this.target.textContent += this.text[this.index++];
						if(this.audio !== false && isTabFocused === true) {
							__rand = Math.floor(Math.random() * AUDIO.length);
							AUDIO[__rand].play();
						}
					}
				}
			}, this.time);
		}, delay);
	}
	
	delete({callback = () => {}, chars = this.text.trim().length, delay = 0} = {callback: () => {}, chars: this.text.trim().length, delay: 0}) {
		let __rand = 0, start = 0;
		
		this.chars = chars;
		this.delay = delay;
		this.callbacks[1] = callback;
		this.finished = false;
		this.paused = false;
		
		setTimeout(() => {
			
			start = this.index = this.target.textContent.trim().length - 1;

			this.timer = setInterval(() => {
				if(isTabFocused !== false) {
					if(this.index < 0 || this.index <= start - this.chars) {
						clearInterval(this.timer);
						this.stop();
						this.callbacks[1]();
					} else {
						this.target.textContent = this.text.substring(0, this.index--);
						if(this.audio !== false && isTabFocused === true)
							AUDIO[0].play();
					}
				}
			}, this.time);
		}, delay);
	}
	
	stop() {
		if(this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
			this.finished = true;
			this.paused = false;
		}
	}
	
	pause() {
		if(this.timer !== null && this.paused === false) {
			clearInterval(this.timer);
			this.timer = null;
			this.paused = true;
		}
	}
	
	resume() {
		if(this.paused === true && this.timer === null) {
			let __rand = 0;
			
			this.paused = false;
			setTimeout(() => {
				if(this.index >= this.text.trim()) {
					this.target.textContent = this.text.substring(0, this.start);
					this.index = this.start;
				}

				this.timer = setInterval(() => {
					if(isTabFocused !== false) {
						if(this.index >= this.text.length || this.index >= this.start + this.chars) {
							if(this.loop === false) {
								this.stop();
							} else {
								this.pause();
								setTimeout(() => {
									this.resume();
									this.target.textContent = this.text.substring(0, this.start);
									this.index = this.start;
								}, this.delay);
							}

							this.callbacks[0]();
						} else {
							this.target.textContent += this.text[this.index++];
							if(this.audio !== false  && isTabFocused === true) {
								__rand = Math.floor(Math.random() * AUDIO.length);
								AUDIO[__rand].play();
							}
						}
					}
				}, this.time);
			}, 0);
		}
	}
	
	setText(text = this.target.textContent.trim()) {
		this.text = text.trim();
	}
	
	setAudio(audio = !this.audio) {
		this.audio = audio;
	}
	
	setLoop(loop = !this.loop) {
		this.loop = loop;
	}
	
	setTime(time = 30) {
		this.time = time;
	}
	
	setCursor({activated, type} = {activated: !this.cursor.activated, type: 1}) {
		this.cursor.activated = activated;
		this.cursor.type = type;

		if(this.cursor.activated === true) {
			let style = document.createElement('style');
			
			style.id = this.target.id+'_STYLE';
			style.innerHTML = CURSOR_STYLE;
			style.innerHTML = style.innerHTML.replace('ELEMENT_ID', this.target.id);
			style.innerHTML = this.cursor.type == 1 ? style.innerHTML.replace('CURSOT_TYPE', '_') : style.innerHTML.replace('CURSOT_TYPE', '|');
			document.getElementsByTagName('head')[0].appendChild(style);	
			style.innerHTML = this.cursor.type == 1 ? style.innerHTML.replace('CURSOT_TYPE', '_') : style.innerHTML.replace('CURSOT_TYPE', '|');
			
			if(!this.target.classList.contains('cursor'))
				this.target.classList.add('cursor');
		} else {
			if(this.target.classList.contains('cursor'))
				this.target.classList.remove('cursor');
		}
	}
}

window.addEventListener('load', () => isTabFocused = document.hasFocus() );
window.addEventListener('focus', () => { isTabFocused = true; window.focus(); });
window.addEventListener('blur', () => isTabFocused = false );