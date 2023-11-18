import React from "react";

export default function ButtonSubmit({ submit }) {
    return (
        <div>
            <div className="mb-6 lg:mr-8">
                <button
                    type="button"
                    onClick={submit}
                    className="float-right bg-blue-500 hover:bg-blue-700 font-semibold text-white border border-blue-500 border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
