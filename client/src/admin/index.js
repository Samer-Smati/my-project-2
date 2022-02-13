import React from 'react'
import Menu from './menu'
import {Switch,Route,
    useLocation,
    useHistory} from 'react-router-dom'
import Dashbord from './dashbord'
function Index() {
    let location = useLocation()
    let history = useHistory();
    
    if(location.pathname === '/admin'){
        history.push('/dashboard') 
    } 
    return (
        <div className="admin-container">
            Admin
        </div>
    )
}

export default Index  
 