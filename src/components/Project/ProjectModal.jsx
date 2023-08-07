import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import React, { useContext } from "react";
import { Message } from "./Context";
import axios from "axios";

export default function ProjectModal() {

  const submitBtn = useRef(null);
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useContext(Message);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const Submit = (data) => {
    setSpinner(true);
    if(!data.description) data.description = undefined;
    axios.post(`${process.env.REACT_APP_URL}/api/idp/v2/project`, data, {
      headers: { Authorization: sessionStorage.getItem('token') },
    })
      .then((res) => {
        toast.success("Successfully sended!");
        setMessage((prev)=>!prev);
        setSpinner(false); setOpen(false); reset();
      })
      .catch((error) => {
        toast.error("An Error occurred!");
        setSpinner(false);
      });
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-4"
      >
        New Project
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start w-full">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-4">
                          New Project
                        </Dialog.Title>
                        <form onSubmit={handleSubmit(Submit)} className="add_form">
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <input disabled={spinner}
                                  className={errors.name ? "error" : {}} placeholder="Name" type="text"
                                  {...register("name", {required: true, pattern: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-\s]+$/i })}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <input disabled={spinner}
                                  className={errors.short_name ? "error" : {}} placeholder="Short name" type="text"
                                  {...register("short_name", {required: true, pattern: /^[A-Z]+$/ })}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <textarea  disabled={spinner} type="text"
                                  className={errors.description ? "error" : {}} placeholder="Search for anything..." 
                                  {...register("description", { pattern: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-\s]+$/i, })}
                                ></textarea>
                                <input ref={submitBtn} className="hidden" type="submit" />
                              </Grid>
                            </Grid>
                          </Box>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button" disabled={spinner} onClick={() => submitBtn.current.click()}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 sm:ml-3 sm:w-auto"
                    >
                    {spinner ? <CircularProgress className="mr-2" size="0.9rem"/> : ""}Save
                    </button>
                    <button type="button" disabled={spinner} onClick={() => setOpen(false)} ref={cancelButtonRef}
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