/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/favicon.png";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import en from "../assets/Icons/en.png";
import uz from "../assets/Icons/uz.png";
import ru from "../assets/Icons/ru.png";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getRole } from "../store/roles";

export default function Example() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const roles = useSelector(getRole);

    // const [lang, setlang] = useState("uz");
    const [lang, setlang] = useState(Cookies.get("i18next"));
    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const onLanguage = (e) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng);
        setlang(lng);
    };

    const [navigation, setNavigation] = useState([]);
    useEffect(() => {
        const x = [];
        if (roles.includes("Create word")) x.push({ name: t("Create word"), to: "/new-word", current: true });
        x.push({ name: t("Words"), to: "/words", current: false });
        x.push({ name: t("Languages"), to: "/languages", current: false });
        x.push({ name: t("Resources"), to: "/resources", current: false });
        if (roles.includes("View users")) x.push({ name: t("Users"), to: "/users", current: false });
        setNavigation(x);
    }, [roles, lang]);

    return (
        <>
            <div className="min-h-full header">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-14">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="h-4 w-5" src={logo} alt="Your Company" />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-4 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.to}
                                                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {localStorage.getItem("role") === "4" && (
                                                <button
                                                    type="button"
                                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                >
                                                    <NavLink to="/settings" id="test">
                                                        <i className="fa-solid fa-gear"></i>
                                                    </NavLink>
                                                </button>
                                            )}

                                            <div>
                                                {/* <select value={lang} size="small" onChange={onLanguage}>
                                                    <option value="en">
                                                        <img style={{ width: "23px" }} src={en} alt="en" />
                                                    </option>
                                                    <option value="uz">
                                                        <img style={{ width: "23px" }} src={uz} alt="uz" />
                                                    </option>
                                                </select> */}
                                                <Select value={lang} size="small" onChange={onLanguage} className="bg-slate-300 mr-4">
                                                    <MenuItem value="uz">
                                                        <img style={{ width: "23px" }} src={uz} alt="uz" />
                                                    </MenuItem>
                                                    <MenuItem value="ru">
                                                        <img style={{ width: "23px" }} src={ru} alt="ru" />
                                                    </MenuItem>
                                                    <MenuItem value="en">
                                                        <img style={{ width: "23px" }} src={en} alt="en" />
                                                    </MenuItem>
                                                </Select>
                                            </div>
                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <Avatar sx={{ width: 24, height: 24 }} />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            <NavLink to="/sign-out" onClick={logout} className="block px-4 py-2 text-sm text-gray-700">
                                                                {t("Log Out")}
                                                            </NavLink>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.to}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <Avatar sx={{ width: 24, height: 24 }} />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{localStorage.getItem("name")}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{localStorage.getItem("email")}</div>
                                        </div>
                                        {localStorage.getItem("role") === "4" && (
                                            <button
                                                type="button"
                                                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <NavLink to="/settings" id="test">
                                                    <i className="fa-solid fa-gear"></i>
                                                </NavLink>
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        <NavLink
                                            to="sign-out"
                                            onClick={logout}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {t("Log Out")}
                                        </NavLink>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    );
}
