/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import lucatch from "../../assets/functions/catch";
import Item from "./List/WordTableItem";

export default function MyWords() {
    const [rows, setRows] = useState([]);

    const getWords = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/word/full`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setRows(res.data))
            .catch(lucatch);
    };

    useEffect(() => {
        (async () => {
            await getWords();
        })();
    }, []);

    return (
        <div className="sm:m-3 bg-white p-1 rounded 2xl:mx-20">
            {rows.map((item) => (
                <Item data={item} />
            ))}
        </div>
    );
}
