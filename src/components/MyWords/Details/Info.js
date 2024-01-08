/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

export default function WordInfo({ word }) {
    return (
        <div className="max-w-7xl my-5 px-2 mx-auto">
            <h1 className="text-3xl text-slate-800 font-bold dark:text-white my-2">Details</h1>
            <div className="grid sm:grid-cols-[auto_1fr] grid-cols-[1fr] sm:gap-3">
                <div className="font-bold">
                    <span className="sm:float-right">So'z</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>{word.word}</span>
                </div>

                <div className="font-bold">
                    <span className="sm:float-right">Ta'rif</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>{word.definition?.definition}</span>
                    <div>{`📚 ${word.definition?.resource_name} (${word.definition?.page}-bet)`}</div>
                </div>

                {word.history?.history && (
                    <div className="font-bold">
                        <span className="sm:float-right">History</span>
                    </div>
                )}
                {word.history?.history && (
                    <div className="mb-2 sm:mb-0">
                        <span>{word.history?.history}</span>
                        <div>{word.history?.history && `📚 ${word.history.resource_name} (${word.history.page}-bet)`}</div>
                    </div>
                )}

                {word.example?.example && (
                    <div className="font-bold">
                        <span className="sm:float-right">Example</span>
                    </div>
                )}
                {word.example?.example && (
                    <div className="mb-2 sm:mb-0">
                        <span>{word.example?.example}</span>
                        <div>{word.example?.example && `📚 ${word.example.resource_name} (${word.example.page}-bet)`}</div>
                    </div>
                )}
            </div>
            <h1 className="text-3xl text-slate-800 font-bold dark:text-white my-2">Reactions</h1>

            <div className="grid sm:grid-cols-[auto_1fr] grid-cols-[1fr] sm:gap-1">
                <div className="font-bold mr-2">
                    <span className="sm:float-right">Ko'rishlar soni</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>232</span>
                </div>
                <div className="font-bold mr-2">
                    <span className="sm:float-right">Fikrlar soni</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>10</span>
                </div>
                <div className="font-bold mr-2">
                    <span className="sm:float-right">Status</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>Yangi</span>
                </div>
                <div className="font-bold mr-2">
                    <span className="sm:float-right">Avtor</span>
                </div>
                <div className="mb-2 sm:mb-0">
                    <span>Najmiddin Nazirov</span>
                </div>
            </div>
        </div>
    );
}
