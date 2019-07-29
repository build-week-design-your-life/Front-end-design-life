import React, {useState} from "react";
import axiosWithAuth from "../security/AxiosWithAuth"

const Login = props => {
    const [credentials, setCredentials] = useState({});
    login = event => {
        event.preventDefaul();
        axiosWithAuth().get("URL", credentials)
        .then(res=>{
            //TAKE THIS OUT AFTER ITS WORKING
            console.log(res)
            localStorage.setItem("token", res.data.token)
            this.props.history.push("/design")
        })
    }
    return <FormikLoginForm />
}

export default Login;