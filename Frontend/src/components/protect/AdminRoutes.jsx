import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoutes = () => {
    const token=sessionStorage.getItem('logintoken');
    const decoded = jwtDecode(token);
    let verifyAdmin=false;
    if(decoded.Role==='Admin'){
        verifyAdmin=true;
    }
    return(
        verifyAdmin?<Outlet/>:<Navigate to={'/'}/>
    )
}
export default AdminRoutes