const colors = require("tailwindcss/colors");
export default {
  names: Object.keys(colors).filter(
    name => name !== "black" && name !== "white"
  ),
  shades: colorName => colors[colorName]
};
