/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";

export default function UserActivity() {
  // const [rows, setRows] = useState([]);
  // useEffect(() => {
  //   getUserActivity();
  // }, []);
  // const getUserActivity = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_URL}/api/idp/v2/user/activity`, {
  //       headers: {
  //         Authorization: sessionStorage.getItem("token"),
  //       },
  //     })
  //     .then((res) => {
  //       setRows(res.data.data);
  //     })
  //     .catch((err) => {
  //       toast.error("An error occurred");
  //     });
  // };

  return (
    <div className="u-activity">
      User activity
      {/* {rows.length > 0 && <h2>User activity</h2>}
      {rows.map((row) => (
        <div key={row.id} className="ua">
          <span className="ua-name">{row.name}</span>
          <span className="ua-activity">
            {row.items.map((item) => (
              <span key={item.date}>
                <Tooltip
                  title={
                    (item.login ? item.login + " login, " : "") +
                    secondtotime(item.seconds)
                  }
                >
                  <span className="ua-block">
                    <span
                      className={"ua-item uad" + degree(item.seconds)}
                    ></span>
                  </span>
                </Tooltip>
              </span>
            ))}
          </span>
        </div>
      ))} */}
    </div>
  );
}

function secondtotime(sec = 0) {
  let text = "";
  if (sec >= 3600) {
    text += parseInt(sec / 3600) + "h ";
    sec = sec - parseInt(sec / 3600) * 3600;
  }
  if (sec >= 60) {
    text += parseInt(sec / 60) + "m ";
    sec = sec - parseInt(sec / 60) * 60;
  }
  text += sec + "s online";
  return text;
}

function degree(sec) {
  if (sec === 0) return 1;
  else if (sec < 900) return 2;
  else if (sec < 1800) return 3;
  else if (sec < 3600) return 4;
  else return 5;
}
