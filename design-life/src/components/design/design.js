import React, { useState, useEffect } from "react";
import axiosWithAuth from "../security/AxiosWithAuth";
import NewPostFormikForm from "./newPostForm";
import UpdateFormikForm from "./updateForm";

function Design() {
  const [userJournalEntries, setJournalEntries] = useState();
  const [updatedJournal, setUpdatedJournal] = useState();
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [updatedEntry, setUpdatedEntry] = useState();

  const toggleReplaceForm = () => {
    setToggleUpdate(!toggleUpdate);
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`https://hr-bw3.herokuapp.com/api/journals/mine`)
      .then(res => {
        //console.log(res.data);
        setJournalEntries(res.data);
      })
      .catch(rej => {
        // console.log("GET rejected");
        // console.log(rej);
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
      <h2>Hello! Your daily and weekly posts are below</h2>

      {/* I know for best practices I should split this off into different components - pass
      userJournalEntries into a component, map over it, then send the mapped array to weekly vs daily components,
      but I'm just so proud of this ternary I wrote.  A ternary with a mapping function, with another ternary inside it!
      Its the coolest batch of code I've ever written */}

      {/* This ternary checks if the axios GET request has resolved;
      if not, Loading Please wait, if so, continue to second ternary */}

      <div className="allEntries">
        {userJournalEntries ? (
          userJournalEntries.map(entry => (
            <div className="diaryEntries">
              {/* This internal ternary checks if the journal type is a 
            weekly or daily entry, so they can be flexboxed into
            separate parts of the users screen */}
              {entry.journal_type === "weekly" ? (
                <div className="weeklyEntry">
                  <h2>Weekly Reflection Log</h2>
                  <h4>Date of Entry: {entry.journal_date}</h4>
                  <h4>My reflection on my week: {entry.journal_content}</h4>
                  <h4>How I felt: {entry.journal_title}</h4>

                  <div className="buttonStyle">
                    <button onClick={() => deletePost(entry.id)}>Delete</button>
                    <button
                      onClick={() => {
                        toggleReplaceForm();
                        setUpdatedEntry(entry);
                      }}
                    >
                      Edit Post?
                    </button>
                  </div>
                </div>
              ) : (
                <div className="dailyEntry">
                  <h2>Daily Activity Log</h2>
                  <h4>Date of Entry: {entry.journal_date}</h4>
                  <h4>My daily activity: {entry.journal_content}</h4>
                  <h4>How I felt: {entry.journal_title}</h4>

                  <div className="buttonStyle">
                    <button onClick={() => deletePost(entry.id)}>Delete</button>
                    <button
                      onClick={() => {
                        toggleReplaceForm();
                        setUpdatedEntry(entry);
                      }}
                    >
                      Edit Post?
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1> Loading, Please wait...</h1>
        )}
      </div>
      <div className="formStyles">
        
        {toggleUpdate ? (
          <UpdateFormikForm
            toggleReplaceForm={toggleReplaceForm}
            setUpdatedJournal={setUpdatedJournal}
            updatedEntry={updatedEntry}
          />
        ) : <NewPostFormikForm setUpdatedJournal={setUpdatedJournal} />}
      </div>
    </>
  );
}

export default Design;
