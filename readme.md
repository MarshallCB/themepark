<div align="center">
  <img src="https://github.com/marshallcb/themepark/raw/main/meta/themepark.png" alt="Themepark" width="100" />
</div>

<h1 align="center">themepark</h1>
<div align="center">
  <a href="https://npmjs.org/package/themepark">
    <img src="https://badgen.now.sh/npm/v/themepark" alt="version" />
  </a>
  <a href="https://bundlephobia.com/result?p=themepark">
    <img src="https://img.badgesize.io/MarshallCB/themepark/main/es.js?compression=brotli" alt="install size" />
  </a>
</div>

<div align="center">Reactive CSS Variables</div>

---

## Features
- Write reactive CSS with minimal overhead
- Isomorphic (importable on both server and browser)
- Works on all modern browsers: [Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#Browser_compatibility)
- Super easy to support night mode

# Usage

### 1. Import Themepark

**Install package (via npm)**
```bash
npm i themepark
```
```js
// ESM syntax
import { themepark } from 'themepark';
// CJS syntax
var { themepark } = require('themepark')
```

**Script tag (via unpkg):**
```html
<!-- Available as global variable themepark -->
<script src="https://unpkg.com/themepark"></script>
<!-- Later -->
<script>
  let theme = themepark(/***/); // theme parameters / definitions go here
</script>
```

**Browser Module (via skypack):**
```js
import { themepark } from 'https://cdn.skypack.dev/themepark';
```

### 2. Create and use theme

```js
  // Initialize theme
  let theme = themepark({
    night: false,
    hue: 220
  }, ({ night, hue }) => ({
    primary: `hsl(${hue}, 100%, 50%)`,
    background: night ? `hsl(${primary}, 20%, 20%)` : `white`,
    text: night ? `white` : `hsl(200, 20%, 20%)`
  }))

  // Subscribe to changes in the theme
  let unsub = theme.$(({ night, hue, primary, background, text }) => {
    console.log(night) // false
    console.log(primary) // hsl(220,100%,50%)
  })

  // Unsubcribe from updates
  unsub()

  // Apply CSS var definitions to the body element and auto-subscribe to updates
  theme.$('body')

  // Directly access values (sync)
  console.log(theme.$.primary) // `hsl(220,100%,50%)`
  console.log(theme.$.night) // false

  // Update theme granularly
  theme.hue = 120;

  // Update theme with multiple changes
  theme({
    hue: 320,
    night: true
  })

  // Get CSS var definitions as string
  console.log(theme.toString()) // --primary:hsl(320,100%,50%);--background:hsl(320,20%,20%);--text:white;

  // Get var reference as string
  console.log(theme.text) // var(--text)
  

```

# API

### `let theme = themepark(parameters, definitions)`
Creates a new instance of Themepark

`parameters`: stateful values that can be used by `definitions` and can updated to trigger a recalculation of styles
`definitions`: a function that takes `parameters` as its input and returns an object corresponding to the desired CSS variables

**Example**
```js
let theme = themepark({
  night: true,
  hue: 220
}, ({ night, hue }) => ({
  primary: `hsl(${hue}, 100%, 50%)`, // primary color depends on the hue in parameters
  bg: night ? `#112` : `#fff` // if night mode, dark background - else, white background
}))
```

---

### `theme.$(() => {})`
Subscribe to theme updates

---

### `theme.$(CSS_Query)`
Finds all DOM elements with matching CSS query and automatically style those elements

---

### `theme.$[var_name]`
Synchronously get the value of `var_name`

---

### `theme[var_name]`
Get the string of the CSS variable (for inserting directly into styles)

Ex: `theme.primary ~> "var(--primary)"`

---

### `theme[param] = value`
Update a parameter, recompute css vars, and trigger all subscribers to update

---

### `theme(obj)`
Assigns all properties in `obj` to `params` and triggers all subscribers to update

---

## License

MIT © [Marshall Brandt](https://m4r.sh)
