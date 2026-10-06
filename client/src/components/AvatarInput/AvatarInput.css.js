import { style } from "@vanilla-extract/css";

export const avatarInput = style({
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  border: "1px solid #d9d9d9",
  padding: "24px",
  gap: "24px",
});

export const uploadButton = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const hiddenInput = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "1px",
  height: "1px",
  opacity: 0,
});
