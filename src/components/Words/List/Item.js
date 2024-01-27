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
            <div className="h-6 px-2 text-[13.4px] text-[#888] font-semibold uppercase">
                <div className={`w-[10px] h-[10px] inline-block rounded-full bg-[${statusToColor(data.status)}]`}></div>
                <div className="sm:inline-block hidden">
                    &nbsp; {data.first_name}&nbsp;{data.last_name}
                </div>
                <span>&nbsp; &#9997;{+data.comments}</span>
                <span>&nbsp; &#128065;{+data.views}</span>
            </div>
        </div>
    );
}

const statusToColor = (status) => {
    switch (status) {
        case "new":
            return "#50d71e";
        case "consideration":
            return "#50d71e";
        case "unsatisfied":
            return "#50d71e";
        case "active":
            return "#50d71e";
        case "remove":
            return "#50d71e";

        default:
            return "#50d71e";
    }
};
