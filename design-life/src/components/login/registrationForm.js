import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";

function RegistrationForm() {
  return (
    <Form>
      <h1>Hello, and welcome to the registration form</h1>
      <label>Please enter your username</label>
      <Field name="username" type="text" />
      <label> Please enter your password</label>
      <Field name="password" type="password" />
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

  // Not working, probably just a typo or Yup vs yup issue.  Play with later once login working

//   validationSchema: Yup.object.shape({
//     name: Yup.string()
//       .required("A Login name is required")
//       .min(6, "A username must be at least 6 characters long"),
//     password: Yup.string()
//       .min(8, "A password must be at leat 8 characters long")
//       .required("A password is required to continue")
//   }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    axiosWithAuth()
      .post("https://hr-bw3.herokuapp.com/api/auth/register", values)
      //  I think user needs to register, then login, instead of registering and being pushed to the secret pages?
      .then(res => {
        // TAKE THIS OUT AFTER ITS WORKING
        console.log("axios post res")
        console.log(res);
        //localStorage.setItem("token", res.data.token);
        props.history.push("/login");
        resetForm();
        setSubmitting(false);
      })
      .catch(reject => {
        // TAKE THIS OUT AFTER ITS WORKING - SECURITY RISK
        console.log("axios post rejection")
        console.log(reject)
      });
  }
})(RegistrationForm);

export default FormikRegistrationForm;
