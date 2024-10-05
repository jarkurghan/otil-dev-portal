import React from "react";

export default function CurrentWord({ word }) {
    return (
        <div className="sm:m-3 p-1 rounded 2xl:mx-20">
            <div className="text-md text-justify">
                <span className="text-lg font-medium text-indigo-600 capitalize">{word.word}</span> -{" "}
                {word.definition?.definition
                    ? word.definition.definition
                    : word.synonyms?.map((e, i) => `${e.word}${word.synonyms.length !== i + 1 ? ", " : ""}`)}
            </div>
        </div>
    );
}
