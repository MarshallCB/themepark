<div align="center">
  <img src="https://github.com/marshallcb/themepark/raw/master/themepark.png" alt="Themepark" width="100" />
</div>

<h1 align="center">themepark</h1>
<div align="center">Reactive CSS Variables</div>
<div align="center">
  <a href="https://npmjs.org/package/themepark">
    <img src="https://badgen.now.sh/npm/v/themepark" alt="version" />
  </a>
  <a href="https://bundlephobia.com/result?p=themepark">
    <img src="https://img.badgesize.io/MarshallCB/themepark/master/min.js?compression=brotli" alt="install size" />
  </a>
</div>

---

## Features
- Write reactive CSS with minimal overhead
- Isomorphic (importable on both server and browser)
- Works on all modern browsers: [Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#Browser_compatibility)
- Super easy to support night mode

# Usage

### 1. Import Themepark (there are many ways to do this)

**Install package (via npm)**
```bash
npm i themepark
```
```js
// CJS syntax
var Themepark = require('themepark')
// OR new ES6 syntax
import Themepark from 'themepark';
```

**Script tag (via unpkg):**
```html
<!-- Available as global variable Themepark -->
<script src="https://unpkg.com/themepark"></script>
<!-- Later -->
<script>
  let theme = new Themepark(...); // your theme parameters / definitions go here
</script>
```

**Browser Module (via skypack):**
```js
import Themepark from 'https://cdn.skypack.dev/themepark';
```

### 2. Create and use theme

```js
  let theme = new Themepark({
    night: false,
    hue: 220
  }, function({ night, hue }){
    return {
      primary: `hsl(${hue}, 100%, 50%)`,
      background: night ? `hsl(${primary}, 20%, 20%)` : `white`,
      text: night ? `white` : `hsl(200, 20%, 20%)`
    }
  })

  // Apply these styles to the body element and subscribe to updates
  theme.style('body')

  // Manually subscribe to updates to the theme
  let subscription_id = theme.sub((vars) => {
    console.log(vars)
  })

  // (Later)
  theme.update({ night: true }) // Will automatically update body and trigger subscribed function above
  theme.update({ hue: 300 })

  console.log(theme.vars) // Get current vars in object form
  console.log(theme.params) // Get current parameters
  console.log(theme.css) // Get current vars in CSS form

  theme.unsub(subscripiton_id) // Remove subscription from earlier (clean up)
```

# API

### `let theme = new Themepark(parameters, definitions)`
Creates a new instance of Themepark

`parameters`: stateful values that can be used by `definitions` and can updated to trigger a recalculation of styles
`definitions`: a function that takes `parameters` as its input and returns an object corresponding to the desired CSS variables

**Example**
```js
let theme = new Themepark({
  night: true,
  hue: 220
}, ({ night, hue }) => ({
  primary: `hsl(${hue}, 100%, 50%)`, // primary color depends on the hue in parameters
  bg: night ? `#112` : `#fff` // if night mode, dark background - else, white background
}))
```

---

### `theme.update(new_parameters)`
Updates the parameters, CSS variables, and notifies all subscribers

`new_parameters`: partial object that will replace existing parameters with the same keys and trigger a theme update

**Example**
```js
theme.update({ night: false }); // turns background to dark

theme.update({
  night: true, // turn background white
  hue: (theme.params.hue + 30) % 360 // shift hue by 1/12 of the color wheel
})
```

---

### `theme.style(HTMLElement)` or `theme.style(CSSSelector)`
Adds node(s) to the list of subscribers for this theme. On theme update, themepark will set the `style` attribute with all CSS variables of the theme. Usually only needed for the `body` element (variables are inherited in CSS).

**Example**
```js
theme.style('body')
// OR
theme.style(document.querySelector('body'))
```

---

### `theme.subscribe(fn)`
Call a specified function for updates to the theme. Returns an ID for unsubscribing.

`fn`: callback function that receives `({ css, params, vars })` as parameters

**Example**
```js
let id = theme.subscribe(({ css, params, vars}) => {
  console.log(params)
  console.log(vars)
  console.log(css)
})

// Unsubscribe
theme.unsubscribe(id)
```

---

### `theme.params`
An object containing the current params (defined in constructor) of the theme

**Example**
```js
console.log(theme.params) // { hue: 250, night: false }
```

---

### `theme.vars`
An object representing the CSS variables

**Example**
```js
console.log(theme.vars) // { primary: 'hsl(250,100%,50%)', bg: '#fff' }
```

---

### `theme.css`
A CSS string of all the variables that can easily be injected in styles

**Example**
```js
console.log(theme.css) // '--primary:hsl(250,100%,50%);--bg:#fff;'
```

---

## License

MIT © [Marshall Brandt](https://m4r.sh)
