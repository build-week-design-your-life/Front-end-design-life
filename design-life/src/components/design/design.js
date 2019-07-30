import React, { useState, useEffect } from "react";
import axiosWithAuth from "../security/AxiosWithAuth";

function Design() {
  const [userID, setUserID] = useState();

  useEffect(() => {
    setUserID(localStorage.getItem("userID"));
    console.log("setting user ID from local storage");
    console.log(userID);
  }, [userID]);

  useEffect(() => {
    axiosWithAuth()
      .get(`https://hr-bw3.herokuapp.com/api/journals/weekly/${userID}`)
      .then(res => {
        console.log("GET successful");
        console.log(res);
      })
      .catch(rej => {
        console.log("GET rejected");
        console.log(rej);
      });
  }, []);

  return (
    <h1>
      {/* {console.log(userData)} */}
      Congratulations! If you're seeing this, then the login, private route, and
      localstorage token setting are working!
    </h1>
  );
}

export default Design;
