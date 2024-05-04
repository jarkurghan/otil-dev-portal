import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Item({ data }) {
    const navigate = useNavigate();
    const details = (id) => navigate(`${id}/details`);
    const { t } = useTranslation();

    return (
        <div key={data.id} className="grid grid-cols-[1fr_auto] grid-rows-[1fr_24px] min-h-[50px] max-h-[200px] m-2 bg-slate-50/80">
            <div className="pt-1 px-2">
                <div className="inline-block text-md max-h-[100px] text-ellipsis overflow-hidden whitespace-wrap break-word text-justify">
                    <span className="text-lg font-medium text-indigo-600 capitalize">{data.word}</span> -{" "}
                    {data.definition ? data.definition : data.synonyms?.map((e, i) => `${e.word}${data.synonyms.length !== i + 1 ? ", " : ""}`)}
                </div>
            </div>
            <div className="row-span-2 flex justify-center items-center mx-2">
                <button className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-3 rounded" onClick={() => details(data.id)}>
                    {t("details")}
                </button>
            </div>
            <div className="h-6 px-2 text-[13.4px] text-[#888] font-semibold uppercase">
                <div className={`w-[10px] h-[10px] inline-block rounded-full`} style={{ backgroundColor: statusToColor(data.status) }}></div>
                <div className="sm:inline-block hidden">
                    &nbsp; {data.first_name}&nbsp;{data.last_name}
                </div>
                <span>&nbsp; &#9997;{+data.comments}</span>
                {/* hozircha tayyor bo'lmagani uchun commentda */}
                {/* <span>&nbsp; &#128065;{+data.views}</span> */}
            </div>
        </div>
    );
}

const statusToColor = (status) => {
    switch (status) {
        case "new":
            return "#FFA500";
        case "consideration":
            return "#FF1493";
        case "unsatisfied":
            return "#00BFFF";
        case "active":
            return "#00FF00";
        case "remove":
            return "#2F4F4F";

        default:
            return "#FF0000";
    }
};
