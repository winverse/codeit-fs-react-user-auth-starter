import { style } from "@vanilla-extract/css";

export const horizontalRule = style({
  border: "none",
  width: "auto",
  height: "1px",
  backgroundColor: "#e1e1e1",
  flexGrow: 1,
});

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

export const text = style({
  color: "#636363",
});
