import { Fragment, useRef, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import axios from "axios";

export default function CreateUser({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [spinner, setSpinner] = useState(false);
  const [body, setBody] = useState({ email: "", name: "", password: "" });

  const setOpen2 = (bool) => {
    if (!bool) setBody({ email: "", name: "", password: "" });
    setOpen(bool);
  };

  const Submit = () => {
    if (!/^\s*[a-z]+\s+[a-z]+\s*$/i.test(body.name))
      return toast.error("Name is invalid");
    if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@transoxiania.com$/i.test(body.email))
      return toast.error("Email is invalid");
    if (!body.email.length) return toast.error("password is invalid");
    setSpinner(true);
    axios
      .post(`${process.env.REACT_APP_URL}/api/idp/v2/user`, body, {
        headers: { Authorization: sessionStorage.getItem("token") },
      })
      .then((res) => {
        toast.success("Successfully sended!");
        setSpinner(false);
        setOpen2(false);
      })
      .catch((error) => {
        toast.error("An Error occurred!");
        setSpinner(false);
      });
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen2}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start w-full">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900 mb-4"
                        >
                          Create User
                        </Dialog.Title>
                        <form className="add_form">
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <input
                                  defaultValue={body.name}
                                  disabled={spinner}
                                  placeholder="Name"
                                  type="text"
                                  onChange={(e) => {
                                    body.name = e.target.value;
                                    setBody(body);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <input
                                  defaultValue={body.email}
                                  disabled={spinner}
                                  placeholder="Email"
                                  type="text"
                                  onChange={(e) => {
                                    body.email = e.target.value;
                                    setBody(body);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <input
                                  defaultValue={body.password}
                                  disabled={spinner}
                                  placeholder="Password"
                                  type="text"
                                  onChange={(e) => {
                                    body.password = e.target.value;
                                    setBody(body);
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      onClick={Submit}
                      disabled={spinner}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 sm:ml-3 sm:w-auto"
                    >
                      {spinner ? (
                        <CircularProgress className="mr-2" size="0.9rem" />
                      ) : (
                        ""
                      )}
                      Save
                    </button>
                    <button
                      type="button"
                      disabled={spinner}
                      onClick={() => setOpen2(false)}
                      ref={cancelButtonRef}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
