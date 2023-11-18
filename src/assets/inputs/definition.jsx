import React from "react";

export default function InputDefinition({ word, setWord, resources }) {
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-2 lg:inline-block lg:mt-4 lg:mr-8 lg:w-[clamp(calc(850px/3-2rem),calc(33.3333%-2rem),600px)]">
            <div className="sm:col-span-1">
                <span className="p-2 mr-2 font-semibold sm:float-right lg:float-left">definition:</span>
            </div>
            <div className="sm:col-span-2">
                <div className="mb-6">
                    <textarea
                        rows="4"
                        defaultValue={word.definition.definition}
                        onChange={(e) => {
                            setWord({ ...word, definition: { ...word.definition, definition: e.target.value } });
                        }}
                        className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
                    />
                    <select
                        value={word.definition.resource || ""}
                        onChange={(e) => {
                            setWord({ ...word, definition: { ...word.definition, resource: e.target.value } });
                        }}
                        className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" className="hidden">
                            choose resource
                        </option>
                        <option value={""}>not choosing</option>
                        {resources.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        defaultValue={word.definition.page || ""}
                        onChange={(e) => {
                            setWord({ ...word, definition: { ...word.definition, page: e.target.value } });
                        }}
                        placeholder="page"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                    />
                </div>
            </div>
        </div>
    );
}
