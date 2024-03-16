import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import lucatch from "../../assets/functions/catch";
import Item from "./List/Item";

export default function Words() {
    // to-do: paginition qoldi

    const [words, setWords] = useState([]);

    const getWords = async (page = 1) => {
        const query = "?page=" + page;
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/word/list${query}`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setWords(res.data))
            .catch(lucatch);
    };

    useEffect(() => {
        getWords();
    }, []);

    useEffect(() => {
        (async () => {
            const promises = [];
            words.forEach((word) => {
                if (!word.definition && !word.synonyms)
                    promises.push(
                        new Promise(async (resolve, reject) => {
                            try {
                                await axios
                                    .get(`${process.env.REACT_APP_URL}/otil/v1/api/word/list/${word.id}/synonym`, {
                                        headers: { Authorization: localStorage.getItem("token") },
                                    })
                                    .then((res) => (word.synonyms = res.data));
                                resolve();
                            } catch (error) {
                                console.log(error);
                                reject(error);
                            }
                        })
                    );
            });
            if (promises.length > 0) {
                await Promise.all(promises);
                setWords([...words]);
            }
        })();
    }, [words]);

    return (
        <div className="sm:m-3 bg-white p-1 rounded 2xl:mx-20">
            {words.map((item) => (
                <Item key={item.id} data={item} />
            ))}
        </div>
    );
}
