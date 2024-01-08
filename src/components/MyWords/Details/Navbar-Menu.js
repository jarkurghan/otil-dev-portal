/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

export default function WordDetailsMenu({ id, page, setPage }) {
    const navigate = useNavigate();
    const navigation = (path) => {
        navigate(`/words/${id}/${path}`);
        setPage(path);
    };

    return (
        <div className="bg-lime-950/10 dark:bg-gray-700">
            <div className="px-4 mx-auto md:ml-10 lg:ml-20">
                <div className="flex items-center justify-center sm:justify-normal">
                    <ul className="flex flex-row font-medium mt-0 mr-6 text-sm">
                        <li className="text-gray-900 dark:text-white bg-slate-100 cursor-pointer">
                            <span
                                className={cn("inline-block px-4 py-3 h-full bg-lime-950/10", { "rounded-br-xl": page === "details" })}
                                onClick={() => navigate("/words")}
                            >
                                Ortga
                            </span>
                        </li>
                        <li className={cn("text-gray-900 dark:text-white bg-slate-100 cursor-pointer", { "rounded-t-lg": page === "details" })}>
                            <span
                                onClick={() => navigation("details")}
                                className={cn(
                                    "inline-block px-4 py-3 h-full",
                                    { "bg-lime-950/10": page !== "details" },
                                    { "rounded-br-xl": page === "comments" }
                                )}
                            >
                                Info
                            </span>
                        </li>
                        <li className={cn("text-gray-900 dark:text-white bg-slate-100 cursor-pointer", { "rounded-t-lg": page === "comments" })}>
                            <span
                                onClick={() => navigation("comments")}
                                className={cn(
                                    "inline-block px-4 py-3 h-full",
                                    { "rounded-bl-xl": page === "details" },
                                    { "bg-lime-950/10": page !== "comments" },
                                    { "rounded-br-xl": page === "settings" }
                                )}
                            >
                                Comment
                            </span>
                        </li>
                        <li className={cn("text-gray-900 dark:text-white bg-slate-100 cursor-pointer", { "rounded-t-lg": page === "settings" })}>
                            <span
                                onClick={() => navigation("settings")}
                                className={cn(
                                    "inline-block px-4 py-3 h-full",
                                    { "rounded-bl-xl": page === "comments" },
                                    { "bg-lime-950/10": page !== "settings" }
                                )}
                            >
                                Settings
                            </span>
                        </li>
                        <li className="bg-slate-100">
                            <span className={cn("inline-block px-4 h-full bg-lime-950/10", { "rounded-bl-xl": page === "settings" })}></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
