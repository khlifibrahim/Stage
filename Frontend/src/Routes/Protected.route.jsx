import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { hasPermission, ROLE_TO_ID } from "../Components/Utilities/role.permissions";
// import { use } from "react";

export const ProtectedRoute = ({ feature, reqPermission}) => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    console.log('Protected route: ')
    console.log("is authenticated",isAuthenticated)
    console.log("User :",user)
    console.log("User role: ",user?.role)
    console.log("User feature: ",user?.feature)
    console.log("Permissions: ", reqPermission)

    const roleID = ROLE_TO_ID[user?.role]
    if(!isAuthenticated) {
        return <Navigate to="/" replace/>
    }

    const isAuthorized = hasPermission(user?.profile, feature, reqPermission);
    console.log(isAuthorized)

    if(!isAuthorized){
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}