import React from "react";

export default function NewWord({ checkNewWord, disable }) {
  return (
    <div className="flex justify-center items-center h-20 mt-10">
      <div className="flex items-baseline">
        <input
          type="text"
          id="new-word"
          disabled={disable}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-10"
          type="button"
          disabled={disable}
          onClick={() => {
            checkNewWord(document.getElementById("new-word").value);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
