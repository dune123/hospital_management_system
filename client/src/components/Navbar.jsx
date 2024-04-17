import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Context} from "../main"
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(null);
  const {isAuthenticated,setIsAuthenticated}=useContext(Context)

  const handlelogout=async()=>{
    await axios.get("http://localhost:4000/api/v1/user/patient/logout",{
        withCredentials:true
    })
    .then((res)=>{
        toast.success(res.data.message);
        setIsAuthenticated(false);
    })
    .catch((err)=>{
        toast.error(err.response.data.message)
    })
  }

  const navigate=useNavigate()

  const handlelogin=async()=>{
    navigate("/login")
  }
  
  return (
    <nav className={"container"}>
      <div className="logo">ZeeCare</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
      <div className="links">
        <Link to={"/"}>HOME</Link>
        <Link to={"/appointment"}>APPOINTMENT</Link>
        <Link to={"about"}>ABOUT US</Link>
      </div>
      {
        isAuthenticated?(<button className="logoutBtn btn" onClick={handlelogout}>LOGOUT</button>):(<button className="logoutBtn btn" onClick={handlelogin}>LOGIN</button>)
      }
      </div>
      <div className="hamburger" onClick={()=>setShow(!show)}>
        <GiHamburgerMenu/>
      </div>
    </nav>
  );
};

export default Navbar;
