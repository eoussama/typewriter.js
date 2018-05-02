window.addEventListener('load', () => {
	const
		header = document.getElementsByTagName('header')[0],
		title = document.getElementById('title'),
		logo = document.querySelector('header img'),
		main = document.getElementsByTagName('main')[0];
	
	setTimeout(() => { typewriter({element: title, text:'TypeWriterJS', time: 120, audio: true, forwatd: true, cursor: {activated: true, type: 1}, callback: () => {
		
		header.style.height = '10vh';
		header.style.padding = '150px 10vh';
		logo.style.width = '150px';
		logo.style.marginTop = '-50px';
		document.body.style.overflow = 'auto';
		main.style.display = 'block';
		
		const
			defaultAnim = document.getElementById('defaultAnim'),
			customText = document.getElementById('customText'),
			timeContr = document.getElementById('timeContr'),
			backwardsTyping = document.getElementById('backwardsTyping'),
			cursor1 = document.getElementById('cursor1'),
			cursor2 = document.getElementById('cursor2'),
			callbckAnim = document.getElementById('callbckAnim'),

			defaultBtn = document.getElementById('defaultBtn'),

			customBtn = document.getElementById('customBtn'),
			customInput = document.getElementById('customInput'),
			customCode = document.getElementById('customCode'),

			timeBtn = document.getElementById('timeBtn'),
			timeInput = document.getElementById('timeInput'),
			timeCode = document.getElementById('timeCode'),
			  
			loopTyping = document.getElementById('loopTyping');

		defaultBtn.addEventListener('click', () => {
			stoptypewriter(def);
			typewriter({element: defaultAnim});
		});

		customBtn.addEventListener('click', () => {
			stoptypewriter(cus);
			typewriter({element: customText, text: customInput.value});
		});

		customInput.addEventListener('keydown', () => {
			customCode.textContent = `typewriter({element: customText, text: ${customInput.value}});`;
		});

		timeBtn.addEventListener('click', () => {
			stoptypewriter(tc);
			typewriter({element: timeContr, time: timeInput.value});
		});

		timeInput.addEventListener('change', () => {
			timeCode.textContent = `typewriter({element: customText, time: ${timeInput.value}});`;
		});

		var def = typewriter({element: defaultAnim});
		var cus = typewriter({element: customText, text: customInput.value});
		var tc = typewriter({element: timeContr, time: 500});
		typewriter({element: backwardsTyping, forward: false});
		typewriter({element: cursor1, cursor: {activated: true, type: 1}});
		typewriter({element: cursor2, cursor: {activated: true, type: 2}});
		typewriter({element: loopTyping, loop: true});
		typewriter({element: callbckAnim, callback: () => { alert('Animation finished!'); }});
		
	}}); }, 1000);
});