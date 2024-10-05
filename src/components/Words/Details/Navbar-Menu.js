import React from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getRole } from "../../../store/roles";

export default function WordDetailsMenu({ id, page, setPage }) {
    const navigate = useNavigate();
    const navigation = (path) => {
        navigate(`/words/${id}/${path}`);
        setPage(path);
    };
    const { t } = useTranslation();

    const roles = useSelector(getRole);

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
                                {t("back")}
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
                                {t("info")}
                            </span>
                        </li>
                        <li className={cn("text-gray-900 dark:text-white bg-slate-100 cursor-pointer", { "rounded-t-lg": page === "comments" })}>
                            <span
                                onClick={() => navigation("comments")}
                                className={cn(
                                    "inline-block px-4 py-3 h-full",
                                    { "rounded-bl-xl": page === "details" },
                                    { "bg-lime-950/10": page !== "comments" },
                                    { "rounded-br-xl": roles.includes("Update word") && page === "settings" }
                                )}
                            >
                                {t("comment")}
                            </span>
                        </li>
                        {roles.includes("Update word") && (
                            <li
                                className={cn("text-gray-900 dark:text-white bg-slate-100 cursor-pointer", {
                                    "rounded-t-lg": roles.includes("Update word") && page === "settings",
                                })}
                            >
                                <span
                                    onClick={() => navigation("settings")}
                                    className={cn(
                                        "inline-block px-4 py-3 h-full",
                                        { "rounded-bl-xl": page === "comments" },
                                        { "bg-lime-950/10": page !== "settings" }
                                    )}
                                >
                                    {t("settings")}
                                </span>
                            </li>
                        )}
                        <li className="bg-slate-100">
                            <span
                                className={cn("inline-block px-4 h-full bg-lime-950/10", {
                                    "rounded-bl-xl":
                                        (roles.includes("Update word") && page === "settings") || (!roles.includes("Update word") && page === "comments"),
                                })}
                            ></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
