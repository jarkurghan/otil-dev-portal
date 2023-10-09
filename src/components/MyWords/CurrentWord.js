/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import lucatch from "../../assets/functions/catch";

export default function CurrentWord({ id }) {
    const [currenWord, setCurrentWord] = useState({});
    useEffect(() => {
        gets();
    }, []);

    const gets = async () => {
        await getWordInfo();
    };

    const getWordInfo = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/word/${id}`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setCurrentWord(res.data))
            .catch(lucatch);
    };

    return (
        <div className="sm:m-3 p-1 rounded 2xl:mx-20">
            <div key={currenWord.id} className="grid grid-cols-[1fr] grid-rows-[1fr_24px] min-h-[100px] max-h-[500px] m-2">
                <div className="py-1 px-2">{currenWord.word}</div>
                <div className="h-6 px-2">status</div>
            </div>
        </div>
    );
}
