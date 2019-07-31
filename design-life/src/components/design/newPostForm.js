import React, { useState, useEffect } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from "../security/AxiosWithAuth";

function NewPost(props) {
//   console.log("what NewPost function sees as props", props);
//   const [newUser, setNewUser] = useState();
//   useEffect(() => {
//     setNewUser(props);
//   }, [newUser]);
//   console.log("new user", newUser);

  return (
    <Form>
      <h1>What are your thoughts for today?</h1>
      <label>Title</label>

      <Field name="journal_title" type="text" className="journalTitle" />
      <label>Dear Diary, </label>
      <Field name="journal_content" type="text" className="journalContent" />
      <label>Is this a daily or weekly diary entry? </label>
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

  handleSubmit(values, { resetForm, props }) {
    console.log("props being handed to axios");
    console.log(props);
    axiosWithAuth()
      .post("https://hr-bw3.herokuapp.com/api/journals/add", values)
      .then(res => {
        console.log("user POST res");
        console.log(res);
        {/*Fairly ingenius, if I do say so myself.  This just listens for the servers
        response, "Good Work", then updates a hook in the Design file that the axios.get useEffect
        is listening to.  The second setUpdatedJournal clears it out so it can listen for a second
        post from the user */}
        props.setUpdatedJournal(res.data.message)
        props.setUpdatedJournal("")
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
