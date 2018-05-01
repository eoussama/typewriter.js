<p align="center">
    <img src="images/logo.svg" alt="Logo" width="200px">
    <h1 align="center">TypeWriterJS</h1>
    <p align="center">A Javascript library for applying old typewriter text animations</p>
</p>
<hr>

## Navigation
* [Description](#description)
* [Documentation](#documentation)
* [Credits](#credits)

## Description
I started this as a personal project, tried to implement something similar on my portfolio, and though of myself, this could be way bigger, and here it is officially released. Nothing too shabby to be honest, just another handy tool for you.
This is all centered on one function, `typewriter`, with multiple parameters to control all sorts of aspects of the animation, more on this in the documentation below...

## Documentation
### `typewriter` syntax
As we've hinted previously, currently, there is only one main function that does all of the work, let's break it down;
```js
function typewriter(element, text, time, forward, cursor, callback) {}
```
This function returns an object that holds all sort of information related to the animation;
`{element, text, time, forward, cursor, callback, timer}`

### `typewriter` parameters
The main function consists of 5 paramets, all have default values except for the _first one_.

| Parameter     | Description                                                 | Default value                 |
| ------------- |:----------------------------------------------------------- |:----------------------------- |
| `element`     | The element you want to perform the animation on            | none                          |
| `text`        | The text you want to be output as a result of the animation | `element.textContent`         |
| `time`        | The time it would take to print a single character          | 30 milliseconds               |
| `forward`     | Whether the text is output normally or backwards            | `true`                        |
| `cursor`      | An object with 2 properties, the first indicates whether to use a cursor effect at the end of the output text, and the second is for the type of the cursor to display (“_” and “\|”)                     | `{activated: false, type: 1}` |
| `callback`    | A function that will execut when the animation is finished  | function                      |

In addition to this, there is a helper function to keep at your disposal...

### `stoptypewriter` syntax
As the name suggests, this function stops a certain animation from executing.

### `stoptypewriter` parameters
This function acceps one parameter, and it's the object return by the `typewriter` function;
```js
function stoptypewriter(tw) {}
```

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

var tw = typewriter(document.getElementById('target'), 'Lorem Ipsum!', 1000, true, {activated: true, type: 1}, () => { alert('Animation finished')});
```
That would output '_Lorem Ipsum!_' in the paragraph element as if it's being written with a scrapped typewriter, each character will take _1000 milliseconds_ to be output, the animation will have a cursor of type 1 “\_”, and will trigger a function to execute when it's finished, alerting '_Animation finished_' for the user.

In order to stop the animation at any point, we can utilize the `stoptypewriter` function;

```js
// main.js

stoptypewriter(tw);
```
> Checkout the test.html file for usage examples.

## Credits
> Icon made by [**Freepik**](http://www.flaticon.com) from [www.flaticon.com](http://www.flaticon.com)
