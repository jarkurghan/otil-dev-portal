/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import lucatch from "../../assets/functions/catch";

const CreateUser = () => {
    const navigate = useNavigate();

    const submit = async (data, setSubmitting) => {
        await axios
            .post(`${process.env.REACT_APP_URL}/otil/v1/api/user`, data, { headers: { Authorization: localStorage.getItem("token") } })
            .then(() => navigate("/users"))
            .catch(lucatch);
        setSubmitting(false);
    };

    return (
        <div className="mx-2 sm:mx-auto max-w-4xl my-4 sm:my-8">
            <h1 className="mb-2 sm:mb-4 text-3xl font-bold leading-none tracking-tight text-gray-700 dark:text-white">Create User</h1>
            <Formik initialValues={{ first_name: "", last_name: "", email: "", phone: "" }} onSubmit={submit}>
                <Form className="grid sm:grid-cols-2 sm:gap-6 grid-cols-1 gap-3">
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <Field id="first_name" name="first_name" placeholder="Najmiddin" className="w-full py-1 px-2 my-1" />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <Field id="last_name" name="last_name" placeholder="Nazirov" className="w-full py-1 px-2 my-1" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" placeholder="jarkurghan@gmail.com" type="email" className="w-full py-1 px-2 my-1" />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <Field id="phone" name="phone" placeholder="+998772590100" type="phone" className="w-full py-1 px-2 my-1" />
                    </div>
                    <div></div>
                    <div>
                        <button
                            type="submit"
                            className="float-right bg-transparent enabled:hover:bg-blue-500 text-blue-700 font-semibold enabled:hover:text-white border border-blue-500 enabled:hover:border-transparent text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default CreateUser;
