/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { ToastContainer, toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
    const [loading, setLoading] = useState(false);
    const validateSignIn = Yup.object({
        user_id: Yup.string()
            .matches(/^[a-z]{2}[0-9]{4}$/, { message: "User ID is invalid" })
            .required("User ID is required"),
        password: Yup.string().min(8, "Password must be at least 8 charaters").required("Password is required"),
    });

    const [visibleIcon, setVisibleIcon] = React.useState(true);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_URL}/otil/v1/api/user/login`, {
                user_id: event.user_id,
                password: event.password,
            })
            .then((res) => {
                for (let i = 0; i < res.data.actions.length; i++) {
                    const element = res.data.actions[i];
                    sessionStorage.setItem(`${element}`, element);
                }
                sessionStorage.setItem("token", res.data?.token);
                sessionStorage.setItem("user_id", event.user_id);
                setLoading(false);
                // window.location = "/";
                navigate("/");
            })
            .catch((err) => {
                setLoading(false);
                toast.error("Login failed");
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs" className="py-5">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    <Formik
                        initialValues={{ user_id: "", password: "" }}
                        validationSchema={validateSignIn}
                        onSubmit={async (values) => {
                            handleSubmit(values);
                            return new Promise((res) => setTimeout(res, 500));
                        }}
                    >
                        {({ values, errors }) => (
                            <Form autoComplete="off" className="mt-4">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field fullWidth name="user_id" label="User ID" autoComplete="user_id" component={TextField} type="text" />
                                    </Grid>

                                    <Grid item xs={12} className="input_div">
                                        <Field
                                            fullWidth
                                            label="Password"
                                            name="password"
                                            component={TextField}
                                            autoComplete="password"
                                            type={visibleIcon ? "password" : "text"}
                                        />
                                        {visibleIcon ? (
                                            <VisibilityOffIcon onClick={() => setVisibleIcon((prev) => !prev)} />
                                        ) : (
                                            <RemoveRedEyeIcon onClick={() => setVisibleIcon((prev) => !prev)} />
                                        )}
                                    </Grid>
                                </Grid>
                                {loading ? (
                                    <LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />} variant="contained" sx={{ mt: 2, mb: 2 }} fullWidth>
                                        Login
                                    </LoadingButton>
                                ) : (
                                    <Button type="submit" fullWidth className="mt-4" variant="contained" sx={{ mt: 2, mb: 2 }}>
                                        Login
                                    </Button>
                                )}
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
