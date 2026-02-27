import { useState } from "react"
import { useNavigate,Link } from "react-router-dom";
import allStore from "./hooks/hooks";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Signup(){
    let [email,setEmail]=useState("");
    let [pwd,setPwd]=useState("");
    const {makeUser}=allStore();
     let [name,setName]=useState("");
    const navigate=useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        
        
        
        
      axios.post(`${BACKEND_URL}/signup`,{
            email:email,
            password:pwd,
            username:name
        }).then(async (res)=>{
          
           
            if(res.data.success){
                localStorage.setItem("token", res.data.token);
               await makeUser(true);
                navigate("/");
            }else{

                navigate("/signup");
            }
            

            
        }).catch((err)=>{
            navigate("/signup");
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
    function handleName(e){
       setName(e.target.value);
    }
    return(
    <div className="loginContainer">
        <form onSubmit={handleSubmit} className="loginForm">

            <h2>Welcome!</h2>
            <p className="subtitle">Create Account Now!</p>
            <label>Name</label>
            <input type="text" placeholder="enter name" onChange={(e)=>handleName(e)} value={name} required/>
            <label>Email</label>
           <input type="text" placeholder="enter email" onChange={(e)=>handleEmail(e)} value={email} required/>

            <label>Password</label>
            <input type="password" placeholder="enter password" onChange={(e)=>handlePwd(e)} value={pwd} required/>
            
            <button className="loginBtn">Sign Up</button>
            <p className="signupText">
    Already have an account? 
    <Link to="/signin" className="signupLink"> Sign In</Link>
</p>
        </form>
    </div>
)
}
export default Signup;