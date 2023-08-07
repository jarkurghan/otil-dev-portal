import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { Grid } from "@mui/material";
import Spinner from "react-spinner-material";
import axios from "axios";

export default function TransitionsModal({ id }) {
  const [data, setData] = useState();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const [wait, setWait] = React.useState(true);

  const getData = async () => {
    setWait(true);
    await axios
      .get(`${process.env.REACT_APP_URL}/api/idp/v2/project/${id}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data.data);
        setWait(false);
      })
      .catch((err) => {
        toast.error("An error occurred");
        setWait(false);
        console.log(err.message);
      });
  };

  const shortRegex = /^[A-Z]{1,}$/;
  const addressRegEx = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-\s]+$/i;

  const validateProject = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(addressRegEx, { message: "Enter valid name" }),
    short_name: Yup.string()
      .matches(shortRegex, { message: "Enter valid short name" })
      .required("Short name is required"),
    description: Yup.string()
      .required("Description is required")
      .matches(addressRegEx, { message: "Enter valid description" }),
  });

  const onUpdate = async (values) => {
    delete values.created_by;
    delete values.created_date;
    delete values.isAdmin;
    delete values.status;
    setLoading(true);
    await axios
      .put(`${process.env.REACT_APP_URL}/api/idp/v2/project`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false);
        // setMessage(true);
        setDisabled(!disabled);
        toast.success("Project updated successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("An error occurred");
      });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="addcompany">
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="div"
        className="marginBottom"
      >
        Update project information
      </Typography>
      {wait ? (
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
        <Formik
          initialValues={data}
          validationSchema={validateProject}
          onSubmit={async (values) => {
            onUpdate(values);
            return new Promise((res) => setTimeout(res, 500));
          }}
        >
          {({ values, errors }) => (
            <Form autoComplete="off" className="mt-4">
              <Grid container spacing={4}>
                <Grid item xs={12} className="marginBottom">
                  <Field
                    size="small"
                    fullWidth
                    label="Name"
                    name="name"
                    disabled={disabled ? true : false}
                    component={TextField}
                    autoComplete="name"
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className="marginBottom">
                <Field
                  size="small"
                  fullWidth
                  name="short_name"
                  disabled={disabled ? true : false}
                  label="Short name"
                  autoComplete="short_name"
                  component={TextField}
                />
              </Grid>
              <Grid item xs={12} className="marginBottom">
                <Field
                  fullWidth
                  label="Description"
                  name="description"
                  disabled={disabled ? true : false}
                  component={TextField}
                  type="text"
                />
              </Grid>
              <div className="left_right">
                <Button
                  onClick={() => setDisabled(!disabled)}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="primary"
                  size="small"
                >
                  Edit
                </Button>
                {loading ? (
                  <LoadingButton
                    size="small"
                    loading
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="success"
                  >
                    Submit
                  </LoadingButton>
                ) : (
                  <Button
                    size="small"
                    type="submit"
                    className="mt-5"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={disabled ? true : false}
                    color="success"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
