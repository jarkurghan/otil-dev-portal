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
import ButtonCancel from "../../../assets/inputs/cancel";
import { toast } from "react-toastify";

export default function UpdateWord({ word, setWord, setOpening }) {
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
                .get(`${process.env.REACT_APP_URL}/otil/v1/api/language/${word.language_id}/type`, {
                    headers: { Authorization: localStorage.getItem("token") },
                })
                .then((res) => setWordTypes(res.data))
                .catch(lucatch);
    };

    const submit = async () => {
        // to-do: validation
        await axios
            .put(`${process.env.REACT_APP_URL}/otil/v1/api/word`, word, { headers: { Authorization: localStorage.getItem("token") } })
            .then(() => toast.success("Success!"))
            .catch(lucatch);
    };

    const cancel = () => {
        setOpening(null);
    };

    useEffect(() => {
        getResources();
        getLanguages();
    }, []);

    useEffect(() => {
        getWordTypes();
    }, [word.language]);

    return (
        <div className="inline-block w-full p-2">
            <InputWord word={word} />
            <InputLanguage word={word} setWord={setWord} languages={languages} />
            <InputWordGroup word={word} setWord={setWord} wordTypes={wordTypes} />
            <InputDefinition word={word} setWord={setWord} resources={resources} />
            <InputHistory word={word} setWord={setWord} resources={resources} />
            <InputSource word={word} setWord={setWord} resources={resources} />
            <InputOtherForms word={word} setWord={setWord} />
            <ButtonSubmit submit={submit} />
            <ButtonCancel cancel={cancel} />
        </div>
    );
}
