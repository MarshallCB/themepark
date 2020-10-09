<div align="center">
  <img src="https://github.com/marshallcb/themepark/raw/master/themepark.png" alt="Themepark" width="300" />
</div>

<h1 align="center">themepark</h1>
<div align="center">
  <a href="https://npmjs.org/package/themepark">
    <img src="https://badgen.now.sh/npm/v/themepark" alt="version" />
  </a>
  <a href="https://bundlephobia.com/result?p=themepark">
    <img src="https://img.badgesize.io/MarshallCB/themepark/master/min.js?compression=brotli" alt="install size" />
  </a>
</div>

<div align="center">Reactive CSS Variables</div>

---

## Features
- Write reactive CSS with minimal overhead
- SSR friendly (server-side rendering)
- Works on all modern browsers: [Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#Browser_compatibility)

# Usage

## Installation

Script tag (via unpkg):
```html
<!-- Available as global variable themepark -->
<script src="https://unpkg.com/themepark" />
```

Browser Module (via snowpack):
```js
import { Theme } from 'https://cdn.skypack.dev/themepark';
```

## Overview

### Server
```js
  import { generateCSSVars } from 'themepark';

  // generateCSSVars(defaults, definitions)
  let { css, values } = generateCSSVars({ night: false, hue: 220 }, {
    primary: ({ hue }) => `hsl(${hue}, 100%, 50%)`,
    background: ({ night, primary }) => night ? `hsl(${primary}, 20%, 20%)` : `white`,
    text: ({ night }) => night ? `white` : `hsl(200, 20%, 20%)`
  })

  console.log(css) // -> "--primary:hsl(220,100%,50%);--background:white;--text:hsl(200,20%,20%)"
  console.log(values) // -> { primary: "hsl(220,100%,50%)", background: "white", text: "hsl(200,20%,20%)" }
```

### Browser
```js
  import { Theme } from 'themepark'
  // new Themepark(defaults, definitions)
  let theme = new Theme({ night: false, hue: 220 }, {
    primary: ({ hue }) => `hsl(${hue}, 100%, 50%)`,
    background: ({ night, primary }) => night ? `hsl(${primary}, 20%, 20%)` : `white`,
    text: ({ night }) => night ? `white` : `hsl(200, 20%, 20%)`
  })
  // Apply these styles to the body element
  theme.style('body')
  let subscription_id = theme.sub((vars) => {
    console.log(vars)
  })

  // (Later)
  theme.update({ night: true }) // Will automatically update body and trigger subscribed function above
  theme.update({ hue: 300 })

  console.log(theme.vars) // Get current vars in object form
  console.log(theme.params) // Get current parameters
  console.log(Theme.toCSSVars(theme.vars)) // Convert object to CSS Variables

  theme.unsub(subscripiton_id) // Remove subscription from earlier (clean up)
```

## API

### Server

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

  let { vars, css } = generateCSSVars(params, definitions)

  console.log(css)
  // --primary:hsl(220,100%,50%);--background:white;text:hsl(200,20%,20%);
  console.log(vars) 
  // { primary: 'hsl(220,100%,50%)', background: 'white', text: 'hsl(220,20%,20%)' }
```

### Themepark

Useful for creating a reactive theme on the browser


## Examples

Coming soon

## Details

<details>
  <summary><strong>About CSS Variables</strong></summary>
  <div>
    Coming soon
  </div>
</details>
<details>
  <summary><strong>CSS Strategy</strong></summary>
  <div>
    Coming soon
  </div>
</details>

---

## License

MIT © [Marshall Brandt](https://m4r.sh)
