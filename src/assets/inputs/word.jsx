import React from "react";
import { useTranslation } from "react-i18next";

export default function InputWord({ word }) {
    const { t } = useTranslation();
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-2 lg:inline-block lg:mt-4 lg:mr-8 lg:w-[clamp(calc(850px/3-2rem),calc(33.3333%-2rem),600px)]">
            <div className="sm:col-span-1">
                <span className="p-2 mr-2 font-semibold sm:float-right lg:float-left">{t("word")}:</span>
            </div>
            <div className="sm:col-span-2">
                <div className="mb-6">
                    <input
                        type="text"
                        value={word.word}
                        disabled
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
            </div>
        </div>
    );
}
