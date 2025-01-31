import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { hasPermission } from "../Components/Utilities/role.permissions";

export const ProtectedRoute = ({ feature, reqPermission}) => {
    console.log("(Protected Rout accessed...")
    const { isAuthenticated, role, permissions } = useSelector(state => state.auth);

    console.log("ProtectedRoute Debug:");
    console.log(" - isAuthenticated:", isAuthenticated);
    console.log(" - Role:", role);
    console.log(" - Permissions:", permissions);
    
    if(!isAuthenticated) {
        console.log("❌ User not authenticated! Redirecting to login...");
        return <Navigate to="/login" replace/>
    }
    
    const entries = Object.entries(permissions)
    for(const entry of entries) {
        console.log("Redirecting to ", entry[0]);
        if(entry[1].length > 0) {
            return <Navigate to={entry[0]} replace/>
        }
    }
    console.log("Testing the entries: ",entries)

    
    // if(!feature) {
    //     return <Navigate to={goToFirstRout} replace/>
    // }
    // if (!permissions || Object.keys(permissions).length === 0) {
    //     console.log("❌ No permissions found! Redirecting to unauthorized...");
    //     return <Navigate to="/unauthorized" replace />;
    // }
    
    const userPermissions = permissions || {}
    // console.log("User permissions: ",userPermissions)
    const isAuthorized = hasPermission(role, feature, reqPermission);

    if(!isAuthorized){
        console.log("❌ User lacks permissions! Redirecting...");
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}