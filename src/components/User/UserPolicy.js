import React from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import { green } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function UserPolicies() {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState(null);
  useEffect(() => {
    getUserPolicies();
  }, []);

  const getUserPolicies = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/otil/v1/api/user/actions`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setRows(res.data);
        let x = [];
        for (let i = 0; i < res.data.length; i++) {
          const element = {
            id: res.data[i].id,
            name: res.data[i].name,
            actions: { ...res.data[i].actions },
          };
          x.push(element);
        }
        setData(x);
      })
      .catch((err) => {
        toast.error("An error occurred");
      });
  };

  function isChange() {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].actions.secret_key !== rows[i].actions.secret_key ||
        data[i].actions.secret_key_admin !== rows[i].actions.secret_key_admin ||
        data[i].actions.create_project !== rows[i].actions.create_project
      )
        return true;
    }
    return false;
  }

  async function submit() {
    setSelect(null);
    await axios
      .patch(`${process.env.REACT_APP_URL}/otil/v1/api/user/action`, rows, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        await getUserPolicies();
        toast.success("Successfully updated!");
      })
      .catch((err) => {
        toast.error("An error occurred");
      });
  }

  function cancelChange() {
    let x = [];
    for (let i = 0; i < data.length; i++) {
      const element = {
        id: data[i].id,
        name: data[i].name,
        role: rows[i].role,
        actions: {
          create_project: data[i].actions.create_project,
          secret_key: data[i].actions.secret_key,
          secret_key_admin: data[i].actions.secret_key_admin,
        },
      };
      x.push(element);
    }
    setRows(x);
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      {rows.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-6xl">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-11 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Create User
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                View word history
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                View word full history
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Settings User
              </th>
              <th scope="col" className="px-6 py-3 text-center"></th>
              <th scope="col" className="px-6 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-11 p-4">{row.name}</td>
                <td className="px-6 text-center">
                  {row.id !== select ? (
                    row.actions.CUU ? (
                      <CheckIcon sx={{ color: green[500] }} />
                    ) : (
                      <CloseIcon sx={{ color: red[400] }} />
                    )
                  ) : (
                    <Switch
                      defaultChecked={row.actions.CUU}
                      value={row.actions.CUU}
                      onChange={(e) => {
                        let x = rows.findIndex((e) => e.id === row.id);
                        rows[x].actions.CUU = !rows[x].actions.CUU;
                        setRows(rows);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  )}
                </td>
                <td className="px-6 text-center">
                  {row.id !== select ? (
                    row.actions.VWH ? (
                      <CheckIcon sx={{ color: green[500] }} />
                    ) : (
                      <CloseIcon sx={{ color: red[400] }} />
                    )
                  ) : (
                    <Switch
                      defaultChecked={row.actions.VWH}
                      value={row.actions.VWH}
                      onChange={(e) => {
                        let x = rows.findIndex((e) => e.id === row.id);
                        rows[x].actions.VWH = !rows[x].actions.VWH;
                        setRows(rows);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  )}
                </td>
                <td className="px-6 text-center">
                  {row.id !== select ? (
                    row.actions.VWF ? (
                      <CheckIcon sx={{ color: green[500] }} />
                    ) : (
                      <CloseIcon sx={{ color: red[400] }} />
                    )
                  ) : (
                    <Switch
                      defaultChecked={row.actions.VWF}
                      value={row.actions.VWF}
                      onChange={(e) => {
                        let x = rows.findIndex((e) => e.id === row.id);
                        rows[x].actions.VWF = !rows[x].actions.VWF;
                        setRows(rows);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  )}
                </td>
                <td className="px-6 text-center">
                  {row.id !== select ? (
                    row.actions.SUA ? (
                      <CheckIcon sx={{ color: green[500] }} />
                    ) : (
                      <CloseIcon sx={{ color: red[400] }} />
                    )
                  ) : (
                    <Switch
                      defaultChecked={row.actions.SUA}
                      value={row.actions.SUA}
                      onChange={(e) => {
                        let x = rows.findIndex((e) => e.id === row.id);
                        rows[x].actions.SUA = !rows[x].actions.SUA;
                        setRows(rows);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  )}
                </td>
                {/*    <td className="px-6 text-center">
                  {row.id !== select ? (
                    row.actions.secret_key ? (
                      <CheckIcon sx={{ color: green[500] }} />
                    ) : (
                      <CloseIcon sx={{ color: red[400] }} />
                    )
                  ) : (
                    <Switch
                      defaultChecked={row.actions.secret_key}
                      value={row.actions.secret_key}
                      onChange={(e) => {
                        let x = rows.findIndex((e) => e.id === row.id);
                        rows[x].actions.secret_key =
                          !rows[x].actions.secret_key;
                        if (rows[x].actions.secret_key === false)
                          rows[x].actions.secret_key_admin = false;
                        setRows(rows);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  )}
                </td>
                <td className="px-6 text-center">
                  {row.id !== select ? (
                    row.actions.secret_key_admin ? (
                      <CheckIcon sx={{ color: green[500] }} />
                    ) : (
                      <CloseIcon sx={{ color: red[400] }} />
                    )
                  ) : (
                    <Switch
                      defaultChecked={row.actions.secret_key_admin}
                      value={row.actions.secret_key_admin}
                      onChange={(e) => {
                        let x = rows.findIndex((e) => e.id === row.id);
                        rows[x].actions.secret_key_admin =
                          !rows[x].actions.secret_key_admin;
                        if (rows[x].actions.secret_key_admin === true)
                          rows[x].actions.secret_key = true;
                        setRows(rows);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  )}
                </td> */}
                <td className="px-6 text-center">
                  <button
                    onClick={(e) => setSelect(null)}
                    className="bg-rose-300 hover:bg-rose-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                    style={{ visibility: "hidden" }}
                  >
                    cancel
                  </button>
                </td>
                <td className="px-6 text-center">
                  <button
                    onClick={(e) => setSelect(row.id)}
                    className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                    style={{
                      display: row.id !== select ? "inherit" : "none",
                    }}
                  >
                    <div style={{ width: "60px" }}>change</div>
                  </button>
                  <button
                    onClick={(e) => setSelect(null)}
                    className="bg-green-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                    style={{
                      display: row.id === select ? "inherit" : "none",
                    }}
                  >
                    <div style={{ width: "60px" }}>done</div>
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 p-4"></td>
              <td className="px-6 p-4"></td>
              <td className="px-6 p-4"></td>
              <td className="px-6 p-4"></td>
              <td className="px-6 text-center">
                <button
                  onClick={cancelChange}
                  className="bg-rose-300 hover:bg-rose-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                  style={{
                    visibility: !isChange() ? "hidden" : "visible",
                  }}
                >
                  cancel
                </button>
              </td>
              <td className="px-6 text-center">
                <button
                  onClick={submit}
                  className="bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                  style={{
                    visibility: !isChange() ? "hidden" : "visible",
                  }}
                >
                  <div style={{ width: "60px" }}>save</div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
