import React from "react";

export default function CreatedWord({ word }) {
  return (
    <div className="flex justify-center items-center flex-col my-2">
      <div className="w-fit">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="float-right p-2 mr-2 font-semibold">word:</span>
          </div>
          <div>
            <div class="mb-6">
              <input
                type="text"
                value={word}
                disabled
                id="default-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <span className="float-right p-2 mr-2 font-semibold">definition:</span>
          </div>
          <div>
            <div class="mb-6">
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
              ></textarea>
              {/* <input
                type="text"
                value={word}
                disabled
                id="default-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              /> */}
            </div>
          </div>
          <div>
            <span className="float-right p-2 mr-2 font-semibold">word:</span>
          </div>
          <div>
            <div class="mb-6">
              <input
                type="text"
                value={word}
                disabled
                id="default-input"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
