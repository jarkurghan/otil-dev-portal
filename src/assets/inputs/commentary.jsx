import React from "react";

export default function InputCommentary({ send }) {
    const start = () => {
        // tayyormas
    };
    return (
        <div className="">
            <div className="">
                <div className="pl-12 pr-4 md:w-[750px]">
                    <textarea
                        rows="4"
                        id="send-comment"
                        onFocus={start}
                        className="resize-none block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none focus:outline-none"
                    ></textarea>
                    <button
                        onClick={send}
                        id="comment-send"
                        className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-md px-6 py-1 my-3 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 float-right"
                        type="button"
                    >
                        &#10148;
                    </button>
                </div>
            </div>
        </div>
    );
}
