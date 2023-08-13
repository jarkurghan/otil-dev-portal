import React from "react";

export default function ConfirmCreate({ setStatus, word }) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="my-2 mx-5 text-center">
        Are you sure you want to create the word <b>{word.word}</b>?
      </div>
      <div className="flex items-baseline">
        <button
          className="min-w-max bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 mx-5"
          type="button"
          onClick={() => {
            setStatus(true);
          }}
        >
          Yes
        </button>
        <button
          className="min-w-max bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 mx-5"
          type="button"
          onClick={() => {
            setStatus(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
