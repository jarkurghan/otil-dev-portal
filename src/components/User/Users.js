/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";

export default function UsersTable({ setLoading }) {
    const [rows, setRows] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [data, setData] = useState([]);
    const [select, setSelect] = useState(null);
    useEffect(() => {
        gets();
    }, []);

    const gets = async () => {
        setLoading(true);
        await getStatuses();
        await getUsers();
        setLoading(false);
    };

    const getStatuses = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/user/status`, {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then((res) => {
                setStatuses(res.data);
            })
            .catch((err) => {
                toast.error("An error occurred");
            });
    };

    const getUsers = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/user`, {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then((res) => {
                let x = [];
                for (let i = 0; i < res.data.length; i++) x.push({ ...res.data[i] });
                setData(x);
                setRows(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("An error occurred");
            });
    };

    const submit = async (body) => {
        await axios
            .put(`${process.env.REACT_APP_URL}/otil/v1/api/user`, body, {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then(async (res) => {
                await getUsers();
                toast.success("Successfully updated!");
            })
            .catch((err) => {
                console.log(err);
                toast.error("An error occurred");
            });
    };

    function isChange(i) {
        if (data[i].name !== rows[i].name || data[i].email !== rows[i].email || data[i].role !== rows[i].role || data[i].status !== rows[i].status) return true;
        else return false;
    }

    function isChange2() {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name !== rows[i].name || data[i].email !== rows[i].email || data[i].role !== rows[i].role || data[i].status !== rows[i].status)
                return true;
        }
        return false;
    }

    function cancelChange() {
        let x = [];
        for (let i = 0; i < data.length; i++) x.push({ ...data[i] });
        setRows(x);
    }

    return (
        <div className="relative overflow-x-auto sm:rounded-lg mb-5">
            {rows.length > 0 && (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-6xl">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">ID</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">User ID</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">First Name</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">Last Name</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4"> Email</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4"> Phone</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-10 my-4"> Status</span>
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ind) => (
                            <tr key={row.id} className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6">
                                    <span className="mx-5 my-3 utd utd-1">{row.id}</span>
                                </td>
                                <td className="px-6">
                                    <span className="mx-5 my-3 utd utd-2">{row.user_id}</span>
                                </td>
                                <td className="px-6">
                                    {select !== row.id ? (
                                        <span className="mx-5 my-3 utd utd-3">{row.first_name}</span>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                id="small-input"
                                                defaultValue={row.first_name}
                                                onChange={(e) => {
                                                    row.first_name = e.target.value;
                                                    setRows(rows);
                                                }}
                                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    )}
                                </td>
                                <td className="px-6">
                                    {select !== row.id ? (
                                        <span className="mx-5 my-3 utd utd-3">{row.last_name}</span>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                id="small-input"
                                                defaultValue={row.last_name}
                                                onChange={(e) => {
                                                    row.last_name = e.target.value;
                                                    setRows(rows);
                                                }}
                                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    )}
                                </td>
                                <td className="px-6">
                                    {select !== row.id ? (
                                        <span className="mx-5 my-3 utd utd-4"> {row.email}</span>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                id="small-input"
                                                defaultValue={row.email}
                                                onChange={(e) => {
                                                    row.email = e.target.value;
                                                    setRows(rows);
                                                }}
                                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    )}
                                </td>
                                <td className="px-6">
                                    {select !== row.id ? (
                                        <span className="mx-5 my-3 utd utd-4"> {row.phone}</span>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                id="small-input"
                                                defaultValue={row.phone}
                                                onChange={(e) => {
                                                    row.phone = e.target.value;
                                                    setRows(rows);
                                                }}
                                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    )}
                                </td>
                                <td className="px-6">
                                    {select !== row.id || row.role === 4 ? (
                                        <span className="mx-10 my-3 utd"> {row.user_status}</span>
                                    ) : (
                                        <select
                                            id="small"
                                            defaultValue={row.status}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                row.status = value;
                                                row.user_status = statuses.find((i) => i.id === value).status;
                                                setRows(rows);
                                            }}
                                            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {statuses.map((el) => (
                                                <option value={el.id} key={el.id}>
                                                    {el.status}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </td>
                                <td className="px-6 text-center">
                                    <button
                                        onClick={() => {
                                            setSelect(null);
                                            cancelChange();
                                        }}
                                        className="bg-rose-300 hover:bg-rose-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                        style={{
                                            visibility: !isChange(ind) ? "hidden" : "visible",
                                        }}
                                    >
                                        cancel
                                    </button>
                                </td>
                                <td className="px-6 text-center">
                                    {row.id === select ? (
                                        <button
                                            onClick={(e) => setSelect(null)}
                                            className="bg-green-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                        >
                                            <div style={{ width: "60px" }}>done</div>
                                        </button>
                                    ) : isChange(ind) ? (
                                        <button
                                            onClick={(e) => {
                                                setSelect(null);
                                                submit(row);
                                            }}
                                            className="bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                        >
                                            <div style={{ width: "60px" }}>save</div>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => setSelect(row.id)}
                                            className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                            style={{
                                                visibility: select !== null || isChange2() ? "hidden" : "visible",
                                            }}
                                        >
                                            <div style={{ width: "60px" }}>change</div>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
