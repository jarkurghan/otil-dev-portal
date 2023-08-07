import React from "react";
import UserPolicies from "../User/UserPolicy";
import UserActivity from "./UserActivity";
import { useState } from "react";
import Users from "./Users";
import Spinner from "react-spinner-material";
import CreateUser from "./CreateUser";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState(
    navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
    )
  );
  return (
    <div className="my-8 pb-12">
      {!loading && (
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center my-2"
        >
          Create User
        </button>
      )}
      <Users setLoading={setLoading} />
      {loading ? (
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner radius={150} color={"#1976d2"} stroke={16} visible={true} />
        </div>
      ) : (
        <>
          <UserPolicies />
          {!device && <UserActivity />}
          <CreateUser open={open} setOpen={setOpen} />
        </>
      )}
    </div>
  );
};

export default Index;
