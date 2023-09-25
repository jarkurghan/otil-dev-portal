import React from "react";
import "./LUSwitch.css";

export default function LUSwitch({ action, rows, index, setRows }) {
    return (
        <label className="lu-switch">
            <input
                type="checkbox"
                defaultChecked={rows[index].actions[action]}
                onChange={(e) => {
                    rows[index].actions[action] = !rows[index].actions[action];
                    setRows(rows);
                }}
            />
            <span className="lu-slider"></span>
        </label>
    );
}
