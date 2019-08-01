import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";

function RegistrationForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <h1>Hello, you must be new here - welcome to the Registration form</h1>
      <label>Please enter your username</label>
      <Field name="username" type="text" />
      {touched.username && errors.username && <p>Sorry! {errors.username}</p>}
      <label> Please enter your password</label>
      <Field name="password" type="password" />
      {touched.password && errors.password && <p>Sorry! {errors.password}</p>}
      <button type="submit">Submit</button>
    </Form>
  );
}

const FormikRegistrationForm = withFormik({
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

  handleSubmit(values, { resetForm, setErrors, props }) {
    axiosWithAuth()
      .post("https://hr-bw3.herokuapp.com/api/auth/register", values)
      .then(res => {
        // console.log("axios post res");
        // console.log(res);
        props.history.push("/login");
        resetForm();
      })
      .catch(reject => {
        // TAKE THIS OUT AFTER ITS WORKING - SECURITY RISK
        //  console.log("axios post rejection");
        //  console.log(reject);
      });
  }
})(RegistrationForm);

export default FormikRegistrationForm;
