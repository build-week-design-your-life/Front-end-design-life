import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";

function ActivityForm(){
  return(
    <Form>
      <h1>Activity Daily Log</h1>
      <label>Journal Content</label>
      <Field name="journal_content" type="text" />
      <label>Activity Title</label>
      <Field name="journal_title" type="text" />
      <label> Daily or Weekly?</label>
      <Field name="journal_type" type="text" />
      <label>Date</label>
      <Field name="journal_date" type="text" />
      <button type="submit">Submit</button>
    </Form>
  )  
}
const FormikActivityForm = withFormik({
  mapPropsToValues({ content, title,
                    type, date }) {
    return {
      journal_content: content || "",
      journal_title: title || "",
      journal_type: type || "",
      journal_date: date || ""
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {
    axiosWithAuth()
    .post("https://hr-bw3.herokuapp.com/api/journals", values)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        resetForm();
        setSubmitting(false);
        props.history.push("/design")
      })
      .catch(rej => {
        console.log(rej);
        props.history.push("/")
      });
  }

})(ActivityForm);

export default FormikActivityForm;
