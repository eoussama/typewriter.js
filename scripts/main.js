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
	
	TypeWriter.volume = 0.3;
	setTimeout(() => {
		titleTW.setCursor({activated: true});
		titleTW.type({
			callback: () => {
				header.style.height = '10vh';
				header.style.padding = '150px 10vh';
				logo.style.width = '150px';
				logo.style.marginTop = '-50px';
				document.body.style.overflow = 'auto';
				main.style.display = 'block';

				var tw_1 = new TypeWriter({
						target: document.getElementById('sample'),
						text: 'Hello, there!',
						time: 200
					});

				tw_1.type({loop: true});
			}
		});
	}, 1000);
});