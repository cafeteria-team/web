const fontSizes = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "36px",
  "48px",
  "80px",
  "96px",
];
const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const lineHeights = [1, 1.25, 1.5];
const radii = ["0px", "2px", "4px", "8px", "16px", "48px"];
const space = [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512];

const theme = {
  breakpoints: [32, 48, 64],

  space,
  fontSizes,
  fontWeights,
  lineHeights,

  colors: {
    black: "#000",
    white: "#fff",
    transparent: "transparent",
    blue: "#2065D1",
    gray: "#aaa",
    red: "#eb5757",
    orange: "#ff9030",
  },

  shadow: "2px 4px 12px rgb(0 0 0 / 8%)",

  radii,
};

/** Fonts */
theme.fontSizes.body = fontSizes[2];
theme.fontSizes.title = fontSizes[3];
theme.fontSizes.subTitle = fontSizes[1];

theme.fontSizes.pageHeading = fontSizes[5];
theme.fontSizes.h1 = fontSizes[5];
theme.fontSizes.h2 = fontSizes[4];
theme.fontSizes.h3 = fontSizes[3];

theme.fontWeights.normal = fontWeights[3];
theme.fontWeights.bold = fontWeights[5];
theme.fontWeights.extraBold = fontWeights[7];

theme.lineHeights.normal = lineHeights[0];
theme.lineHeights.title = lineHeights[1];
theme.lineHeights.paragraph = lineHeights[2];

/** Radius */
theme.radii.button = radii[2];
theme.radii.rounded = radii[5];

/** Space */
theme.space.zero = space[0];
theme.space.small = space[1];
theme.space.medium = space[2];
theme.space.large = space[3];
theme.space.xlarge = space[4];
theme.space.xxlarge = space[5];

export default theme;
