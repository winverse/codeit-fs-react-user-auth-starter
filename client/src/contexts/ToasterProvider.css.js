import { style } from "@vanilla-extract/css";

export const toastContainer = style({
  position: "fixed",
  display: "flex",
  flexDirection: "column-reverse",
  gap: "24px",
  justifyContent: "center",
  alignItems: "center",
  top: "64px",
  left: "50%",
  transform: "translateX(-50%)",
  pointerEvents: "none",
  transition: "height 0.5s ease-in-out",
});

export const toast = style({
  display: "flex",
  borderRadius: "8px",
  padding: "12px 24px",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  position: "relative",
  top: "-8px",
  opacity: 0,
  transition: "top 0.1s ease-in-out, opacity 0.1s ease-in-out",
});

export const mounted = style({
  top: 0,
  opacity: 1,
});

export const icon = style({
  width: "24px",
  height: "24px",
});

export const info = style({
  color: "#ffffff",
  backgroundColor: "#299d65",
});

export const warn = style({
  color: "#ffffff",
  backgroundColor: "#ff5733",
});
