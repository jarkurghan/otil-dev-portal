/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import setCookie from "../../cookie/setCookie";
import InputWord from "../../assets/inputs/word";
import InputLanguage from "../../assets/inputs/language";
import InputWordGroup from "../../assets/inputs/word-group";
import InputDefinition from "../../assets/inputs/definition";
import InputHistory from "../../assets/inputs/history";
import InputSource from "../../assets/inputs/source";
import InputOtherForms from "../../assets/inputs/other-forms";
import ButtonSubmit from "../../assets/inputs/submit";
import axios from "axios";
import lucatch from "../../assets/functions/catch";
import createWord from "./validation";
import { toast } from "react-toastify";
import convert from "./convert";
import { useTranslation } from "react-i18next";
import ButtonCancel from "../../assets/inputs/cancel";

export default function CreatedWord({ word, setWord, setPageStatus }) {
    const { t } = useTranslation();
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
                .get(`${process.env.REACT_APP_URL}/otil/v1/api/language/${word.language}/type`, { headers: { Authorization: localStorage.getItem("token") } })
                .then((res) => setWordTypes(res.data))
                .catch(lucatch);
    };

    const cancel = () => {
        setCookie("word", "", 0);
        setPageStatus("new");
        setWord({});
    };

    const submit = async () => {
        const value = createWord.validate(convert(word));
        if (value.error) {
            if (value.error.details[0].context.details && value.error.details[0].context.details[0])
                for (let i = 0; i < value.error.details[0].context.details.length; i++) {
                    if (value.error.details[0].context.details[i].message !== "definition is required" || value.error._original.synonyms.length === 0)
                        if (i === 0 || value.error.details[0].context.details[i].message !== value.error.details[0].context.details[0].message)
                            toast.warning(t(value.error.details[0].context.details[i].message));
                }
            else toast.warning(t("Something went wrong"));
            return 0;
        }

        await axios
            .post(`${process.env.REACT_APP_URL}/otil/v1/api/word/full`, value.value, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => {
                setCookie("word", "", 0);
                setPageStatus("new");
                setWord({});
                toast.success("Success!");
            })
            .catch(lucatch);
    };

    useEffect(() => {
        getResources();
        getLanguages();
    }, []);

    useEffect(() => {
        getWordTypes();
    }, [word.language]);

    useEffect(() => {
        setCookie("word", JSON.stringify(word), 1);
    }, [word]);

    return (
        <div className="inline-block w-[calc(100%-3rem)] mx-6 my-4">
            <div className="lg:w-[calc(100%-4rem)] lg:mx-auto">
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
        </div>
    );
}
