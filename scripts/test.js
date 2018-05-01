window.addEventListener('load', () => {
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
		timeCode = document.getElementById('timeCode');
	
	defaultBtn.addEventListener('click', () => {
		typewriter(defaultAnim);
	});
	
	customBtn.addEventListener('click', () => {
		typewriter(customText, customInput.value);
	});
	
	customInput.addEventListener('keypress', () => {
		customCode.textContent = `typewriter(customText, ${customInput.value});`;
	});
	
	timeBtn.addEventListener('click', () => {
		typewriter(timeContr, timeContr.textContent, timeInput.value);
	});
	
	timeInput.addEventListener('change', () => {
		timeCode.textContent = `typewriter(customText, timeContr.textContent, ${timeInput.value});`;
	});
	
	typewriter(defaultAnim);
	typewriter(customText, customInput.value);
	var tw = typewriter(timeContr, timeContr.textContent, 500);
	typewriter(backwardsTyping, backwardsTyping.textContent, 30, false);
	typewriter(cursor1, cursor1.textContent, 30, true, {activated: true, type: 1});
	typewriter(cursor2, cursor2.textContent, 30, true, {activated: true, type: 2});
	typewriter(callbckAnim, callbckAnim.textContent, 30, true, {activated: false}, () => { alert('Animation finished!'); stoptypewriter(tw); });
});