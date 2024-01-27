/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import UpdateWord from "./Update";

export default function WordSettings({ word, setWord }) {
    return (
        <div>
            <UpdateWord word={word} setWord={setWord} />
        </div>
    );
}
