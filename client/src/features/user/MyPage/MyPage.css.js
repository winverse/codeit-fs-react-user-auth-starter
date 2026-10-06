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
  overflow: "hidden",
});

export const name = style({
  fontSize: "24px",
  fontWeight: 700,
  margin: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const email = style({
  color: "#767676",
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const editButton = style({
  flexShrink: 0,
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

export const createLink = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  backgroundImage:
    "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23DBDBDB' stroke-width='2' stroke-dasharray='3%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
  borderRadius: "8px",
  padding: "40px",
  gap: "12px",
});
