/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import lucatch from "../../../assets/functions/catch";
// import setCookie from "../../cookie/setCookie";
import InputWord from "../../../assets/inputs/word";
import InputLanguage from "../../../assets/inputs/language";
import InputWordGroup from "../../../assets/inputs/word-group";
import InputDefinition from "../../../assets/inputs/definition";
import InputHistory from "../../../assets/inputs/history";
import ButtonSubmit from "../../../assets/inputs/submit";
import InputOtherForms from "../../../assets/inputs/other-forms";
import InputSource from "../../../assets/inputs/source";
import axios from "axios";

export default function UpdateWord({ word, setWord }) {
    const [resources, setResources] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [wordTypes, setWordTypes] = useState([]);

    const getResources = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/resource`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setResources(res.data))
            .catch(lucatch);
    };

    const getLanguages = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/language`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setLanguages(res.data))
            .catch(lucatch);
    };

    const getWordTypes = async () => {
        if (word.language)
            await axios
                .get(`${process.env.REACT_APP_URL}/otil/v1/api/language/${word.language_id}/type`, { headers: { Authorization: localStorage.getItem("token") } })
                .then((res) => setWordTypes(res.data))
                .catch(lucatch);
    };

    const submit = async () => {
        // setCookie("word", "", 0);
        // setPageStatus("new");

        setWord({ definition: {}, history: {}, example: {}, synonyms: [] });

        // validation
        // submit
    };

    useEffect(() => {
        getResources();
        getLanguages();
    }, []);

    useEffect(() => {
        getWordTypes();
    }, [word.language]);

    // useEffect(() => {
    //     setCookie("word", JSON.stringify(word), 1);
    // }, [word]);

    return (
        <div className="inline-block w-[calc(100%-3rem)] mx-6 my-4">
            <div className="lg:w-[calc(100%-4rem)] lg:mx-auto">
                <InputWord word={word} />
                <InputLanguage word={word} setWord={setWord} languages={languages} />
                <InputWordGroup word={word} setWord={setWord} wordTypes={wordTypes} />
                <InputDefinition word={word} setWord={setWord} resources={resources} />
                <InputHistory word={word} setWord={setWord} resources={resources} />
                <InputSource word={word} setWord={setWord} resources={resources} />
                {/* <InputOtherForms word={word} setWord={setWord} /> */}
                <ButtonSubmit submit={submit} />
            </div>
        </div>
    );
}
