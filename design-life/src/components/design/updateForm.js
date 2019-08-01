import React, { useState, useEffect } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";

function UpdatePost(...props) {
  // console.log("props from updated form", props)
  // console.log("props.updatedForm", props[0].updatedEntry)
  return (
    <Form className="styleForms">
      <h1>What do you want to replace?</h1>
      <label>What did you do today?</label>
      <Field
        name="journal_content"
        type="text"
        placeholder={props[0].updatedEntry.journal_content}
        className="journalContent"
      />
      <label>How excited were you?</label>
      <Field
        name="journal_title"
        type="text"
        placeholder={props[0].updatedEntry.journal_title}
        className="journalTitle"
      />
      <label>Is this a daily or weekly diary entry? </label>
      <Field
        component="select"
        name="journal_type"
        placeholder={props[0].updatedEntry.journal_type}
        className="typeSelection"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </Field>
      <button className="editButton" type="submit">Submit</button>
    </Form>
  );
}

const UpdateFormikForm = withFormik({
  mapPropsToValues({ journal_content, journal_title, journal_type, ...props }) {
    // console.log("What formik sees as props")
    // console.log(props)
    // console.log("props.updatedEntry form Formik", props.updatedEntry)
    return {
      id: props.updatedEntry.id,
      journal_content: journal_content || "",
      journal_title: journal_title || "",
      journal_type: journal_type || "daily"
    };
  },

  handleSubmit(values, { resetForm, props }) {
    // console.log("values being handed to axios");
    // console.log(values);
    // console.log("values.id Formik submit sees", values.id)
    axiosWithAuth()
      .put(`https://hr-bw3.herokuapp.com/api/journals/${values.id}`, values)
      .then(res => {
        // console.log("user PUT res");
        // console.log(res);
        {
          /*Fairly ingenius, if I do say so myself.  Since the backend server isn't sending back a new
          array of the data, I needed another method to re-render the screen.  This just listens for the server's
        response, "OK", then updates a hook in the Design file that the axios.get useEffect
        is listening to.  The second props.setUpdatedJournal clears it out so it can listen for a second
        post from the user */
        }
        props.setUpdatedJournal(res.data.statusText);
        props.setUpdatedJournal("");
        resetForm();
        props.toggleReplaceForm();
      })
      .catch(reject => {
        // CONSOLE LOG THIS OUT AFTER ITS WORKING - SECURITY RISK
        // console.log("values being rejected by axios");
        // console.log(values);
        // console.log("axios post rejection");
        // console.log(reject);
      });
  }
})(UpdatePost);

export default UpdateFormikForm;
