window.addEventListener('load', () => {
	const
		header = document.getElementsByTagName('header')[0],
		logo = document.querySelector('header img'),
		main = document.getElementsByTagName('main')[0],
		title = document.getElementById('title'),
		titleTW = new TypeWriter({
			target: title,
			text: 'TypeWriterJS',
			time: 120,
			audio: true
		});
	
	setTimeout(() => {
		titleTW.setCursor({activated: true});
		titleTW.type(() => {
			header.style.height = '10vh';
			header.style.padding = '150px 10vh';
			logo.style.width = '150px';
			logo.style.marginTop = '-50px';
			document.body.style.overflow = 'auto';
			main.style.display = 'block';

			var tw_1 = new TypeWriter({
					target: document.getElementById('sample'),
					text: 'Hello, there!',
					time: 200,
					loop: true
				});

			tw_1.type();
			
		});
	}, 1000);
});