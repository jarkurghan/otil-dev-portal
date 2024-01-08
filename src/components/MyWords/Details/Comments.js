/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import InputCommentary from "../../../assets/inputs/commentary";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import lucatch from "../../../assets/functions/catch";
import WordCommentItem from "./CommentItem";

export default function WordComments({ word }) {
    const [comments, setComments] = useState([]);
    const [replied, setReplied] = useState(null);

    const sendComment = () => {
        const textElement = document.getElementById("send-comment");
        const data = { comment: textElement.value };
        if (replied) data.reply = replied;
        axios
            .post(`${process.env.REACT_APP_URL}/otil/v1/api/word/${word.id}/comment`, data, { headers: { Authorization: localStorage.getItem("token") } })
            .then(() => {
                setReplied(null);
                getComments();
                textElement.value = "";
            })
            .catch(lucatch);
    };

    const getComments = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/word/${word.id}/comment`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setComments(res.data))
            .catch(lucatch);
    };

    const like = async (id, dislike) => {
        const data = { comment: id, dislike };
        axios
            .post(`${process.env.REACT_APP_URL}/otil/v1/api/word/${word.id}/comment/like`, data, { headers: { Authorization: localStorage.getItem("token") } })
            .then(() => getComments())
            .catch(lucatch);
    };

    useEffect(() => {
        getComments();
    }, []);
    return (
        <div className="max-w-7xl my-5 px-2 mx-auto">
                <h1 className="text-3xl text-slate-800 font-bold dark:text-white my-2">Comments</h1>
                <div>
                    {comments.map((comment, index) => (
                        <WordCommentItem comments={comments} className="my-4" comment={comment} like={like} setReplied={setReplied} key={index} />
                    ))}
                    <div id="comment-container">
                        <div style={{ visibility: replied ? "visible" : "hidden" }}>
                            <div className="opacity-70 ml-12 pl-2 mr-4 pr-6 md:w-[685px] mt-8 h-[60px] border-l-4 border-indigo-900 bg-indigo-100 whitespace-nowrap overflow-hidden text-ellipsis relative">
                                <div
                                    className="text-xl absolute right-1 top-1 font-semibold text-indigo-950 select-none cursor-pointer"
                                    onClick={() => {
                                        setReplied(null);
                                    }}
                                >
                                    &#10540;
                                </div>
                                {replied && (
                                    <WordCommentItem comment={comments.find((e) => e?.id === replied)} like={like} setReplied={setReplied} className={"mt-1"} />
                                )}
                            </div>
                        </div>
                        <InputCommentary send={sendComment} />
                    </div>
                </div>
            </div>
        // </div>
    );
}
