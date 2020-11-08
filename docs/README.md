## Navigation

- [Constructor](#constructor)
- [Options](#options)
- [Methods](#methods)
- [Chaining](#chaining)
- [Caret](#caret)

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

TypewriterJS offers various methods to emulate typewriters, all of them are promise-based:

---

### `type`:

#### Description:

> Used to type a passed chunk of text.

#### Prototype:

```js
type((text = ""), (config = {}));
```

#### Parameters:

| Name   | Type   | Description                                                                   |
| ------ | ------ | ----------------------------------------------------------------------------- |
| text   | string | The text to type                                                              |
| config | object | Optional config object that overrides the default options during this process |

#### Example:

> _Typing “Text”_

```js
var tw = new Typewriter("#target");
tw.type("Text");
```

[Try it on Codepen](https://codepen.io/eoussama/pen/eYzLqEY)

---

### `delete`:

#### Description:

> Used to delete a select number of characters relative to the position of the cursor

#### Prototype:

```js
delete ((chars = 1), (config = {}));
```

#### Parameters:

| Name   | Type   | Description                                                                   |
| ------ | ------ | ----------------------------------------------------------------------------- |
| chars  | number | The number of characters to delete                                            |
| config | object | Optional config object that overrides the default options during this process |

#### Example:

> _Deleting three characters_

```js
var tw = new Typewriter("#target", { text: "Text" });
tw.delete(3);
```

[Try it on Codepen](https://codepen.io/eoussama/pen/OJXoKzw)

---

### `stop`:

#### Description:

> Used to stop the running process (typing or deleting)

#### Prototype:

```js
stop((config = {}));
```

#### Parameters:

| Name   | Type   | Description                                                                   |
| ------ | ------ | ----------------------------------------------------------------------------- |
| config | object | Optional config object that overrides the default options during this process |

#### Example:

> _Stopping typing after 1.5 seconds_

```js
var tw = new Typewriter("#target");
tw.type("Lorem ipsum dolor sit amet, consectetur adipiscing elit");
tw.stop({ delay: 1500 });
```

---

### `resume`:

#### Description:

> Used to resume the last stopped process (be it typing or deleting)

#### Prototype:

```js
resume((config = {}));
```

#### Parameters:

| Name   | Type   | Description                                                                   |
| ------ | ------ | ----------------------------------------------------------------------------- |
| config | object | Optional config object that overrides the default options during this process |

#### Example:

> Resuming deleting after 0.5 seconds of it being stopped\_

```js
var tw = new Typewriter("#target", {
	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
});

tw.delete(20);

tw.stop({ delay: 1000 }).then(() => {
	tw.resume({ delay: 500 });
});
```

---

### `clear`:

#### Description:

> Used to clear the content of the target

#### Prototype:

```js
clear((config = {}));
```

#### Parameters:

| Name   | Type   | Description                                                                   |
| ------ | ------ | ----------------------------------------------------------------------------- |
| config | object | Optional config object that overrides the default options during this process |

#### Example:

> _Clearing the text after 2 seconds_

```js
var tw = new Typewriter("#target", {
	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
});

tw.clear({ delay: 2000 });
```

---

### `move`:

#### Description:

> Used to move the cursor around

#### Prototype:

```js
move(index);
```

#### Parameters:

| Name  | Type   | Description                                 |
| ----- | ------ | ------------------------------------------- |
| index | number | The new index of the cursor starting from 0 |

#### Example:

> _Moving the cursor after the 3rd character_

```js
var tw = new Typewriter("#target", {
	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
});

tw.move(3);
```

## Chaining

The quirk of TypewriterJS lays in chaning, here's a simple example:

```js
var tw = new Typewriter("#target", {
	tick: 500,
	delay: 1000,
	sound: { enabled: true },
	cursor: { blink: true },
});

tw.type("world!").then((e) => e.type("Hello", { cursor: { index: 0 } }));
```

[Try it on Codepen](https://codepen.io/eoussama/pen/dyXqxdR)

## Caret

Carets come in two types, “stick” and “underscrore”, but you can also customize it the way you want:

### Example

> The string that we pass as the type of the cursor acts as a suffixe to the cursor's class, so it's always going to be `.eo-typewriter__cursor--[TYPE]`, in our example, it's `.eo-typewriter__cursor--my-custom-caret`:

```js
var tw = new Typewriter(".custom", { cursor: { type: "my-custom-caret" } });
```

```css
.eo-typewriter__cursor--my-custom-caret::after {
	content: "¶";
	color: red;
}
```

[Try it on Codepen](https://codepen.io/eoussama/pen/JjKagvE)
