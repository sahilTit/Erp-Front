import axios from "axios";
import { toast } from "react-toastify";

const LogInApi = async(props) =>{
    const userName = props.userName;
    const password = props.password;
    try {
        const result = await axios.post('/loginuser',{
            userName,
            password
        },{withCredentials: true});
        
        if(result.status){
            window.sessionStorage.setItem("user",JSON.stringify(result));
            toast.success(`Welcome! ${userName}`);
            return "true";
        }
       } catch (error) {
            toast.error('Invalid Email or Password')
       }
}

export default LogInApi;