<div align="center">
  <img src="https://github.com/marshallcb/themepark/raw/master/themepark.png" alt="Themepark" width="300" />
</div>

<h1 align="center">Themepark</h1>
<div align="center">
  <a href="https://npmjs.org/package/themepark">
    <img src="https://badgen.now.sh/npm/v/themepark" alt="version" />
  </a>
  <a href="https://bundlephobia.com/result?p=themepark">
    <img src="https://img.badgesize.io/MarshallCB/themepark/master/min.js?compression=brotli" alt="install size" />
  </a>
</div>

<div align="center">Tiny library for reactive CSS Variable themes (WIP)</div>

## Features
- Returns CSS variable definitions (string)
- Custom reactive definitions
- Works on both server and client
- Works on all modern browsers: (Browser Compatibility)[https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#Browser_compatibility]

# Usage

## Installation

Guided tutorial on path.cafe (coming soon)

Via NPM:
```sh
npm install huebris
```

Script tag (via unpkg):
```html
<script src="" />
```

Browser Module (via unpkg):
```js
import { palette } from '';
```

## API

### Server
```js
  import { generateTheme } from 'themepark';

  // generateTheme(defaults, definitions)
  let { css, values } = generateTheme({ night: false, hue: 220 }, {
    primary: ({ hue }) => `hsl(${hue}, 100%, 50%)`,
    background: ({ night, primary }) => night ? `hsl(${primary}, 20%, 20%)` : `white`,
    text: ({ night }) => night ? `white` : `hsl(200, 20%, 20%)`
  })

  console.log(css) // -> "--primary:hsl(220,100%,50%);--background:white;--text:hsl(200,20%,20%)"
  console.log(values) // -> { primary: "hsl(220,100%,50%)", background: "white", text: "hsl(200,20%,20%)" }
```

### Browser
```js
  import { Themepark } from 'themepark'
  // new Themepark(defaults, definitions)
  let theme = new Themepark({ night: false, hue: 220 }, {
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
  console.log(Themepark.toCSSVars(theme.vars)) // Convert object to CSS Variables

  theme.unsub(subscripiton_id) // Remove subscription from earlier (clean up)
```

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

- - -

# Development

### Contributing Guidelines

### Commands

Guided process to commit changes and/or submit a pull request
```sh
npm run save
```

### Roadmap
- Accessibility contrast guarantees with automated testing
- High contrast flag
- Alternate formulations
- Make a show-off list
- Examples & Tutorials

## Acknowledgements
- [HSLuv](https://www.hsluv.org/comparison/)
- [Color Vision](https://en.wikipedia.org/wiki/Color_vision)
- [Luminance Formulas](https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color)

## License

MIT © [Marshall Brandt](https://m4r.sh)
