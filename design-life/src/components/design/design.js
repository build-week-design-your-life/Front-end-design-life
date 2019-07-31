import React, { useState, useEffect } from "react";
import axiosWithAuth from "../security/AxiosWithAuth";
import NewPostFormikForm from "./newPostForm";
import UpdateFormikForm from "./updateForm"

function Design() {
  const [userJournalEntries, setJournalEntries] = useState();
  const [updatedJournal, setUpdatedJournal] = useState();
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [updatedEntry, setUpdatedEntry] = useState();

const toggleReplaceForm = (entry) => {
  setToggleUpdate(!toggleUpdate);
  // fires too fast, before the data has been set to entry
 setUpdatedEntry(entry)
  console.log("data entry from button in function", entry)
  console.log("updatedENtry before sent to form", updatedEntry)
}

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

  const deletePost = id => {
    axiosWithAuth()
      .delete(`https://hr-bw3.herokuapp.com/api/journals/${id}`)
      .then(res => {
        // First setUpdatedJournal triggers axios.get to re-render the page
        // Second resets it so user can delete more than one without having to
        // hit F5
        setUpdatedJournal(res.data.message);
        setUpdatedJournal("");
      });
  };

  return (
    <>
      {console.log("userjournal entries", userJournalEntries)}

      <h2>Hello! Your daily and weekly posts are below</h2>
      {/* This ternary checks if the axios GET request has resolved;
      if not, Loading Please wait, if so, continue to second ternary */}
      <div className="allEntries">
        {userJournalEntries ? (
          userJournalEntries.map(entry => (
            <div className="diaryEntries">
              {console.log("mapped entries", entry)}
              {/* This internal ternary checks if the journal type is a 
            weekly or daily entry, so they can be flexboxed into
            separate parts of the users screen */}
              {entry.journal_type === "weekly" ? (
                <div className="weeklyEntry">
                  <h2>Weekly entries</h2>
                  <h4>Journal type: {entry.journal_type}</h4>
                  <h4>Journal Title: {entry.journal_title}</h4>
                  <h4>Journal Content: {entry.journal_content}</h4>
                  {console.log(entry.id)}
                  <button onClick={() => deletePost(entry.id)}>Delete</button>
                  <button onClick={() => toggleReplaceForm(entry)}>Update this post?</button>
                </div>
              ) : (
                <div className="dailyEntry">
                  <h2>Daily entries</h2>
                  <h4>Journal type: {entry.journal_type}</h4>
                  <h4>Journal Title: {entry.journal_title}</h4>
                  <h4>Journal Content: {entry.journal_content}</h4>
                  {console.log(entry.id)}
                  <button onClick={() => deletePost(entry.id)}>Delete</button>
                  <button onClick={() => toggleReplaceForm(entry)}>Update this post?</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1> Loading, Please wait...</h1>
        )}
      </div>
      <NewPostFormikForm setUpdatedJournal={setUpdatedJournal} />
      {toggleUpdate ? <UpdateFormikForm updatedEntry={updatedEntry} /> : null}
    </>
  );
}

export default Design;
