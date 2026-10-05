import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html", {
  fontFamily: "var(--font-noto-sans-kr), sans-serif",
  fontSize: "16px",
});

globalStyle(":root", {
  vars: {
    "--primary-color": "#7b00ff",
    "--max-width": "1440px",
  },
});

globalStyle("body", {
  margin: 0,
});
