/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import UpdateWord from "./UpdateWord";

export default function WordSettings({ word, setWord }) {
    return (
        <div>
            <UpdateWord word={word} setWord={setWord} />
        </div>
    );
}
