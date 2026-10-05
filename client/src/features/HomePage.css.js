import { style } from "@vanilla-extract/css";

export const header = style({
  textAlign: "center",
});

export const heading = style({
  color: "#1d1d1d",
  fontSize: "40px",
  fontWeight: 700,
  letterSpacing: "-1.6px",
  margin: 0,
});

export const accent = style({
  display: "inline-block",
  color: "#6d00e1",
  fontWeight: 900,
  position: "relative",
  "::after": {
    content: '" "',
    display: "block",
    position: "absolute",
    bottom: "4px",
    left: 0,
    width: "111px",
    height: "9px",
    borderRadius: "9999px",
    background: "rgba(123, 0, 255, 0.2)",
  },
});

export const description = style({
  color: "#6b6b6b",
  fontSize: "20px",
  fontWeight: 500,
  letterSpacing: "-0.4px",
  margin: "12px 0",
});

export const cta = style({
  margin: "40px 0 80px",
});

export const hero = style({
  position: "relative",
  width: "100%",
  height: "600px",
});

export const heroLeft = style({
  userSelect: "none",
  position: "absolute",
  minWidth: "360px",
  width: "30%",
  top: 0,
  left: 0,
});

export const heroCenter = style({
  userSelect: "none",
  position: "absolute",
  minWidth: "435px",
  width: "33%",
  top: "-5px",
  left: "50%",
  transform: "translate(-50%, 0)",
  zIndex: 1,
});

export const heroRight = style({
  userSelect: "none",
  position: "absolute",
  minWidth: "360px",
  width: "30%",
  top: 0,
  right: 0,
});
