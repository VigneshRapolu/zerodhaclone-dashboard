import { SpaRounded } from "@mui/icons-material";
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios";
import allStore from "./hooks/hooks";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Menu(){
    const {user,makeUser}=allStore();
    const navigate=useNavigate();
    const [selectedMenu,setSelectedMenu]=useState(0);
    const [isProfileDropdown,setIsProfileDropdown]=useState(false);
    const Menuclass="menu selected";
    const activeMenu="menu";
    
    
    function handleLogout(){
        axios.post(`${BACKEND_URL}/logout`,{},{withCredentials:true}).then( async (data)=>{
            await makeUser(false);
            localStorage.removeItem("token");
            navigate("/signin");
        }).catch((err)=>{
          
            navigate("/");
            
        })
    }
    const handleMenuClick=(index)=>{
        setSelectedMenu(index);
    }
    const handleProfileClick=()=>{
        
        setIsProfileDropdown(!isProfileDropdown);
    }
    if(isProfileDropdown){

    }
    return (
        <div className="menu-container">
            <img src="logo.png" alt="" style={{width:"30px",height:"30px"}} />
            <div className="menus">
                <ul>
                    <li className="ms-3 ">
                        <Link className={selectedMenu===0?Menuclass:activeMenu} style={{textDecoration:"none"}}   to="/" onClick={()=>handleMenuClick(0)}>Dashboard</Link>
                    </li>
                    <li className="ms-3 ">
                        <Link className={selectedMenu===1?Menuclass:activeMenu} style={{textDecoration:"none"}} to="/orders" onClick={()=>handleMenuClick(1)} >Orders</Link>
                      
                    </li>
                    <li className="ms-3 ">
                        <Link className={selectedMenu===2?Menuclass:activeMenu} style={{textDecoration:"none"}} to="/holdings" onClick={()=>handleMenuClick(2)}>Holdings</Link>
                        
                    </li >
                   
                    <li className="ms-3 ">
                        <Link className={selectedMenu===4?Menuclass:activeMenu} style={{textDecoration:"none"}} to="/funds" onClick={()=>handleMenuClick(4)}>Funds</Link>
                        
                    </li>
                    
                </ul>
               <div className="vr  ms-3 me-3" style={{height:'40px'}}></div>
                <div className="user">
                    <div className="profile me-2 p-1" onClick={()=>handleProfileClick()}>U</div>
                     {isProfileDropdown && (
        <div className="profileView">
            {!user?<span>
                <Link to="/signin"><button className="profilebtn mb-1">Sign in</button></Link><Link to="/signup"><button className="profilebtn">Signup</button></Link>
            </span>:<button onClick={handleLogout} className="profilebtn">Signout</button>}
          
        </div>
      )}
                    
                </div>
                
            </div>
            
            

        </div>
    )
}
export default Menu;