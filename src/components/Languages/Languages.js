/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Item from "./ItemLanguages";
import Types from "./ItemWordTypes";
import axios from "axios";
import { toast } from "react-toastify";
const addlangdef = { language: "", description: "" };
const addtypedef = { type: "", description: "" };

export default function Example() {
    const [rows, setRows] = useState([]);
    const [row, setRow] = useState(null);
    const [add, setAdd] = useState(null);
    const [addlang, setAddLang] = useState(addlangdef);
    const [addType, setAddType] = useState(addtypedef);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        gets();
    }, []);

    useEffect(() => {
        if (row) wordTypes();
        clear();
    }, [row]);

    const gets = async () => {
        await getLanguages();
        clear();
    };

    const getLanguages = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/language`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => {
                setRows(res.data);
                if (res.data.length === 1) setRow(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
                toast.error("An error occurred");
            });
    };
    const wordTypes = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/language/${row?.id}/type`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setTypes(res.data))
            .catch((err) => {
                console.log(err);
                toast.error("An error occurred");
            });
    };

    const addLanguage = async () => {
        await axios
            .post(`${process.env.REACT_APP_URL}/otil/v1/api/language`, addlang, { headers: { Authorization: localStorage.getItem("token") } })
            .then(async (res) => await gets())
            .catch((err) => {
                console.log(err);
                toast.error("An error occurred");
            });
    };
    const addWordType = async () => {
        await axios
            .post(
                `${process.env.REACT_APP_URL}/otil/v1/api/language/type`,
                { language: row.id, ...addType },
                { headers: { Authorization: localStorage.getItem("token") } }
            )
            .then(async () => await gets())
            .catch((err) => {
                console.log(err);
                toast.error("An error occurred");
            });
    };

    const clear = () => {
        setAddType(addtypedef);
        setAddLang(addlangdef);
        setAdd(null);
    };

    return (
        <div>
            <div className="2xl:mx-40 xl:mx-20 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-none">
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {rows.map((e) => (
                                <Item key={e.id} data={e} current={e.id === row?.id} onDoubleClick={() => setRow(e)} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-gray-700 mx-2">
                    {/* <div className="sm:flex justify-between">
                        <div>
                            <h1 className="text-6xl font-semibold capitalize">{row?.language}</h1>
                            <h2 className="text-lg md:text-xl capitalize">{row?.description}</h2>
                        </div>
                        <div>Starts</div>
                    </div> */}

                    {/*  <div className="my-8">
                            <h1 className="text-3xl font-semibold capitalize">Statistika</h1>
                            <div className="flex items-center mt-4">
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">8 star</span>
                                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div className="h-5 bg-yellow-300 rounded" style={{ width: "70%" }}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                            </div>
                            <div className="flex items-center mt-4">
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">8 star</span>
                                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div className="h-5 bg-yellow-300 rounded" style={{ width: "70%" }}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                            </div>
                            <div className="flex items-center mt-4">
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">8 star</span>
                                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                    <div className="h-5 bg-yellow-300 rounded" style={{ width: "70%" }}></div>
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                            </div>
                        </div>
                    */}

                    {row && (
                        <div className="mt-8 mb-16">
                            <h1 className="text-3xl font-semibold">So'z turkumlari</h1>
                            {types.length === 0 && <div className="truncate text-lg font-medium text-indigo-600">So'z turkumi qo'shing</div>}
                            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                <ul className="divide-y divide-gray-200">
                                    {types.map((e) => (
                                        <Types key={e.id} data={e} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-semibold">Qo'shish</h1>
                        <div>
                            {row && (
                                <button
                                    onClick={() => setAdd("type")}
                                    className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2 mr-5"
                                >
                                    word type
                                </button>
                            )}
                            <button
                                onClick={() => setAdd("lang")}
                                className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                            >
                                language
                            </button>
                        </div>
                        {add === "lang" && (
                            <div>
                                <div className="xl:mr-2 w-full max-w-[400px]">
                                    <span className="py-2 font-semibold">language:</span>
                                    <input
                                        defaultValue={addlang.language}
                                        onChange={(e) => setAddLang({ language: e.target.value, description: addlang.description })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>

                                <div className="xl:mr-2 w-full max-w-[400px]">
                                    <span className="py-2 font-semibold">description:</span>
                                    <textarea
                                        rows="4"
                                        defaultValue={addlang.description}
                                        onChange={(e) => setAddLang({ language: addlang.language, description: e.target.value })}
                                        className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
                                    ></textarea>
                                </div>
                                <button
                                    onClick={addLanguage}
                                    className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2 mr-5"
                                >
                                    submit
                                </button>
                                <button
                                    onClick={clear}
                                    className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                >
                                    clear
                                </button>
                            </div>
                        )}
                        {add === "type" && (
                            <div>
                                <div className="xl:mr-2 w-full max-w-[400px]">
                                    <span className="py-2 font-semibold">language:</span>
                                    <input
                                        disabled
                                        value={row.language}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>

                                <div className="xl:mr-2 w-full max-w-[400px]">
                                    <span className="py-2 font-semibold">word type:</span>
                                    <input
                                        defaultValue={addType.type}
                                        onChange={(e) => setAddType({ type: e.target.value, description: addType.description })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="xl:mr-2 w-full max-w-[400px]">
                                    <span className="py-2 font-semibold">description:</span>
                                    <textarea
                                        rows="4"
                                        defaultValue={addType.description}
                                        onChange={(e) => setAddType({ type: addType.type, description: e.target.value })}
                                        className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
                                    ></textarea>
                                </div>
                                <button
                                    onClick={addWordType}
                                    className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2 mr-5"
                                >
                                    submit
                                </button>
                                <button
                                    onClick={clear}
                                    className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
                                >
                                    clear
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
