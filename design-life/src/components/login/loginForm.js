import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";

function LoginForm() {
  return (
    <Form>
      <h1>Hello, and welcome to the registration form</h1>
      <label>Please enter your username</label>
      <Field name="name" type="text" />
      <label> Please enter your password</label>
      <Field name="password" type="password" />
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, password }) {
    return {
      name: name || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object.shape({
    name: Yup.string()
      //.name("Name not valid")
      .required("A Login name is required")
      .min(6, "A username must be at least 6 characters long"),
    password: Yup.string()
      //.password("Password not valid, must be a string")
      .min(8, "A password must be at leat 8 characters long")
      .required("A password is required to continue")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    axiosWithAuth()
      .post("URL", values)
      .then(res => {
        // TAKE THIS OUT AFTER ITS WORKING
        console.log(res);
        localStorage.setItem("token", res.data.token);
        props.history.push("/design");
        resetForm();
        setSubmitting(false);
      })
      .catch(reject => {
        //console.log(reject)
      });
  }
})(LoginForm);

export default FormikLoginForm;
