import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LUCheck from "../../tools/LUCheck";
import LUSwitch from "../../tools/LUSwitch/LUSwitch";
import LUPopup from "../../tools/LUPopup/LUPopup";

export default function UserPolicies() {
  const [progress, setProgress] = useState(false);
  const [rank, setRank] = useState({});
  const [rows, setRows] = useState([]);
  const [actions, setActions] = useState([]);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState(null);
  useEffect(() => {
    (async () => {
      await getActions();
      await getUserPolicies();
    })();
  }, []);

  const getUserPolicies = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/otil/v1/api/user/action`, {
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
  const getActions = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/otil/v1/api/user/actions`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setActions(res.data);
      })
      .catch((err) => {
        toast.error("An error occurred");
      });
  };

  function isChange() {
    for (let i = 0; i < data.length; i++) {
      if (
        actions.findIndex(
          (e) => data[i].actions[e.action] !== rows[i].actions[e.action]
        ) !== -1
      )
        return true;
    }
    return false;
  }

  async function submit() {
    setSelect(null);
    let add = [];
    let del = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < actions.length; j++) {
        if (
          data[i].actions[actions[j].action] !==
          rows[i].actions[actions[j].action]
        ) {
          if (rows[i].actions[actions[j].action] === true)
            add.push({
              user: data[i].id,
              action: actions[j].id,
              text: `Adding ${actions[j].description} action to ${rows[i].name}`,
            });
          else
            del.push({
              user: data[i].id,
              action: actions[j].id,
              text: `Removing action ${actions[j].description} from ${rows[i].name}`,
            });
        }
      }
    }
    setProgress(true);
    for (let i = 0; i < add.length; i++) {
      setRank({
        text: add[i].text,
        rank: `${(100 * i) / (del.length + add.length)}%`,
      });
      delete add[i].text;
      await axios
        .post(
          `${process.env.REACT_APP_URL}/otil/v1/api/user/action/add`,
          add[i],
          { headers: { Authorization: sessionStorage.getItem("token") } }
        )
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred");
        });
    }
    for (let i = 0; i < del.length; i++) {
      setRank({
        text: del[i].text,
        rank: `${(100 * (add.length + i)) / (del.length + add.length)}%`,
      });
      delete del[i].text;
      await axios
        .delete(`${process.env.REACT_APP_URL}/otil/v1/api/user/action/del`, {
          data: del[i],
          headers: { Authorization: sessionStorage.getItem("token") },
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred");
        });
    }
    setRank({
      text: `data is being updated`,
      rank: "100%",
    });
    await getUserPolicies();
    toast.success("Success!");
    setProgress(false);
    setRank({});
  }

  function cancelChange() {
    let x = [];
    for (let i = 0; i < data.length; i++) {
      const element = {
        id: data[i].id,
        name: data[i].name,
        role: rows[i].role,
        actions: { ...data[i].actions },
      };
      x.push(element);
    }
    setRows(x);
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      {progress && <LUPopup rank={rank} />}
      {rows.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-6xl">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-11 py-3">
                Name
              </th>
              {actions.map((e) => (
                <th scope="col" className="px-6 py-3 text-center" key={e.id}>
                  {e.description}
                </th>
              ))}
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
                {actions.map((e) => (
                  <td className="px-6 text-center" key={e.id}>
                    {row.id !== select ? (
                      <LUCheck bool={row.actions[e.action]} />
                    ) : (
                      <LUSwitch
                        action={e.action}
                        rows={rows}
                        index={rows.findIndex((e) => e.id === row.id)}
                        setRows={setRows}
                      />
                    )}
                  </td>
                ))}
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
              {actions.map((e) => (
                <td className="px-6 p-4"></td>
              ))}
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
