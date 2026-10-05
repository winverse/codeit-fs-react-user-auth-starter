import { style } from "@vanilla-extract/css";

export const heading = style({
  fontSize: "24px",
  fontWeight: 700,
  margin: "32px 0",
});

export const label = style({
  display: "block",
  width: "100%",
  margin: 0,
});

export const input = style({
  display: "block",
  width: "100%",
  margin: "8px 0 24px",
});

export const button = style({
  display: "block",
  width: "100%",
  fontSize: "20px",
  fontWeight: 700,
  margin: "40px 0 32px",
});

export const horizontalRule = style({
  margin: "32px 0",
});

export const googleButton = style({
  display: "flex",
  width: "100%",
  fontSize: "18px",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  margin: "24px 0",
  color: "#000000",
});
