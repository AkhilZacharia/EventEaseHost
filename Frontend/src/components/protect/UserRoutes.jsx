import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
    
const UserRoutes = () => {
    
        const token=sessionStorage.getItem('logintoken');
        const decoded = jwtDecode(token);
        let verifyUser=false;
        if(decoded.Role==='User'){
            verifyUser=true;
        }
        return(
            verifyUser?<Outlet/>:<Navigate to={'/'}/>
        )
   
}

export default UserRoutes