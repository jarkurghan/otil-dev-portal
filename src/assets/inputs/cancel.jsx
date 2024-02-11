import React from "react";
import { useTranslation } from "react-i18next";

export default function ButtonCancel({ cancel }) {
    const { t } = useTranslation();
    return (
        <div>
            <div className="mb-6 lg:mr-8">
                <button
                    type="button"
                    onClick={cancel}
                    className="float-right bg-blue-500 hover:bg-blue-700 font-semibold text-white border border-blue-500 border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                    {t("cancel")}
                </button>
            </div>
        </div>
    );
}
