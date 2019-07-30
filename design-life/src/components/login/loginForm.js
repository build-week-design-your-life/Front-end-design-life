import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";

function LoginForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <h1>
        Hello, looks like we've seen you before - welcome to the Login form
      </h1>
      <label>Please enter your username</label>
      <Field name="username" type="text" />
      {touched.username && errors.username && <p>You must forgotten something. {errors.username}</p>}
      <label> Please enter your password</label>
      <Field name="password" type="password" />
      {touched.password && errors.password && <p>You must forgotten something. {errors.password}</p>}
      <button type="submit">Submit</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("A Login name is required")
      .min(6, "A username must be at least 6 characters long"),
    password: Yup.string()
      .min(8, "A password must be at leat 8 characters long")
      .required("A password is required to continue")
  }),

  // I'd like to collapse these 2 Formik forms into one, but the token isn't set on the backend
  // until the user logs in, so there's nothing to check if the user is new or not until
  // they've already logged in

  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    axiosWithAuth()
      .post("https://hr-bw3.herokuapp.com/api/auth/login", values)
      .then(res => {
        //TAKE THIS OUT AFTER ITS WORKING
        //console.log("axios get res");
        //console.log(res);
        localStorage.setItem("token", res.data.token);
        resetForm();
        setSubmitting(false);
        props.history.push("/design");
      })
      .catch(rej => {
        //console.log("axios get reject");
        //console.log(rej);
        //props.history.push("/");
      });
  }
})(LoginForm);

export default FormikLoginForm;
