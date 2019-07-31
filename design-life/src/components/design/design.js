import React, { useState, useEffect } from "react";
import axiosWithAuth from "../security/AxiosWithAuth";
import NewPostFormikForm from "./newPostForm";

function Design() {
  const [userJournalEntries, setJournalEntries] = useState();
  const [updatedJournal, setUpdatedJournal] = useState();

  useEffect(() => {
    axiosWithAuth()
      .get(`https://hr-bw3.herokuapp.com/api/journals/mine`)
      .then(res => {
        console.log(res.data);
        setJournalEntries(res.data);
      })
      .catch(rej => {
        console.log("GET rejected");
        console.log(rej);
      });
  }, [updatedJournal]);

const deletePost = (id) => {
  axiosWithAuth()
    .delete(`https://hr-bw3.herokuapp.com/api/journals/${id}`)
    .then(res=>{
      console.log("delete request res", res)
      setUpdatedJournal(res.data.message)
      setUpdatedJournal("")
    })
}

  // updatedJournal hook is sent to newPostForm, is set by the axios POST when it fires,
  //  useEffect just listens to it so it will re-render the page on each POST request

  return (
    <>
      {console.log("userjournal entries", userJournalEntries)}

      <h2>Hello! Your daily and weekly posts are below</h2>
      {/* This ternary checks if the axios GET request has resolved;
      if not, Loading Please wait, if so, continue to second ternary */}
      {userJournalEntries ? (
        userJournalEntries.map(entry => (
          <>
          {console.log(entry)}
            {/* This internal ternary checks if the journal type is a 
            weekly or daily entry, so they can be flexboxed into
            separate parts of the users screen */}
            {entry.journal_type === "weekly" ? (
              <div className="diaryEntry">
                <h2>Weekly entries</h2>
                <h4>Journal type: {entry.journal_type}</h4>
                <h4>Journal Title: {entry.journal_title}</h4>
                <h4>Journal Content: {entry.journal_content}</h4>
                {console.log(entry.id)}
                <button onClick={()=>deletePost(entry.id)}>Delete</button>
              </div>
            ) : (
              <div className="diaryEntry">
                <h2>Daily entries</h2>
                <h4>Journal type: {entry.journal_type}</h4>
                <h4>Journal Title: {entry.journal_title}</h4>
                <h4>Journal Content: {entry.journal_content}</h4>
                {console.log(entry.id)}
                <button onClick={()=>deletePost(entry.id)}>Delete</button>
              </div>
            )}
          </>
        ))
      ) : (
        <h1> Loading, Please wait...</h1>
      )}
      <NewPostFormikForm setUpdatedJournal={setUpdatedJournal} />
    </>
  );
}

export default Design;
