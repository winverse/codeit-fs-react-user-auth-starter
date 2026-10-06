import { style } from "@vanilla-extract/css";

export const avatar = style({
  width: "212px",
  height: "212px",
  borderRadius: "50%",
  objectFit: "cover",
});

export const large = style({
  width: "80px",
  height: "80px",
});

export const medium = style({
  width: "54px",
  height: "54px",
});

export const small = style({
  width: "48px",
  height: "48px",
});
