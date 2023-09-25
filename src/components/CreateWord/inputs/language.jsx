import React from "react";

export default function InputLanguage({ word, setWord, languages }) {
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-2 lg:inline-block lg:mt-4 lg:mr-8 lg:w-[clamp(calc(850px/3-2rem),calc(33.3333%-2rem),600px)]">
            <div className="sm:col-span-1">
                <span className="p-2 mr-2 font-semibold sm:float-right lg:float-left">language:</span>
            </div>
            <div className="sm:col-span-2">
                <div className="mb-6">
                    <select
                        value={word.language}
                        onChange={(e) => {
                            setWord({ ...word, language: e.target.value });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" className="hidden">
                            choose language
                        </option>
                        {languages.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.language}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
