/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import UpdateWord from "./Update";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import lucatch from "../../../assets/functions/catch";
import { useNavigate } from "react-router-dom";

export default function WordSettings({ word, setWord }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [opening, setOpening] = useState(null);

    const cancel = () => setOpening(null);

    const deleteWord = async () => {
        await axios
            .delete(`${process.env.REACT_APP_URL}/otil/v1/api/word/status/delete`, {
                headers: { Authorization: localStorage.getItem("token") },
                data: { id: word.id },
            })
            .then(() => {
                navigate("/words");
                toast.success("Success!");
            })
            .catch(lucatch);
    };

    const submitWord = async () => {
        await axios
            .patch(
                `${process.env.REACT_APP_URL}/otil/v1/api/word/status/submit`,
                { id: word.id },
                { headers: { Authorization: localStorage.getItem("token") } }
            )
            .then(() => {
                cancel();
                toast.success("Success!");
            })
            .catch(lucatch);
    };

    return (
        <div className="max-w-7xl mx-auto mb-10">
            <h1 className="text-3xl text-slate-800 font-bold dark:text-white p-2">{t("settings")}</h1>
            <div className="md:grid md:grid-cols-[360px_1fr] gap-4">
                <div className="p-2">
                    <div>Foydalanishga tayyor</div>
                    <div className="text-[0.8rem] text-[#555]">
                        So'z bilan bog'liq barcha tayyorgarliklar tugagandan so'ng, uni ochiq manba uchun foydalanishga chiqarish uchun ushbu operatsiyani
                        bajaring!
                    </div>
                </div>
                <div className="text-right p-2 flex justify-end">
                    <button
                        onClick={() => setOpening("start")}
                        className="self-end bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-md px-6 py-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 float-right"
                    >
                        foydalanishga chiqarish
                    </button>
                </div>
                <motion.div
                    animate={{ opacity: opening !== "start" ? 0 : 1 }}
                    className={cn("col-span-2", {
                        hidden: opening !== "start",
                        "md:hidden": opening !== "start",
                        "md:flex justify-between p-2": opening === "start",
                    })}
                >
                    <div>Foydalanishga chiqarmoqchiligingizni tasdiqlang!</div>
                    <div className="flex justify-end">
                        <button
                            onClick={cancel}
                            className="bg-transparent enabled:hover:bg-rose-500 text-rose-700 font-semibold enabled:hover:text-white border border-rose-500 enabled:hover:border-transparent text-md px-6 py-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            onClick={submitWord}
                            className="bg-transparent enabled:hover:bg-green-500 text-green-700 font-semibold enabled:hover:text-white border border-green-500 enabled:hover:border-transparent text-md px-6 py-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-4"
                        >
                            {t("save")}
                        </button>
                    </div>
                </motion.div>
                <div className="p-2">
                    <div>Tahrirlash</div>
                    <div className="text-[0.8rem] text-[#555]">So'zning tarifi, sinonimlari va shu kabi barcha parametrlarini o'zgartirish</div>
                </div>
                <div className="text-right p-2 flex justify-end">
                    <button
                        onClick={() => setOpening("update")}
                        className="self-end bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-md px-6 py-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 float-right"
                    >
                        {t("change")}
                    </button>
                </div>
                <div className={cn("col-span-2", { hidden: opening !== "update" })}>
                    <UpdateWord word={word} setWord={setWord} setOpening={setOpening} />
                </div>

                <div className="p-2">
                    <div>O'chirish</div>
                    <div className="text-[0.8rem] text-[#555]">So'z va u bilan bog'liq barcha ma'lumotlar o'chib ketadi</div>
                </div>
                <div className="text-right p-2 flex justify-end">
                    <button
                        onClick={() => setOpening("delete")}
                        className="self-end bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-md px-6 py-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                        delete
                    </button>
                </div>
                <div
                    className={cn("col-span-2", {
                        hidden: opening !== "delete",
                        "md:hidden": opening !== "delete",
                        "md:flex justify-between p-2": opening === "delete",
                    })}
                >
                    <div>O'chirmoqchiligingizni tasdiqlang!</div>
                    <div className="flex justify-end">
                        <button
                            onClick={cancel}
                            className="bg-transparent enabled:hover:bg-rose-500 text-rose-700 font-semibold enabled:hover:text-white border border-rose-500 enabled:hover:border-transparent text-md px-6 py-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            onClick={deleteWord}
                            className="bg-transparent enabled:hover:bg-green-500 text-green-700 font-semibold enabled:hover:text-white border border-green-500 enabled:hover:border-transparent text-md px-6 py-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-4"
                        >
                            {t("save")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
