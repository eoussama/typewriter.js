/**
 * 
 * @name:       typewriterjs
 * @version:    4.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/typewriterjs
 *
 * A typewriter for the web.
 * 
 */


window.addEventListener('load', function () {

	var
		header = document.getElementsByTagName('header')[0],
		logo = document.querySelector('header img'),
		main = document.getElementsByTagName('main')[0],
		title = document.getElementById('title'),
		titleTw = new Typewriter({
			target: title,
			speed: 120
		});
		
		// Typing the title.
		titleTw.type({
			script: "TypewriterJS",
			endCallback: function () {
				
				// Changing the header's styling and revealing the content.
				header.style.height = '10vh';
				header.style.padding = '150px 10vh';
				logo.style.width = '150px';
				logo.style.marginTop = '-50px';
				document.body.style.overflow = 'auto';
				main.style.display = 'block';
			}
		});
	
		// Highlighting the code snippets.
		document.querySelectorAll('pre > code').forEach(function(block) {
			hljs.highlightBlock(block);
		});
});
