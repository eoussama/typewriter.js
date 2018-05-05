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

tw_SetVolume(0.4);

function TypeWriter({target = 'undefined', text = target.textContent.trim(), time = 30, audio = false, cursor = {activated: false, type: 1}, loop = false}) {
	this.target = target;
	this.text = text;
	this.time = time;
	this.audio = audio;
	this.cursor = cursor;
	this.loop = loop;
	this.callback;

	this.timer = null;
	this.index = 0;
	this.finished = true;
	
	this.type = function ({callback = function() {}, resume = 'undefined'}) {
		let __rand = 0;
		this.stop();
		this.finished = false;
		this.callback = callback;
		resume = resume == 'undefined' ? false : resume;
		
		if(resume === false) {
			this.index = 0;
			this.target.textContent = '';
		}
		
		this.timer = setInterval(() => {
			if(this.index >= this.text.length) {
				if(this.loop === true) {
					this.type();
				} else {
					clearInterval(this.timer);
					this.timer = null;
					this.finished = true;
				}
				
				setTimeout(this.callback, 1);
				this.index = 0;
			} else {
				this.target.textContent += this.text[this.index++];
				if(this.audio !== false) {
					__rand = Math.floor(Math.random() * AUDIO.length);
					AUDIO[__rand].play();
				}
			}
		}, this.time);
	}
	
	this.delete = (chars = this.text.length, callback = () => {}) => {
		let __count = 0;

		this.stop();
		this.finished = false;
		this.index = this.target.textContent.trim().length - 1;
		this.callback = callback;
		
		this.timer = setInterval(() => {
			if(target.textContent.trim().length <= 0) {
				if(this.loop === true) {
					this.delete();
				} else {
					clearInterval(this.timer);
					this.timer = null;
					this.finished = true;
				}
				
				setTimeout(this.callback, 1);
				this.index = text.length - 1;
			} else if (chars == __count) {
				clearInterval(this.timer);
				this.timer = null;
				setTimeout(this.callback, 1);
			} else {
				this.target.textContent = this.text.substring(0, this.index--);
				__count++;
				if(this.audio !== false) AUDIO[0].play();
			}
		}, this.time);
	}
	
	this.stop = () => {
		if(this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
	
	this.resume = () => {
		if(this.timer === null && this.finished === false)
			this.type(this.callback, true);
	}
	
	this.setText = (text = this.target.textContent) => this.text = text;
	
	this.setCursor = ({activated = !this.cursor.activated, type = 1}) => {
		let style = document.createElement('style');
		this.cursor.activated = activated;
		this.cursor.type = type;
		
		style.id = target.id+'_STYLE';
		style.innerHTML = CURSOR_STYLE;
		style.innerHTML = style.innerHTML.replace('ELEMENT_ID', target.id);
		style.innerHTML = cursor.type == 1 ? style.innerHTML.replace('CURSOT_TYPE', '_') : style.innerHTML.replace('CURSOT_TYPE', '|');
		document.getElementsByTagName('head')[0].appendChild(style);	
		style.innerHTML = cursor.type == 1 ? style.innerHTML.replace('CURSOT_TYPE', '_') : style.innerHTML.replace('CURSOT_TYPE', '|');
		
		if(activated === true) {
			if(!this.target.classList.contains('cursor'))
				this.target.classList.add('cursor');
		} else {
			if(this.target.classList.contains('cursor'))
				this.target.classList.remove('cursor');
		}
	}
	
	this.setAudio = (audio = !this.audio) => this.audio = audio;
	
	this.setLoop = (loop = !this.loop) => this.loop = loop;
	time
	this.setTime = (time = 30) => {
		this.time = time;
		
		if(this.finished === false) {
			this.stop();
			this.resume();
		}
	}
		
	if(this.cursor.activated === true)
		this.setCursor({activated: true, type: 1});
}

function tw_SetVolume(vol) {
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