import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lucatch from "../../assets/functions/catch";

const CreateResource = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [src, setSRC] = useState(null);
    const navigate = useNavigate();

    const selectFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.addEventListener("load", () => setSRC(reader.result), false);
        if (file) reader.readAsDataURL(file);
    };

    const submit = async () => {
        const data = new FormData();
        data.append("name", name);
        data.append("file", file);

        await axios
            .post(`${process.env.REACT_APP_URL}/otil/v1/api/resource`, data, { headers: { Authorization: sessionStorage.getItem("token") } })
            .then(() => navigate("/create-resource"))
            .catch(lucatch);
    };

    return (
        <div className="mx-auto">
            <div className="flex justify-center items-center h-28 mx-8">
                <div className="flex items-baseline">
                    <input
                        type="text"
                        id="new-resource"
                        placeholder="name"
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button
                        type="button"
                        className="relative min-w-[120px] bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-10"
                    >
                        {file ? <span>Change File</span> : <span>Select File</span>}
                        <input
                            type="file"
                            id="new-resource-file"
                            accept="application/pdf"
                            className="absolute top-0 right-0 w-full h-full opacity-0"
                            onChange={selectFile}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={submit}
                        className="bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ml-10"
                    >
                        Submit
                    </button>
                </div>
            </div>
            {src && (
                <div className="w-full flex justify-center">
                    <iframe title={file.name} src={src} className="w-[100%] max-w-5xl h-[900px]" />
                </div>
            )}
        </div>
    );
};

export default CreateResource;
