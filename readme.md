<div align="center">
  <img src="https://github.com/marshallcb/themepark/raw/master/themepark.png" alt="Themepark" width="100" />
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

<div align="center">
  <a href="#Usage"><b>Usage</b></a> | 
  <a href="#Examples"><b>Examples</b></a> | 
  <a href="#API"><b>API</b></a> | 
  <a href="#Details"><b>Details</b></a>
</div>

---

## Features
- Write reactive CSS with minimal overhead
- SSR friendly (server-side rendering)
- Works on all modern browsers: [Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#Browser_compatibility)

# Usage

## Server

### Install themepark to your project
```
npm i themepark
```

### Create and use theme
```js
// 1. Import themepark
import Themepark from 'themepark';

// 2. Create theme
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

// 3. Use theme's values
console.log(theme.css)
// --primary:hsl(220,100%,50%);--background:white;text:hsl(200,20%,20%);
console.log(theme.vars) 
// { primary: 'hsl(220,100%,50%)', background: 'white', text: 'hsl(220,20%,20%)' }

```

## Browser

### Import Themepark (there are many ways to do this)

*Script tag (via unpkg):*
```html
<!-- Available as global variable Themepark -->
<script src="https://unpkg.com/themepark" />
```

*Browser Module (via skypack):*
```js
import Themepark from 'https://cdn.skypack.dev/themepark';
```

### Create and use theme

```js
  import Theme from 'themepark'
  // new Themepark(defaults, definitions)
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

  // Subscribe to updates to the theme
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

# Examples

Coming soon

# API

Coming soon

# Details

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
