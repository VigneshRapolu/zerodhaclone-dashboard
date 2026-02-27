import { useState } from "react"
import { useNavigate,Link } from "react-router-dom";
import allStore from "./hooks/hooks";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Login(){
    let [email,setEmail]=useState("");
    let [pwd,setPwd]=useState("");
    const navigate=useNavigate();
    const {makeUser}=allStore();
    async function handleSubmit(e){
        e.preventDefault();
        
        
        console.log("submitted cred");
        
      axios.post(`${BACKEND_URL}/login`,{
            email:email,
            password:pwd
        }).then(async (res)=>{
        //    console.log(res);
           
            if(res.data.success){
                
                
                await makeUser(true);

                localStorage.setItem("token", res.data.token);
                console.log('success login');
                navigate("/");
            }else{

                navigate("/signin");
            }
            

            
        }).catch((err)=>{
            navigate("/signin");
            // console.log(err);
            
        }
        )
        
    }
    function handleEmail(e){
       setEmail(e.target.value);
    }
    function handlePwd(e){
       setPwd(e.target.value);
    }
    return(
    <div className="loginContainer">
        <form onSubmit={handleSubmit} className="loginForm">

            <h2>Welcome Back</h2>
            <p className="subtitle">Login to your dashboard</p>

            <label>Email</label>
           <input type="text" placeholder="enter email" onChange={(e)=>handleEmail(e)} value={email} required/>

            <label>Password</label>
            <input type="password" placeholder="enter password" onChange={(e)=>handlePwd(e)} value={pwd} required/>

            <button className="loginBtn">Login</button>
            <p className="signupText">
    Don’t have an account? 
    <Link to="/signup" className="signupLink"> Sign up</Link>
</p>
        </form>
    </div>
)
}
export default Login;