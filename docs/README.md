## Navigation

- [Constructor](#constructor)
- [Options](#options)
- [Methods](#methods)

## Constructor

The typewriter's constructor takes two parameters, a target and a set of options:

```js
Typewriter(target, options);
```

| Name    | Type   | Description                                                 | Example         |
| ------- | ------ | ----------------------------------------------------------- | --------------- |
| target  | string | The selector of the target element that hosts the animation | `#element-1`    |
| options | object | The object that initializes the typewriter                  | `{delay: 1000}` |

## Options

The typewriter can be configured in many ways using the options object, the following object represents the default values:

```js
options = {
	// The target selector
	target: "",

	// The delay in milliseconds before starting the animation
	delay: 0,

	// The interval in milliseconds between inputting every character
	tick: 300,

	// The typing sound config
	sound: {
		// Whether or not to enable the typing sounds
		enabled: false,

		// The volume of the typing sounds
		volume: 0.5,
	},

	// The cursor config
	cursor: {
		// The starting index of the cursor
		index: 0,

		// The type of the caret, can be “stick“, “underscore” or a name of your choosing
		type: "stick",

		// Whether or not the play a blinking animation on the caret
		blink: true,
	},
};
```

## Methods

### `type`:

#### Description:

Used to type a passed chunk of text

#### Prototype:

```js
type((text = ""), (config = {}));
```

#### Parameterss

| Name   | Type   | Description                                                                   |
| ------ | ------ | ----------------------------------------------------------------------------- |
| text   | string | The text to type                                                              |
| config | object | Optional config object that overrides the default options during this process |

#### Example:

```js
var tw = new Typewriter("#target");
tw.type("Text");
```
