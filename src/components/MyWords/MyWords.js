/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";

export default function MyWords() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        gets();
    }, []);

    const gets = async () => {
        await getUsers();
    };

    const getUsers = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/word`, {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            })
            .then((res) => {
                setRows(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("An error occurred");
            });
    };

    return (
        <div className="2xl:mx-20 relative overflow-x-auto sm:rounded-lg mb-5">
            {rows.length > 0 && (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-6xl">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">ID</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">Word</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">Create Date</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="mx-5 my-4">Status</span>
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ind) => (
                            <tr key={row.id} className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6">
                                    <span className="mx-5 my-3">{row.id}</span>
                                </td>
                                <td className="px-6">
                                    <span className="mx-5 my-3">{row.word}</span>
                                </td>
                                <td className="px-6">
                                    <span className="mx-5 my-3">
                                        {row.created_date.slice(0, 10)} {row.created_date.slice(11, 16)}
                                    </span>
                                </td>
                                <td className="px-6">
                                    <span className="mx-5 my-3">{row.phone}</span>
                                </td>
                                <td className="px-6 text-center">
                                    <button className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2">
                                        <div style={{ width: "60px" }}>details</div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
