import React from "react";

const style0 = { position: "relative" };
const style = {
  display: "inline-block",
  width: "18px",
  height: "8px",
  transform: "rotate(-45deg)",
  borderLeft: "2px solid rgb(76, 175, 80)",
  borderBottom: "2px solid rgb(76, 175, 80)",
  position: "absolute",
  top: "-8px",
  left: "-9px",
};
const style1 = {
  display: "inline-block",
  width: "18px",
  height: "18px",
  position: "absolute",
  transform: "rotate(-45deg) translate(8%, -34%)",
  borderTop: "2px solid rgb(239, 83, 80)",
};
const style2 = {
  display: "inline-block",
  width: "18px",
  height: "18px",
  position: "absolute",
  transform: "rotate(135deg) translate(36%, 79%)",
  borderLeft: "2px solid rgb(239, 83, 80)",
};

export default function LUCheck({ bool }) {
  return bool ? (
    <span style={style0}>
      <span style={style}></span>
    </span>
  ) : (
    <span style={style0}>
      <span style={style1}></span>
      <span style={style2}></span>
    </span>
  );
}
