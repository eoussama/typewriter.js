<p align="center">
    <a href="http://eoussama.github.io/typewriterjs"><img src="images/logo.svg" alt="Logo" width="200px"><a>
    <h1 align="center">TypeWriterJS</h1>
	<h5 align="center">Version 3.2.2</h5>
    <p align="center">A Javascript library for applying old typewriter text animations</p>
</p>
<hr>

## Navigation
* [Description](#description)
* [Installation](#installation)
* [Documentation](#documentation)
* [Credits](#credits)

## Description
I started this as a personal project, tried to implement something similar on my portfolio, and thought of myself, this could be way bigger, and here it is officially released. Nothing too shabby to be honest, just another handy tool for you.
This is all centered on one constructor, `typewriter`, with multiple properties to control all sorts of aspects of the animation, more on this in the documentation below...

## Installation

#### Steps
4. Download the latest version [here](https://github.com/EOussama/typewriterjs/releases)</a>.
5. Unzip the package somewhere.
6. Copy the **typewriter.js** or the **typewriter.min.js** to your scripts file.
7. Copy the **sounds** folder to your project.
8. Make sure both your **typewriter** js file's parent folder and **sounds** folder are part of the same parent directory.

#### Project structure
- project/
	- scripts/
		- **typewriter.js**
		- whatever.js
	- styles/
	- **sounds**/
	- images/
	- someFolder/
	- index.html

## Documentation
### The constructor
As we've hinted previously, currently, there is only one main function that does all of the work, let's break it down;
```js
TypeWriter ( {
	target = 'undefined',
	text = target.textContent.trim(),
	time = 30,
	audio = false,
	cursor = {
		activated: false,
		type: 1
	}
} )
```
This constructor is used to instantiate typewriter objects, that are responsible for producing the animations.

### `typewriter` properties

|Property|Description|Default value|
|--- |--- |--- |
|target|The element you want to perform the animation on, must be a valid DOM element.|undefined|
|text|The text you want to be output as a result of the animation|The target's text (`textContent`)|
|time|The time it would take to output a single character|30 milliseconds|
|audio|Whether or not to make use of some sound effects to compliment the typing animation|`false`|
|cursor|An object with 2 properties, the first indicates whether to use a cursor effect at the end of the output text, and the second is for the type of the cursor to display (“_” and “\|”)|`{activated: false, type: 1}`|

After instanciating a typewriter object, we can use all sort of method tpo control and customize the animation, here's a list of available methods.

* type
* delete
* stop
* pause
* resume
* setText
* setCursor
* setTime
* setAudio
* Volume (__setter__)

### Example
```html
<!-- index.html -->
<!DOCTYPE html>

<html>
    <body>
        <p id="target"></p>
    </body>
</html>
```
```js
// main.js

var tw = new TypeWriter({
    element: document.getElementById('target'),
    text: 'Lorem Ipsum!',
    time: 1000,
    audio: true,
    cursor: {
        activated: true,
        type: 1
    }
});

tw.type({
	callback: function() {
    	alert('Animation finished');
	}
});
```
That would output '_Lorem Ipsum!_' in the paragraph element as if it's being written with a scrapped typewriter, each character will take _1000 milliseconds_ to be output, the animation will have a cursor of type 1 “\_”, and a typing sound effect to compliment it, and will trigger a function to execute when it's finished, alerting '_Animation finished_' for the user.

In order to stop the animation at any point, we can utilize the `stop` function;

```js
// main.js

setTimeout(() => { tw.stop(); }, 1000)
```
That will stop the animation after a second had passed.

> Checkout the `main.html` file for usage examples, or visit [this documentation page](https://eoussama.github.io/typewriterjs/).

## Credits
> Icon made by [**Freepik**](http://www.flaticon.com) from [www.flaticon.com](http://www.flaticon.com)
