import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import getCookie from "../../../cookie/getCookie";
import axios from "axios";
import setCookie from "../../../cookie/setCookie";

export default function WordInfo({ word, id }) {
    const { t } = useTranslation();

    function wordViewCountIncrement() {
        try {
            const view = getCookie("wvc" + id);
            if (!view) {
                axios.post(`${process.env.REACT_APP_URL}/lugat/word/view`, { word: id });
                setCookie("wvc" + id, true, 10);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        wordViewCountIncrement();
    }, []);

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

                {word.definition?.definition && (
                    <div className="font-bold">
                        <span className="sm:float-right">{t("definition")}</span>
                    </div>
                )}
                {word.definition?.definition && (
                    <div className="mb-2 sm:mb-0">
                        <span>{word.definition?.definition}</span>
                        <div>{`📚 ${word.definition?.resource_name} (${t("page number (1)")}${word.definition?.page}${t("page number (2)")})`}</div>
                    </div>
                )}
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

                {word.example?.phrase && (
                    <div className="font-bold">
                        <span className="sm:float-right">{t("example")}</span>
                    </div>
                )}
                {word.example?.phrase && (
                    <div className="mb-2 sm:mb-0">
                        <span>{word.example?.phrase}</span>
                        <div>
                            {word.example?.phrase && `📚 ${word.example.resource_name} (${t("page number (1)")}${word.example.page}${t("page number (2)")})`}
                        </div>
                    </div>
                )}

                {word.synonyms?.length > 0 && (
                    <div className="font-bold">
                        <span className="sm:float-right">{t("synonyms")}</span>
                    </div>
                )}
                {word.synonyms?.length > 0 && (
                    <div className="mb-2 sm:mb-0">
                        {word.synonyms.map((e, i) => (
                            <span>
                                {e.word}
                                {i !== word.synonyms.length - 1 && ", "}
                            </span>
                        ))}
                    </div>
                )}

                <div className="font-bold">
                    <span className="sm:float-right">{t("part of speech")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>{word.word_type}</span>
                </div>
                <div className="font-bold">
                    <span className="sm:float-right">{t("language")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>{word.language}</span>
                </div>
            </div>
            <h1 className="text-3xl text-slate-800 font-bold dark:text-white my-2">{t("reactions")}</h1>

            <div className="grid sm:grid-cols-[auto_1fr] grid-cols-[1fr] sm:gap-1">
                <div className="font-bold mr-2">
                    <span className="sm:float-right">{t("view")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>{+word.view?.count || 1}</span>
                </div>
                <div className="font-bold mr-2">
                    <span className="sm:float-right">{t("comments")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>{+word.comment?.count}</span>
                </div>
                <div className="font-bold mr-2">
                    <span className="sm:float-right">{t("status")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    {/* to-do: translation */}
                    <span>{t(word.status)}</span>
                </div>
                <div className="font-bold mr-2">
                    <span className="sm:float-right">{t("author")}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>
                        {word.first_name} {word.last_name}
                    </span>
                </div>
            </div>
        </div>
    );
}
