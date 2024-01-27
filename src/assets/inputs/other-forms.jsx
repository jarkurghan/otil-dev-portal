import React from "react";
import { useTranslation } from "react-i18next";

export default function InputOtherForms({ word, setWord }) {
    const { t } = useTranslation();

    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-2 lg:inline-block lg:mt-4 lg:mr-8 lg:w-[clamp(calc(850px/3-2rem),calc(33.3333%-2rem),600px)]">
            <div className="sm:col-span-1">
                <span className="p-2 mr-2 font-semibold sm:float-right lg:float-left">{t("other forms")}:</span>
            </div>
            <div className="sm:col-span-2">
                <div className="mb-6">
                    <div className="flex items-baseline">
                        <input
                            type="text"
                            id="synonyms"
                            defaultValue={word.synonyms_text}
                            onChange={(e) => setWord({ ...word, synonyms_text: e.target.value })}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                            className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-5"
                            onClick={() => {
                                const element = document.getElementById("synonyms");
                                if (word.synonyms.indexOf(element.value) === -1 && Boolean(element.value)) word.synonyms.push(element.value);
                                element.value = "";
                                element.focus();
                                setWord({ ...word });
                            }}
                            type="button"
                        >
                            {t("add")}
                        </button>
                    </div>
                    {word.synonyms.length > 0 && (
                        <div className="inline-block w-[calc(100%)] mt-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                            {word.synonyms[0]}
                            {word.synonyms.length > 1 && word.synonyms.slice(1, word.synonyms.length).map((e) => `, ${e}`)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
