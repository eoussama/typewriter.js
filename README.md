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
This is all centered on one function typewriter, with multiple parameters to control all sorts of aspects of the animation, more on this in the documentation below...

## Documentation
### Syntax
As we've hinted previously, currently, there is only one function that does all of the work, let's break it down;
```js
function typewriter(element, text, time, forward, cursor) {}
```

### parameters
The main function consists of 5 paramets, all have default values except for the _first one_.

| Parameter     | Description                                                 | Default value                 |
| ------------- |:----------------------------------------------------------- |:----------------------------- |
| `element`     | The element you want to perform the animation on            | none                          |
| `text`        | The text you want to be output as a result of the animation | `element.textContext`         |
| `time`        | The time it would take to print a single character          | 30 milliseconds               |
| `forward`     | Whether the text is output normally or backwards            | `true`                        |
| `cursor`      | An object with 2 properties, the first indicates whether to use a cursor effect at the end of the output text, and the second is for the type of the cursor to display (“_” and “\|”)                     | `{activated: false, type: 1}` |

> Checkout the test.html file for usage examples.

## Credits
> Icon made by [**Freepik**](http://www.flaticon.com) from [www.flaticon.com](http://www.flaticon.com)
