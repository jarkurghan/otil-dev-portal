/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import lucatch from "../../assets/functions/catch";
import { useNavigate } from "react-router-dom";
import Item from "./WordTableItem";

export default function MyWords() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        gets();
    }, []);

    const gets = async () => {
        await getUsers();
    };

    const getUsers = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/word/full`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setRows(res.data))
            .catch(lucatch);
    };

    const details = (id) => {
        navigate(`${id}/details`);
    };

    return (
        <div className="sm:m-3 bg-white p-1 rounded 2xl:mx-20">
            {rows.map((word) => (
                <div key={word.id} className="grid grid-cols-[1fr_120px] grid-rows-[1fr_24px] min-h-[100px] max-h-[200px] m-2 bg-slate-50/80">
                    <div className="py-1 px-2">
                        <Item word={word} />
                    </div>
                    <div className="row-span-2 flex justify-center items-center">
                        <button className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded w-20" onClick={() => details(word.id)}>
                            details
                        </button>
                    </div>
                    <div className="h-6 px-2">status</div>
                    {/* status uchun rang */}
                    {/* created_by */}
                    {/* commentlar soni */}
                    {/* ko'rishlar soni soni */}
                </div>
            ))}
        </div>
    );
}
