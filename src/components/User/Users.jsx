import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import lucatch from "../../assets/functions/catch";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getRole } from "../../store/roles";

export default function UsersTable({ setLoading }) {
    const [rows, setRows] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [data, setData] = useState([]);
    const [select, setSelect] = useState(null);
    const { t } = useTranslation();
    const roles = useSelector(getRole);

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
                headers: { Authorization: localStorage.getItem("token") },
            })
            .then((res) => setStatuses(res.data))
            .catch(lucatch);
    };

    const getUsers = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/user`, {
                headers: { Authorization: localStorage.getItem("token") },
            })
            .then((res) => {
                let x = [];
                for (let i = 0; i < res.data.length; i++) x.push({ ...res.data[i] });
                setData(x);
                setRows(res.data);
            })
            .catch(lucatch);
    };

    const submit = async (body) => {
        await axios
            .put(`${process.env.REACT_APP_URL}/otil/v1/api/user`, body, {
                headers: { Authorization: localStorage.getItem("token") },
            })
            .then(async () => {
                await getUsers();
                toast.success("Successfully updated!");
            })
            .catch(lucatch);
    };

    function isChange(i) {
        if (
            data[i].first_name !== rows[i].first_name ||
            data[i].last_name !== rows[i].last_name ||
            data[i].email !== rows[i].email ||
            data[i].phone !== rows[i].phone ||
            data[i].status !== rows[i].status
        )
            return true;
        else return false;
    }

    function isChange2() {
        for (let i = 0; i < data.length; i++) {
            if (
                data[i].first_name !== rows[i].first_name ||
                data[i].last_name !== rows[i].last_name ||
                data[i].email !== rows[i].email ||
                data[i].phone !== rows[i].phone ||
                data[i].status !== rows[i].status
            )
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
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">{t("id")}</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">{t("user id")}</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">{t("first name")}</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">{t("last name")}</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4"> {t("email")}</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4"> {t("phone")}</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-10 my-4"> {t("status")}</span>
                            </th>
                            {roles.includes("Update user info") && <th scope="col" className="px-6 py-3"></th>}
                            {roles.includes("Update user info") && <th scope="col" className="px-6 py-3"></th>}
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
                                {roles.includes("Update user info") && (
                                    <td className="px-6 text-center">
                                        <button
                                            onClick={() => {
                                                setSelect(null);
                                                cancelChange();
                                            }}
                                            className="bg-rose-300 hover:bg-rose-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                            style={{ visibility: !isChange(ind) ? "hidden" : "visible" }}
                                        >
                                            {t("cancel")}
                                        </button>
                                    </td>
                                )}
                                {roles.includes("Update user info") && (
                                    <td className="px-6 text-center">
                                        {row.id === select ? (
                                            <button
                                                onClick={(e) => setSelect(null)}
                                                className="bg-green-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                            >
                                                <div style={{ width: "60px" }}>{t("done")}</div>
                                            </button>
                                        ) : isChange(ind) ? (
                                            <button
                                                onClick={(e) => {
                                                    setSelect(null);
                                                    submit(row);
                                                }}
                                                className="bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                            >
                                                <div style={{ width: "60px" }}>{t("save")}</div>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => setSelect(row.id)}
                                                className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                                style={{ visibility: select !== null || isChange2() ? "hidden" : "visible" }}
                                            >
                                                <div style={{ width: "auto" }}>{t("change")}</div>
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
