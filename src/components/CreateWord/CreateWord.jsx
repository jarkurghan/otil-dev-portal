import React, { useEffect } from "react";
import setCookie from "../../cookie/setCookie";

export default function CreatedWord({ word, setWord, setPageStatus }) {
  useEffect(() => {
    setCookie("word", JSON.stringify(word), 1);
  }, [word]);

  return (
    <div className="flex justify-center items-center flex-col my-2">
      {/* Computer version */}
      <div className="cw-computer w-[calc(100%-3rem)] mx-6 my-2">
        <div className="cwc-container">
          <div className="cwcc-item">
            <div>
              <span className="p-2 mr-2 font-semibold">word:</span>
            </div>
            <div>
              <div className="mb-6">
                <input
                  type="text"
                  value={word.word}
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="cwcc-item">
            <div>
              <span className="p-2 mr-2 font-semibold">language:</span>
            </div>
            <div>
              <div className="mb-6">
                <select
                  defaultValue={word.language}
                  onChange={(e) => {
                    setWord({ ...word, language: e.target.value });
                  }}
                  class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" className="hidden">
                    <span className="text-gray-300">choose language</span>
                  </option>
                  <option value="uz">Uzbek</option>
                </select>
              </div>
            </div>
          </div>
          <div className="cwcc-item">
            <div>
              <span className="p-2 mr-2 font-semibold">word group:</span>
            </div>
            <div>
              <div className="mb-6">
                <select
                  defaultValue={word.word_group}
                  onChange={(e) => {
                    setWord({ ...word, word_group: e.target.value });
                  }}
                  class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" className="hidden">
                    <span className="text-gray-300">choose word type</span>
                  </option>
                  <option value={1}>fe'l</option>
                  <option value={2}>ot</option>
                  <option value={3}>sifat</option>
                  <option value={4}>son</option>
                </select>
              </div>
            </div>
          </div>
          <div className="cwcc-item">
            <div>
              <span className="p-2 mr-2 font-semibold">definition:</span>
            </div>
            <div>
              <div className="mb-6">
                <textarea
                  rows="4"
                  defaultValue={word.definition.definition}
                  onChange={(e) => {
                    setWord({ ...word, definition: { ...word.definition, definition: e.target.value } });
                  }}
                  className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
                ></textarea>
                <select
                  defaultValue={word.definition.resource || ""}
                  onChange={(e) => {
                    setWord({ ...word, definition: { ...word.definition, resource: e.target.value } });
                  }}
                  class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" className="hidden">
                    choose resource
                  </option>
                  <option value="uz">Uzbek</option>
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
          <div className="cwcc-item">
            <div>
              <span className="p-2 mr-2 font-semibold">history of origin:</span>
            </div>
            <div>
              <div className="mb-6">
                <textarea
                  rows="4"
                  defaultValue={word.history.history}
                  onChange={(e) => {
                    setWord({ ...word, history: { ...word.history, history: e.target.value } });
                  }}
                  className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
                ></textarea>
                <select
                  defaultValue={word.history.resource || ""}
                  onChange={(e) => {
                    setWord({ ...word, history: { ...word.history, resource: e.target.value } });
                  }}
                  class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" className="hidden">
                    <span className="text-gray-300">choose resource</span>
                  </option>
                  <option value="uz">Uzbek</option>
                </select>
                <input
                  type="number"
                  placeholder="page"
                  defaultValue={word.history.page || ""}
                  onChange={(e) => {
                    setWord({ ...word, history: { ...word.history, page: e.target.value } });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                />
              </div>
            </div>
          </div>
          <div className="cwcc-item">
            <div>
              <span className="p-2 mr-2 font-semibold">is it used in any official or literary source?</span>
            </div>
            <div>
              <div className="mb-6">
                <textarea
                  rows="4"
                  defaultValue={word.example.example}
                  onChange={(e) => {
                    setWord({ ...word, example: { ...word.example, example: e.target.value } });
                  }}
                  className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
                ></textarea>
                <select
                  defaultValue={word.example.resource || ""}
                  onChange={(e) => {
                    setWord({ ...word, example: { ...word.example, resource: e.target.value } });
                  }}
                  class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" className="hidden">
                    <span className="text-gray-300">choose resource</span>
                  </option>
                  <option value="uz">Uzbek</option>
                </select>
                <input
                  type="number"
                  placeholder="page"
                  defaultValue={word.example.page || ""}
                  onChange={(e) => {
                    setWord({ ...word, example: { ...word.example, page: e.target.value } });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                />
              </div>
            </div>
          </div>
          <div className="cwcc-item">
            <div>
              <span className="p-2 mr-2 font-semibold">other forms:</span>
            </div>
            <div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <input
                    type="text"
                    id="phone_other_forms"
                    defaultValue={word.other_forms_text}
                    onChange={(e) => {
                      setWord({ ...word, other_forms_text: e.target.value });
                    }}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-5"
                    onClick={() => {
                      const element = document.getElementById("phone_other_forms");
                      if (word.other_forms.indexOf(element.value) === -1) word.other_forms.push(element.value);
                      element.value = "";
                      element.focus();
                      setWord({ ...word });
                    }}
                    type="button"
                  >
                    Add
                  </button>
                </div>
                {word.other_forms.length > 0 && (
                  <div className="inline-block w-[calc(100%)] mt-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                    {word.other_forms[0]}
                    {word.other_forms.length > 1 && word.other_forms.slice(1, word.other_forms.length).map((e) => `, ${e}`)}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="cwcc-item">
            <div>
              <span className="p-2 mr-2 font-semibold">other forms 2:</span>
            </div>
            <div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <input
                    type="text"
                    id="phone_other_forms_2"
                    defaultValue={word.other_forms_2_text}
                    onChange={(e) => {
                      setWord({ ...word, other_forms_2_text: e.target.value });
                    }}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-5"
                    type="button"
                    onClick={() => {
                      const element = document.getElementById("phone_other_forms_2");
                      if (word.other_forms_2.indexOf(element.value) === -1) word.other_forms_2.push(element.value);
                      element.value = "";
                      element.focus();
                      setWord({ ...word });
                    }}
                  >
                    Add
                  </button>
                </div>

                {word.other_forms_2.length > 0 && (
                  <div className="inline-block w-[calc(100%)] mt-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                    {word.other_forms_2[0]}
                    {word.other_forms_2.length > 1 && word.other_forms_2.slice(1, word.other_forms_2.length).map((e) => `, ${e}`)}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-6 mr-8">
              <button
                className="cwc-submit bg-blue-500 hover:bg-blue-700 font-semibold text-white border border-blue-500 border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setCookie("word", "", 0);
                  setPageStatus("new");
                  setWord({});
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet computer version */}
      <div className="cw-tablet w-[calc(100%-3rem)] mx-6 my-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1">
            <span className="float-right p-2 mr-2 font-semibold">word:</span>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <input
                type="text"
                value={word.word}
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="col-span-1">
            <span className="float-right p-2 mr-2 font-semibold">definition:</span>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <textarea
                rows="4"
                defaultValue={word.definition.definition}
                onChange={(e) => {
                  setWord({ ...word, definition: { ...word.definition, definition: e.target.value } });
                }}
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
              ></textarea>
              <select
                defaultValue={word.definition.resource || ""}
                onChange={(e) => {
                  setWord({ ...word, definition: { ...word.definition, resource: e.target.value } });
                }}
                class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  choose resource
                </option>
                <option value="uz">Uzbek</option>
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
          <div className="col-span-1">
            <span className="float-right p-2 mr-2 font-semibold">history of origin:</span>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <textarea
                rows="4"
                defaultValue={word.history.history}
                onChange={(e) => {
                  setWord({ ...word, history: { ...word.history, history: e.target.value } });
                }}
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
              ></textarea>
              <select
                defaultValue={word.history.resource || ""}
                onChange={(e) => {
                  setWord({ ...word, history: { ...word.history, resource: e.target.value } });
                }}
                class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  <span className="text-gray-300">choose resource</span>
                </option>
                <option value="uz">Uzbek</option>
              </select>
              <input
                type="number"
                placeholder="page"
                defaultValue={word.history.page || ""}
                onChange={(e) => {
                  setWord({ ...word, history: { ...word.history, page: e.target.value } });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
              />
            </div>
          </div>
          <div className="col-span-1">
            <span className="float-right p-2 mr-2 font-semibold">is it used in any official or literary source?</span>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <textarea
                rows="4"
                defaultValue={word.example.example}
                onChange={(e) => {
                  setWord({ ...word, example: { ...word.example, example: e.target.value } });
                }}
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
              ></textarea>
              <select
                defaultValue={word.example.resource || ""}
                onChange={(e) => {
                  setWord({ ...word, example: { ...word.example, resource: e.target.value } });
                }}
                class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  <span className="text-gray-300">choose resource</span>
                </option>
                <option value="uz">Uzbek</option>
              </select>
              <input
                type="number"
                placeholder="page"
                defaultValue={word.example.page || ""}
                onChange={(e) => {
                  setWord({ ...word, example: { ...word.example, page: e.target.value } });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
              />
            </div>
          </div>
          <div className="col-span-1">
            <span className="float-right p-2 mr-2 font-semibold">other forms:</span>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <div className="flex items-baseline">
                <input
                  type="text"
                  id="tablet_other_forms"
                  defaultValue={word.other_forms_text}
                  onChange={(e) => {
                    setWord({ ...word, other_forms_text: e.target.value });
                  }}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-5"
                  onClick={() => {
                    const element = document.getElementById("tablet_other_forms");
                    if (word.other_forms.indexOf(element.value) === -1) word.other_forms.push(element.value);
                    element.value = "";
                    element.focus();
                    setWord({ ...word });
                  }}
                  type="button"
                >
                  Add
                </button>
              </div>
              {word.other_forms.length > 0 && (
                <div className="inline-block w-[calc(100%)] mt-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                  {word.other_forms[0]}
                  {word.other_forms.length > 1 && word.other_forms.slice(1, word.other_forms.length).map((e) => `, ${e}`)}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <span className="float-right p-2 mr-2 font-semibold">other forms 2:</span>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <div className="flex items-baseline">
                <input
                  type="text"
                  id="tablet_other_forms_2"
                  defaultValue={word.other_forms_2_text}
                  onChange={(e) => {
                    setWord({ ...word, other_forms_2_text: e.target.value });
                  }}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-5"
                  type="button"
                  onClick={() => {
                    const element = document.getElementById("tablet_other_forms_2");
                    if (word.other_forms_2.indexOf(element.value) === -1) word.other_forms_2.push(element.value);
                    element.value = "";
                    element.focus();
                    setWord({ ...word });
                  }}
                >
                  Add
                </button>
              </div>
              {word.other_forms_2.length > 0 && (
                <div className="inline-block w-[calc(100%)] mt-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                  {word.other_forms_2[0]}
                  {word.other_forms_2.length > 1 && word.other_forms_2.slice(1, word.other_forms_2.length).map((e) => `, ${e}`)}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <span className="float-right p-2 mr-2 font-semibold">language:</span>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <select
                defaultValue={word.language}
                onChange={(e) => {
                  setWord({ ...word, language: e.target.value });
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  <span className="text-gray-300">choose language</span>
                </option>
                <option value="uz">Uzbek</option>
              </select>
            </div>
          </div>
          <div className="col-span-1">
            <span className="float-right p-2 mr-2 font-semibold">word group:</span>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <select
                defaultValue={word.word_group}
                onChange={(e) => {
                  setWord({ ...word, word_group: e.target.value });
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  <span className="text-gray-300">choose word type</span>
                </option>
                <option value={1}>fe'l</option>
                <option value={2}>ot</option>
                <option value={3}>sifat</option>
                <option value={4}>son</option>
              </select>
            </div>
          </div>

          <div className="col-span-3">
            <div className="mb-6">
              <button
                className="float-right bg-blue-500 hover:bg-blue-700 font-semibold text-white border border-blue-500 border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setCookie("word", "", 0);
                  setPageStatus("new");
                  setWord({});
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Phone version */}
      <div className="cw-phone mx-6 w-[calc(100%-3rem)] ">
        <div>
          <div>
            <span className="p-2 mr-2 font-semibold">word:</span>
          </div>
          <div>
            <div className="mb-6">
              <input
                type="text"
                value={word.word}
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <span className="p-2 mr-2 font-semibold">definition:</span>
          </div>
          <div>
            <div className="mb-6">
              <textarea
                rows="4"
                defaultValue={word.definition.definition}
                onChange={(e) => {
                  setWord({ ...word, definition: { ...word.definition, definition: e.target.value } });
                }}
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
              ></textarea>
              <select
                defaultValue={word.definition.resource || ""}
                onChange={(e) => {
                  setWord({ ...word, definition: { ...word.definition, resource: e.target.value } });
                }}
                class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  choose resource
                </option>
                <option value="uz">Uzbek</option>
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
          <div>
            <span className="p-2 mr-2 font-semibold">history of origin:</span>
          </div>
          <div>
            <div className="mb-6">
              <textarea
                rows="4"
                defaultValue={word.history.history}
                onChange={(e) => {
                  setWord({ ...word, history: { ...word.history, history: e.target.value } });
                }}
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
              ></textarea>
              <select
                defaultValue={word.history.resource || ""}
                onChange={(e) => {
                  setWord({ ...word, history: { ...word.history, resource: e.target.value } });
                }}
                class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  <span className="text-gray-300">choose resource</span>
                </option>
                <option value="uz">Uzbek</option>
              </select>
              <input
                type="number"
                placeholder="page"
                defaultValue={word.history.page || ""}
                onChange={(e) => {
                  setWord({ ...word, history: { ...word.history, page: e.target.value } });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
              />
            </div>
          </div>
          <div>
            <span className="p-2 mr-2 font-semibold">is it used in any official or literary source?</span>
          </div>
          <div>
            <div className="mb-6">
              <textarea
                rows="4"
                defaultValue={word.example.example}
                onChange={(e) => {
                  setWord({ ...word, example: { ...word.example, example: e.target.value } });
                }}
                className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none focus:outline-none"
              ></textarea>
              <select
                defaultValue={word.example.resource || ""}
                onChange={(e) => {
                  setWord({ ...word, example: { ...word.example, resource: e.target.value } });
                }}
                class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  <span className="text-gray-300">choose resource</span>
                </option>
                <option value="uz">Uzbek</option>
              </select>
              <input
                type="number"
                placeholder="page"
                defaultValue={word.example.page || ""}
                onChange={(e) => {
                  setWord({ ...word, example: { ...word.example, page: e.target.value } });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
              />
            </div>
          </div>
          <div>
            <span className="p-2 mr-2 font-semibold">other forms:</span>
          </div>
          <div>
            <div className="mb-6">
              <div className="flex items-baseline">
                <input
                  type="text"
                  id="phone_other_forms"
                  defaultValue={word.other_forms_text}
                  onChange={(e) => {
                    setWord({ ...word, other_forms_text: e.target.value });
                  }}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-5"
                  onClick={() => {
                    const element = document.getElementById("phone_other_forms");
                    if (word.other_forms.indexOf(element.value) === -1) word.other_forms.push(element.value);
                    element.value = "";
                    element.focus();
                    setWord({ ...word });
                  }}
                  type="button"
                >
                  Add
                </button>
              </div>
              {word.other_forms.length > 0 && (
                <div className="inline-block w-[calc(100%)] mt-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                  {word.other_forms[0]}
                  {word.other_forms.length > 1 && word.other_forms.slice(1, word.other_forms.length).map((e) => `, ${e}`)}
                </div>
              )}
            </div>
          </div>
          <div>
            <span className="p-2 mr-2 font-semibold">other forms 2:</span>
          </div>
          <div>
            <div className="mb-6">
              <div className="flex items-baseline">
                <input
                  type="text"
                  id="phone_other_forms_2"
                  defaultValue={word.other_forms_2_text}
                  onChange={(e) => {
                    setWord({ ...word, other_forms_2_text: e.target.value });
                  }}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-5"
                  type="button"
                  onClick={() => {
                    const element = document.getElementById("phone_other_forms_2");
                    if (word.other_forms_2.indexOf(element.value) === -1) word.other_forms_2.push(element.value);
                    element.value = "";
                    element.focus();
                    setWord({ ...word });
                  }}
                >
                  Add
                </button>
              </div>

              {word.other_forms_2.length > 0 && (
                <div className="inline-block w-[calc(100%)] mt-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                  {word.other_forms_2[0]}
                  {word.other_forms_2.length > 1 && word.other_forms_2.slice(1, word.other_forms_2.length).map((e) => `, ${e}`)}
                </div>
              )}
            </div>
          </div>
          <div>
            <span className="p-2 mr-2 font-semibold">language:</span>
          </div>
          <div>
            <div className="mb-6">
              <select
                defaultValue={word.language}
                onChange={(e) => {
                  setWord({ ...word, language: e.target.value });
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  <span className="text-gray-300">choose language</span>
                </option>
                <option value="uz">Uzbek</option>
              </select>
            </div>
          </div>
          <div>
            <span className="p-2 mr-2 font-semibold">word group:</span>
          </div>
          <div>
            <div className="mb-6">
              <select
                defaultValue={word.word_group}
                onChange={(e) => {
                  setWord({ ...word, word_group: e.target.value });
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="hidden">
                  <span className="text-gray-300">choose word type</span>
                </option>
                <option value={1}>fe'l</option>
                <option value={2}>ot</option>
                <option value={3}>sifat</option>
                <option value={4}>son</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mb-6">
              <button
                className="float-right bg-blue-500 hover:bg-blue-700 font-semibold text-white border border-blue-500 border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setCookie("word", "", 0);
                  setPageStatus("new");
                  setWord({});
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
