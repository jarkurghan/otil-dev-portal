import React from "react";
import "./LUPopup.css";

export default function LUPopup({ rank }) {
  return (
    <div className="lu-popup">
      <div className="lup-modal">
        <div className="lupmf-text">{rank.text}</div>
        <div className="lupm-full">
          <div className="lupmf-rank" style={{ "--rank": rank.rank }}></div>
        </div>
      </div>
    </div>
  );
}
