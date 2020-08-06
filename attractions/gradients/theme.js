import { huebris, mixHues } from 'huebris'

export default {
  parameters: { // Top-level editable values
    primary: 220,
    secondary: 250,
    night: false,
    highContrast: false
  },
  vars: { // Dynamic vars to be used in CSS
    night: ({ night }) => night ? 1.0 : 0.0, // Can be used for logic on numerical values in CSS via calc(night * (<night value>) + (1-night) * (<day value))
    cornerRadius: `16px`,
    layer1: ({ night, primary }) => night ? huebris(primary, 0.30, 0.15) : `#fff`, // Huebris(h,s,l) => hsl() with adjusted saturation/lightness
    layer2: ({ night, primary }) => night ? huebris(primary, 0.25, 0.22) : "#fff",
    primary: ({ primary }) => huebris(primary, 1, 0.5),
    hue1: ({ primary, secondary }) => mixHues(primary, secondary, 0.00),
    hue2: ({ primary, secondary }) => mixHues(primary, secondary, 0.25),
    hue3: ({ primary, secondary }) => mixHues(primary, secondary, 0.50),
    hue4: ({ primary, secondary }) => mixHues(primary, secondary, 0.75),
    hue5: ({ primary, secondary }) => mixHues(primary, secondary, 1.00),
    textColor: ({ night }) => night ? `hsl(220,50%,95%)` : `hsl(220, 50%, 20%)`, // Normal HSL allowed 
    quiet: ({ night }) => night ? `hsl(220, 30%, 80%)` : `hsl(220, 30%, 30%)`
  }
}