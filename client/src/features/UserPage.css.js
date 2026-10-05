import { style } from "@vanilla-extract/css";

export const header = style({
  borderRadius: "8px",
  backgroundColor: "#f2f2f2",
});

export const profile = style({
  display: "flex",
  alignItems: "center",
  padding: "32px 24px",
  gap: "16px",
});

export const values = style({
  flexGrow: 1,
});

export const name = style({
  fontSize: "24px",
  fontWeight: 700,
  margin: 0,
});

export const email = style({
  color: "#767676",
  fontWeight: 500,
});

export const bio = style({
  margin: 0,
  padding: "28px",
});

export const horizontalRule = style({
  margin: "24px 0",
});

export const linkList = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  listStyle: "none",
  padding: 0,
});
