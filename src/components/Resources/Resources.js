/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import lucatch from "../../assets/functions/catch";
import { useNavigate } from "react-router-dom";
import FileSaver from "file-saver";

export default function Resources() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(() => {
        gets();
    }, []);

    const gets = async () => await getResources();

    const getResources = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/resource`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setRows(res.data))
            .catch(lucatch);
    };

    const getResourceFile = async (id) => {
        fetch(`${process.env.REACT_APP_URL}/otil/v1/api/resource/file/${id}`, {
            headers: { Authorization: localStorage.getItem("token"), "Content-type": "application/pdf" },
        })
            .then((res) => res.blob())
            .then((blob) => FileSaver.saveAs(blob, id))
            .catch(lucatch);
    };

    return (
        <div className="2xl:mx-20 relative overflow-x-auto sm:rounded-lg py-5">
            {rows.length > 0 && (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-6xl">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:table-header-group hidden">
                        <tr>
                            <th scope="col" className="px-6 py-3 sm:table-cell hidden">
                                <span className="mx-5 my-4">ID</span>
                            </th>
                            <th scope="col" className="px-1 sm:px-6 py-3">
                                <span className="mx-5 my-4">Name</span>
                            </th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 sm:table-cell hidden">
                                    <span className="mx-5 my-3">{row.id}</span>
                                </td>
                                <td className="px-1 sm:px-6">
                                    <span className="mx-5 my-3">{row.name}</span>
                                </td>
                                <td className="px-1 sm:px-2 text-center sm:table-cell hidden">
                                    <a href={`http://192.168.100.9:2006/otil/v1/api/resource/file/${row.id}`} target="_blank" rel="noopener noreferrer">
                                        <button className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-6 rounded inline-flex items-center my-2">
                                            view
                                        </button>
                                    </a>
                                </td>
                                <td className="px-1 sm:px-2 text-center">
                                    <div className="inline-block w-fit h-fit my-2" onClick={() => getResourceFile(row.id)}>
                                        <button className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-6 rounded inline-flex items-center">
                                            download
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="h-16 text-left max-w-6xl ">
                <div className="inline-block w-fit h-fit my-3 mx-10" onClick={() => navigate("/create-resource")}>
                    <button className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                        Create Resource
                    </button>
                </div>
            </div>
        </div>
    );
}
