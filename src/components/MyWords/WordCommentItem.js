/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Avatar from "../../assets/Icons/Avatar";
import stringToColor from "../../assets/functions/stringToColor";
import styles from "./style.module.css";
import Like from "../../assets/Icons/like";
import Dislike from "../../assets/Icons/dislike";
import LikePlus from "../../assets/Icons/like-plus";
import Reply from "../../assets/Icons/reply";
import DislikePlus from "../../assets/Icons/dislike-plus";

export default function WordCommentItem({ comment, comments, setReplied, like, className: clas }) {
    return (
        <div id={`comment-${comment.id}`} className={"cursor-pointer grid grid-cols-[42px_1fr] grid-rows-[42px_1fr] gap-2 " + clas}>
            {/* Agar rasm bo'masa */}
            <div className={styles.icon} style={{ backgroundColor: stringToColor(comment?.user_id, 0.35) }}>
                <Avatar color={"rgba(0, 0, 0, 0.4)"} />
            </div>
            <div className="row-span-2">
                <h1 className="text-xl text-slate-800 font-bold dark:text-white break-words max-w-[100%]">
                    {comment.first_name} {comment.last_name}
                </h1>
                {comment.reply && comments?.find((e) => e?.id === comment.reply) && (
                    <div className="opacity-70 pl-2 mr-4 pr-6 w-[max(200px, 200px)] h-[60px] border-l-4 border-indigo-900 bg-indigo-100 whitespace-nowrap overflow-hidden text-ellipsis relative">
                        <WordCommentItem comment={comments?.find((e) => e?.id === comment.reply)} like={like} setReplied={setReplied} className={"mt-1"} />
                    </div>
                )}
                <div>{comment.comment}</div>
                <div className="flex gap-6">
                    <div className="flex items-center gap-1">
                        <span>{comment.date?.slice(11, 16)}</span>
                        {new Date().toISOString().slice(0, 10) !== comment.date?.slice(0, 10) && <span>{comment.date?.slice(0, 10)}</span>}
                    </div>
                    <a className="flex items-center gap-1" href="#comment-container" onClick={() => setReplied(comment.id)}>
                        <Reply />
                    </a>
                    {comment.classable === false ? (
                        <div className="flex items-center gap-1">
                            <LikePlus />
                            {comment.like === "1" && <span>You</span>}
                            {comment.like > 1 && <span>You and {comment.like - 1} others</span>}
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <span onClick={() => like(comment.id, false)}>
                                <Like />
                            </span>
                            <span>{comment.like ? comment.like : null}</span>
                        </div>
                    )}
                    {comment.classable === true ? (
                        <div className="flex items-center gap-1">
                            <DislikePlus />
                            {comment.dislike === "1" && <span>You</span>}
                            {comment.dislike > 1 && <span>You and {comment.dislike - 1} others</span>}
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <span onClick={() => like(comment.id, true)}>
                                <Dislike />
                            </span>
                            <span>{comment.dislike ? comment.dislike : null}&nbsp;</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
