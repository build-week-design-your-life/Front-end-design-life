import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";

function LoginForm() {
  return (
    <Form>
      <h1>Hello, and welcome to the Login form</h1>
      <label>Please enter your username</label>
      <Field name="username" type="text" />
      <label> Please enter your password</label>
      <Field name="password" type="password" />
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

  validationScheme: Yup.object().shape({
    username: Yup.string()
      .required("A Login name is required")
      .min(6, "A username must be at least 6 characters long"),
    password: Yup.string()
      .min(8, "A password must be at leat 8 characters long")
      .required("A password is required to continue")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    axiosWithAuth()
      .post("https://hr-bw3.herokuapp.com/api/auth/login", values)
      .then(res => {
        //TAKE THIS OUT AFTER ITS WORKING
        console.log("axios get res");
        console.log(res);
        localStorage.setItem("token", res.data.token);
        resetForm();
        setSubmitting(false);
        props.history.push("/design");
      })
      .catch(rej => {
        console.log("axios get reject");
        console.log(rej);
        props.history.push("/");
      });
  }

  // login = event => {
  //     event.preventDefaul();
  //     axiosWithAuth()
  //     .get("https://hr-bw3.herokuapp.com/api/auth/login", credentials)
  //     .then(res=>{
  //         //TAKE THIS OUT AFTER ITS WORKING
  //         console.log(res)
  //         localStorage.setItem("token", res.data.token)
  //         props.history.push("/design")
  //     })
  //     .catch(rej => {
  //         console.log(rej)
  //         props.history.push("/")
  //     })
  // }
})(LoginForm);

export default FormikLoginForm;
