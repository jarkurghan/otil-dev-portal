/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useTranslation } from "react-i18next";

export default function WordInfo({ word }) {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl my-5 px-2 mx-auto">
            <h1 className="text-3xl text-slate-800 font-bold dark:text-white my-2">{t("details")}</h1>
            <div className="grid sm:grid-cols-[auto_1fr] grid-cols-[1fr] sm:gap-3">
                <div className="font-bold">
                    <span className="sm:float-right">{t("word")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>{word.word}</span>
                </div>

                <div className="font-bold">
                    <span className="sm:float-right">{t("definition")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>{word.definition?.definition}</span>
                    <div>{`📚 ${word.definition?.resource_name} (${t("page number (1)")}${word.definition?.page}${t("page number (2)")})`}</div>
                </div>

                {word.history?.history && (
                    <div className="font-bold">
                        <span className="sm:float-right">{t("history of origin")}</span>
                    </div>
                )}
                {word.history?.history && (
                    <div className="mb-2 sm:mb-0">
                        <span>{word.history?.history}</span>
                        <div>
                            {word.history?.history && `📚 ${word.history.resource_name} (${t("page number (1)")}${word.history.page}${t("page number (2)")})`}
                        </div>
                    </div>
                )}

                {word.example?.example && (
                    <div className="font-bold">
                        <span className="sm:float-right">{t("example")}</span>
                    </div>
                )}
                {word.example?.example && (
                    <div className="mb-2 sm:mb-0">
                        <span>{word.example?.example}</span>
                        <div>
                            {word.example?.example && `📚 ${word.example.resource_name} (${t("page number (1)")}${word.example.page}${t("page number (2)")})`}
                        </div>
                    </div>
                )}
            </div>
            <h1 className="text-3xl text-slate-800 font-bold dark:text-white my-2">{t("reactions")}</h1>

            <div className="grid sm:grid-cols-[auto_1fr] grid-cols-[1fr] sm:gap-1">
                <div className="font-bold mr-2">
                    <span className="sm:float-right">{t("view")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>232</span>
                </div>
                <div className="font-bold mr-2">
                    <span className="sm:float-right">{t("comments")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>10</span>
                </div>
                <div className="font-bold mr-2">
                    <span className="sm:float-right">{t("status")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    {/* to-do: translation */}
                    <span>Yangi</span>
                </div>
                <div className="font-bold mr-2">
                    <span className="sm:float-right">{t("author")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>Najmiddin Nazirov</span>
                </div>
            </div>
        </div>
    );
}
