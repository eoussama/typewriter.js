window.addEventListener('load', () => {
	const target = document.getElementById('script');
	
	typewriter(target, target.getContext, 50, true, {activated: true, type: 1});
});