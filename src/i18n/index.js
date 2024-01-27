import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "./en.json";
import uz from "./uz.json";
import ru from "./ru.json";

i18n.use(initReactI18next)
    .use(detector)
    .init({
        fallbackLng: "en",
        interpolation: { escapeValue: false },
        resources: { en: { translation: en }, ru: { translation: ru }, uz: { translation: uz } },
        detection: { order: ["cookie", "localstorage"], caches: ["cookie"] },
    });

export default i18n;
