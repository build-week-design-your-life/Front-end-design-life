import React, { useState, useEffect } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";
import moment from "moment";

function NewPost() {
  return (
    <Form className="styleForms">
      <h1>What are your thoughts for today?</h1>
      <label>What did you do today?</label>
      <Field name="journal_content" type="text" className="journalContent" />
      <label>How excited were you?</label>
      <Field name="journal_title" type="text" className="journalTitle" />
      <label>Is this a daily activity log or a weekly reflection? </label>
      <Field component="select" name="journal_type" className="typeSelection">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </Field>
      <button type="submit">Submit</button>
    </Form>
  );
}

const NewPostFormikForm = withFormik({
  mapPropsToValues({ journal_content, journal_title, journal_type, userID }) {
    //   console.log("What formik sees as props")
    //   console.log(props)
    return {
      journal_content: journal_content || "",
      journal_title: journal_title || "",
      journal_type: journal_type || "daily",
      journal_date: moment().format("MMMM Do YYYY, h:mm:ss a")
    };
  },

  handleSubmit(values, { resetForm, props }) {
    // console.log("props being handed to axios");
    // console.log(props);
    axiosWithAuth()
      .post("https://hr-bw3.herokuapp.com/api/journals/add", values)
      .then(res => {
        // console.log("user POST res");
        // console.log(res);
        {
          /*Fairly ingenius, if I do say so myself.  Since the backend server isn't sending back a new
          array of the data, I needed another method to re-render the screen.  This just listens for the server's
        response, "Good Work", then updates a hook in the Design file that the axios.get useEffect
        is listening to.  The second props.setUpdatedJournal clears it out so it can listen for a second
        post from the user */
        }
        props.setUpdatedJournal(res.data.message);
        props.setUpdatedJournal("");
        resetForm();
      })
      .catch(reject => {
        // CONSOLE LOG THIS OUT AFTER ITS WORKING - SECURITY RISK
        // console.log("values being rejected by axios");
        // console.log(values);
        // console.log("axios post rejection");
        // console.log(reject);
      });
  }
})(NewPost);

export default NewPostFormikForm;
