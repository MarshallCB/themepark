const { themepark } = require('./dist/index.js')

let theme = themepark({
  night: false,
  hue: 220
}, ({ night, hue }) => ({
  primary: `hsl(${hue},100%,50%)`,
  secondary: `hsl(${(hue + 15) % 360},100%,50%)`
}))

theme.$(({ night, hue, primary, secondary }) => {
  console.log(night) // false
  console.log(hue) // 220
  console.log(primary) // `hsl(220, 100%, 50%)`
  console.log(secondary) // `hsl(235, 100%, 50%)`
})

theme.hue = 230 // trigger subscribers to update
theme({
  hue: theme.$.hue + 30, // 260
  night: !theme.$.night
})
console.log(theme.primary) // var(--primary)
console.log(theme.$.primary) // `hsl(230,100%,50%)`
console.log(`${theme}`) // --primary:hsl(230,100%,50%);--secondary:hsl(245,100%,50%);
console.log(theme)