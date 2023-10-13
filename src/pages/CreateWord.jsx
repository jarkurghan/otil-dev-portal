/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import NewWord from "../components/CreateWord/NewWord";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmCreate from "../components/CreateWord/ConfirmCreation";
import { useEffect } from "react";
import Spinner from "react-spinner-material";
import CreatedWord from "../components/CreateWord/CreateWord";
import "../components/CreateWord/style.css";
import setCookie from "../cookie/setCookie";
import getCookie from "../cookie/getCookie";

const CreateWord = () => {
    const [pageStatus, setPageStatus] = useState("new");
    const [existWord, setExistWord] = useState(null);
    const [spinner, setSpinner] = useState(true);
    const [disableNewWord, setDisableNewWord] = useState(false);
    const [createStatus, setCreateStatus] = useState(null);
    const [wordObj, setWordObj] = useState({});

    useEffect(() => {
        if (getCookie("word")) {
            const cword = JSON.parse(getCookie("word"));
            setPageStatus("create");
            setDisableNewWord(true);
            setWordObj(cword);
        }
        setSpinner(false);
    }, []);

    useEffect(() => {
        if (pageStatus === "new") {
            setDisableNewWord(false);
        }
    }, [pageStatus]);

    const checkNewWord = (word) => {
        if (!word) return toast.warning("enter the word");
        if (!/[a-z]+/.test(word)) return toast.warning("invalid word");
        setWordObj({ word });
        axios
            .post(`${process.env.REACT_APP_URL}/otil/v1/api/word/check`, { word }, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => {
                if (res.data === "not found") {
                    setPageStatus("not found");
                    setDisableNewWord(true);
                } else {
                    setPageStatus("exists");
                    setExistWord(res.data);
                    setDisableNewWord(true);
                }
            })
            .catch((err) => {});
    };

    useEffect(() => {
        if (createStatus === false) {
            setPageStatus("new");
            setDisableNewWord(false);
            setCreateStatus(null);
        } else if (createStatus === true) {
            setPageStatus("create");
            setCreateStatus(null);
            const newword = { word: wordObj.word };
            newword.definition = {};
            newword.history = {};
            newword.example = {};
            newword.other_forms = [];
            newword.other_forms_2 = [];
            newword.other_forms_text = "";
            newword.other_forms_2_text = "";
            newword.language = "";
            newword.word_group = "";
            setWordObj(newword);
            setCookie("word", JSON.stringify(newword), 1);
        }
    }, [createStatus]);

    return (
        <div className="mx-auto">
            {spinner ? (
                <div className="w-full mt-16 flex justify-center items-center">
                    <Spinner radius={150} color={"#1976d2"} stroke={16} visible={true} />
                </div>
            ) : (
                <>
                    {pageStatus === "new" ? (
                        <>
                            <NewWord checkNewWord={checkNewWord} disable={disableNewWord} />
                        </>
                    ) : pageStatus === "exists" ? (
                        <>
                            <NewWord checkNewWord={checkNewWord} disable={disableNewWord} />
                            Exists
                        </>
                    ) : pageStatus === "not found" ? (
                        <>
                            <NewWord checkNewWord={checkNewWord} disable={disableNewWord} />
                            <ConfirmCreate setStatus={setCreateStatus} word={wordObj} />
                        </>
                    ) : pageStatus === "create" ? (
                        <CreatedWord word={wordObj} setWord={setWordObj} setPageStatus={setPageStatus} />
                    ) : (
                        ""
                    )}
                </>
            )}
        </div>
    );
};

export default CreateWord;
