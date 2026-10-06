import { style } from "@vanilla-extract/css";

export const button = style({
  display: "inline-block",
  padding: "13px 24px",
  border: "none",
  borderRadius: "8px",
  fontWeight: 500,
  textDecoration: "none",
  cursor: "pointer",
});

export const primary = style({
  selectors: {
    [`${button}&`]: {
      color: "#ffffff",
      backgroundColor: "var(--primary-color)",
    },
  },
});

export const secondary = style({
  selectors: {
    [`${button}&`]: {
      color: "#000000",
      backgroundColor: "#e7e7e7",
    },
  },
});

export const outline = style({
  selectors: {
    [`${button}&`]: {
      backgroundColor: "#ffffff",
      border: "1px solid #e1e1e1",
    },
  },
});
