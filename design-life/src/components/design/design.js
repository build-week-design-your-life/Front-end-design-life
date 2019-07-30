import React, { useState, useEffect } from "react";
import axiosWithAuth from "../security/AxiosWithAuth";
import NewPostFormikForm from "./newPostForm";

function Design() {
  const [userID, setUserID] = useState();

  useEffect(() => {
    setUserID(localStorage.getItem("userID"));
    // console.log("setting user ID from local storage");
    // console.log(userID);
  }, [userID]);

  useEffect(() => {
    axiosWithAuth()
      .get(`https://hr-bw3.herokuapp.com/api/journals/weekly/${userID}`)
      .then(res => {
        // console.log("GET successful");
        // console.log(res);
      })
      .catch(rej => {
        // console.log("GET rejected");
        // console.log(rej);
      });
  }, [userID]);

  return (
    <>
      <h2>Hello! Your daily and weekly posts are below</h2>
      <NewPostFormikForm userID={userID} />
    </>
  );
}

export default Design;
