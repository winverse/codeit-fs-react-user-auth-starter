import { style } from "@vanilla-extract/css";

export const input = style({
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #d9d9d9",
  color: "#000000",
  "::placeholder": {
    color: "#8c8c8c",
  },
});
