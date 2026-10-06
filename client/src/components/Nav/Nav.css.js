import { style } from "@vanilla-extract/css";

export const container = style({
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #d9d9d9",
  padding: "16px 24px",
});

export const nav = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "var(--max-width)",
  margin: "0 auto",
  minHeight: "48px",
});

export const publicNav = style({
  justifyContent: "center",
  alignItems: "center",
});

export const logo = style({
  height: "16px",
});

export const menu = style({
  display: "flex",
  gap: "16px",
  alignItems: "center",
});

export const divider = style({
  width: "1px",
  height: "32px",
  backgroundColor: "#dbdbdb",
  margin: "0 8px",
});
