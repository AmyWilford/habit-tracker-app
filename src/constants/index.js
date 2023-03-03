const colors = {
  background: "#E5E0DD",
  text: "#2E2C2C",
  white: "#ffffff",
  primary: "#F4592F",
  accent: "#72CACD",

};

const sizes = {
  padding: 8,
  borderRadius: 10,
  textBoxRadius: 25,
  h1: 32,
  text: 16,
};

const fonts = {
  title_text: {
    fontSize: sizes.h1,
    fontFamily: "Quicksand-Medium",
    color: colors.primary,
    textTransform: "uppercase"
  },
  task_text: {
    fontSize: sizes.text,
    fontFamily: "Hind-Light",
    color: colors.text,
  },
};

const shadow = {
  elevation: 3,
  shadowColor: colors.text,
  shadowOffset: { width: 2, height: 12 },
};

export { colors, sizes, fonts, shadow };
