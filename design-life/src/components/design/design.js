import React, { useState, useEffect } from "react";
import axiosWithAuth from "../security/AxiosWithAuth";
import NewPostFormikForm from "./newPostForm";

function Design() {
  const [userID, setUserID] = useState();
  const [userJournalEntries, setJournalEntries] = useState();

  // useEffect(() => {
  //   setUserID(localStorage.getItem("userID"));
  //   // console.log("setting user ID from local storage");
  //   // console.log(userID);
  // }, [userID]);

  useEffect(() => {
    axiosWithAuth()
      .get(`https://hr-bw3.herokuapp.com/api/journals/weekly/1`)
      //`https://hr-bw3.herokuapp.com/api/journals/weekly/${userID}`
      .then(res => {
        setJournalEntries(res.data);
      })
      .catch(rej => {
        console.log("GET rejected");
        console.log(rej);
      });
  }, []);

  return (
    <>
      {console.log("userjournal entries", userJournalEntries)}

      <h2>Hello! Your daily and weekly posts are below</h2>

      {userJournalEntries ? (
        userJournalEntries.map(entry => (
          <>
            {console.log("entries", entry)}
            {/* FLEX BOX H2 INTO RIGHT/LEFT */}
            {entry.journal_type === "weekly" ? (
              <div className = "diaryEntry">
                <h2>Weekly entries</h2>
                <h4>Journal type: {entry.journal_type}</h4>
                <h4>Journal Title: {entry.journal_title}</h4>
                <h4>Journal Content: {entry.journal_content}</h4>
              </div>
            ) : (
              <div className = "diaryEntry">
                <h2>Daily entries</h2>
                <h4>Journal type: {entry.journal_type}</h4>
                <h4>Journal Title: {entry.journal_title}</h4>
                <h4>Journal Content: {entry.journal_content}</h4>
              </div>
            )}
          </>
        ))
      ) : (
        <h1> Please wait...</h1>
      )}
      <NewPostFormikForm userID={userID} />
    </>
  );
}

export default Design;
