/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Item({ data }) {
    const navigate = useNavigate();
    const details = (id) => navigate(`${id}/details`);
    const { t } = useTranslation();

    return (
        <div key={data.id} className="grid grid-cols-[1fr_120px] grid-rows-[1fr_24px] min-h-[100px] max-h-[200px] m-2 bg-slate-50/80">
            <div className="pt-1 px-2">
                <div className="inline-block text-md max-h-[100px] text-ellipsis overflow-hidden whitespace-wrap break-word text-justify">
                    <span className="text-lg font-medium text-indigo-600 capitalize">{data.word}</span> - {data.definition}
                </div>
            </div>
            <div className="row-span-2 flex justify-center items-center">
                <button className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded w-20" onClick={() => details(data.id)}>
                    {t("details")}
                </button>
            </div>
            <div className="h-6 px-2">status</div>
            {/* status uchun rang */}
            {/* created_by */}
            {/* commentlar soni */}
            {/* ko'rishlar soni soni */}
        </div>
    );
}
