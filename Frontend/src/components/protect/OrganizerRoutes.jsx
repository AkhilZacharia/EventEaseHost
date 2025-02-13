import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const OrganizerRoutes = () => {
    
        const token=sessionStorage.getItem('logintoken');
        const decoded = jwtDecode(token);
        let verifyOrganizer=false;
        if(decoded.Role==='Organizer'){
            verifyOrganizer=true;
        }
        return(
            verifyOrganizer?<Outlet/>:<Navigate to={'/'}/>
        )
}

export default OrganizerRoutes