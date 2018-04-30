window.addEventListener('load', () => {
	const target = document.getElementById('script');
	
	typewrite(target, target.textContent, 70);
});

function typewrite(element, text, time = 30) {
	let
		__index = 0,
		__timer = null;
	
	element.textContent = '';
	
	__timer = setInterval(() => {
		element.textContent += text[__index++];
		if(__index >= text.length) clearInterval(__timer);
	}, time);
}