import { style } from "@vanilla-extract/css";

export const linkCard = style({
  display: "flex",
  alignItems: "center",
  padding: "12px",
  gap: "24px",
  position: "relative",
});

export const editable = style({
  cursor: "pointer",
});

export const linkDelete = style({
  display: "none",
  position: "absolute",
  width: "32px",
  height: "32px",
  top: 0,
  right: 0,
  transform: "translate(50%, -50%)",
  cursor: "pointer",
  selectors: {
    [`${linkCard}:hover &`]: {
      display: "block",
    },
  },
});

export const thumbnail = style({
  width: "113px",
  height: "97px",
  flexShrink: 0,
  objectFit: "cover",
  borderRadius: "4px",
  border: "1px solid #d9d9d9",
});

export const container = style({
  overflow: "hidden",
});

export const linkTitle = style({
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "#000",
  fontSize: "20px",
  fontWeight: 700,
});

export const linkUrl = style({
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
