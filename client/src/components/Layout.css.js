import { style } from "@vanilla-extract/css";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  minHeight: "100vh",
});

export const dark = style({
  backgroundColor: "#fcfcfc",
});

export const main = style({
  flexGrow: 1,
  padding: "32px",
});

export const landing = style({
  padding: "96px 32px",
});

export const container = style({
  width: "100%",
  maxWidth: "440px",
  margin: "0 auto",
});

export const fullLayout = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  minHeight: "100vh",
  padding: "80px",
});

export const backLinkContainer = style({
  marginBottom: "40px",
});

export const backLink = style({
  width: "24px",
  height: "24px",
  cursor: "pointer",
});
