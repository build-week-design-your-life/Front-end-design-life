// import React, {useState} from "react";
// import axiosWithAuth from "../security/AxiosWithAuth"
// import FormikLoginForm from "./registrationForm"

// // In testing - login form that assumes token is already set on local storage


// const Login = props => {
//     const [credentials, setCredentials] = useState({});
//     login = event => {
//         event.preventDefaul();
//         axiosWithAuth()
//         .get("URL", credentials)
//         .then(res=>{
//             //TAKE THIS OUT AFTER ITS WORKING
//             console.log(res)
//             localStorage.setItem("token", res.data.token)
//             props.history.push("/design")
//         })
//         .catch(rej => {
//             console.log(rej)
//             props.history.push("/")
//         })
//     }
//     return <FormikLoginForm />
// }

// const login = () => {
//     axiosWithAuth()
//         .post("URL", userCredentials)
//         .then(res=>{
//             localStorage.setItem("token", res.data.token)
//             props.history.push("/design")
//         })
// }

// export default Login