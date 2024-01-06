/* eslint-disable no-unused-vars */
import React from "react";
import UserPolicies from "../components/User/UserPolicy";
import { useState } from "react";
import Spinner from "react-spinner-material";
import UsersTable from "../components/User/Users";
import "../components/User/style.css";
import CreateUser from "../components/User/CreateUser";

const Users = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [device] = useState(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i));
    return (
        <div className="mx-5 mt-5">
            <UsersTable setLoading={setLoading} />
            {loading ? (
                <div style={{ marginTop: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Spinner radius={150} color={"#1976d2"} stroke={16} visible={true} />
                </div>
            ) : (
                <>
                    <UserPolicies />
                    <CreateUser open={open} setOpen={setOpen} />
                    <div className="h-16 text-left">
                        <button onClick={() => setOpen(true)} className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded my-4">
                            Create User
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Users;
