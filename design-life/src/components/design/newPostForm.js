import React, { useState, useEffect } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";

function NewPost({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
      <h1>What are your thoughts for today?</h1>
      <label>Title</label>

      <Field name="journal_title" type="text" className="journalTitle" />
      <label>Dear Diary, </label>
      <Field name="journal_content" type="text" className = "journalContent" />
      <Field component="select" name="journal_type">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </Field>
      <button type="submit">Submit</button>
    </Form>
  );
}

const NewPostFormikForm = withFormik({
  mapPropsToValues({ journal_content, journal_title, journal_type, userID }) {
    console.log("What Formik sees as userID");
    console.log(typeof userID);
    console.log("journal title");
    console.log(journal_title);
    userID = Number(userID)
    console.log("after conversion to number")
    console.log(typeof userID)
    console.log("after typeof conversion")
    console.log(userID)
    return {
      user_id: userID,
      journal_content: journal_content || "",
      journal_title: journal_title || "",
      journal_type: journal_type || "daily",
      journal_date: Date.now()
    };
  },

  // validationSchema: Yup.object().shape({
  //   username: Yup.string()
  //     .required("A Login name is required")
  //     .min(6, "A username must be at least 6 characters long"),
  //   password: Yup.string()
  //     .min(8, "A password must be at leat 8 characters long")
  //     .required("A password is required to continue")
  // }),

  handleSubmit(values, { resetForm }) {
    console.log("values being handed to axios");
    console.log(values);
    axiosWithAuth()
      .post("https://hr-bw3.herokuapp.com/api/journals/add", values)
      .then(res => {
        console.log("user POST res");
        console.log(res);
        //props.history.push("/design");
        resetForm();
      })
      .catch(reject => {
        // TAKE THIS OUT AFTER ITS WORKING - SECURITY RISK
        console.log("values being rejected by axios");
        console.log(values);
        console.log("axios post rejection");
        console.log(reject);
      });
  }
})(NewPost);

export default NewPostFormikForm;
