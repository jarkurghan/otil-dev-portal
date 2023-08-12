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

const CreateWord = () => {
  const [pageStatus, setPageStatus] = useState("new");
  const [newWord, setNewWord] = useState("");
  const [existWord, setExistWord] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [disableNewWord, setDisableNewWord] = useState(false);
  const [createStatus, setCreateStatus] = useState(null);

  const checkNewWord = (word) => {
    if (!word) return toast.warning("enter the word");
    if (!/[a-z]+/.test(word)) return toast.warning("invalid word");
    setNewWord(word);
    axios
      .post(
        `${process.env.REACT_APP_URL}/otil/v1/api/word/check`,
        { word },
        { headers: { Authorization: sessionStorage.getItem("token") } }
      )
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
      axios
        .post(
          `${process.env.REACT_APP_URL}/otil/v1/api/word`,
          { word: newWord },
          { headers: { Authorization: sessionStorage.getItem("token") } }
        )
        .then((res) => {
          setPageStatus("create");
          setCreateStatus(null);
        })
        .catch((err) => {});
    }
  }, [createStatus]);

  return (
    <div className="container mx-auto">
      <NewWord checkNewWord={checkNewWord} disable={disableNewWord} />
      {spinner ? (
        <Spinner radius={150} color={"#1976d2"} stroke={16} visible={true} />
      ) : (
        <>
          {pageStatus === "exists" ? (
            <>Exists</>
          ) : pageStatus === "not found" ? (
            <ConfirmCreate setStatus={setCreateStatus} word={newWord} />
          ) : pageStatus === "create" ? (
            <CreatedWord setStatus={setCreateStatus} word={newWord} />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default CreateWord;
