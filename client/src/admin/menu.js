import React,{useState} from 'react'
import Dashboard from './dashbord'
import Teachers from './teacher'
import Gestionaires from './Gestionaire'
import Students from './Students'  
import Utilisateur from './Utilisateur'
import Salles from './salles'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    useHistory
  } from "react-router-dom";
function Menu() {
    
    let location = useLocation()
    let history = useHistory();
    
    if(location.pathname === '/admin'){
        history.push('/dashboard') 
    } 

    const [path,setPath] = useState(''); 
    return (
        <Router>
            <div className="menu">
                <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: "280"}}>
                    <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">  
                        {path === '/dashboard' ?  
                        <Link to="/dashboard" className="nav-link active" aria-current="page">  <i className="fa fa-fw fa-home"></i>
                            Dashboard
                        </Link>  : 
                        <Link to="/dashboard" className="nav-link text-white" aria-current="page"> 
                            <i className="fa fa-fw fa-home"></i>
                            Dashboard
                        </Link> }
                    </li>
                    <li>
                    {path === '/teachers' ?  
                        <Link to="/teachers" className="nav-link active">
                        <i className="fas fa-chalkboard-teacher"></i>
                        Teachers
                        </Link>
                        : <Link to="/teachers" className="nav-link text-white">
                        <i className="fas fa-chalkboard-teacher"></i>
                        Teachers
                        </Link>
                    }
                    </li>
                    <li>
                        { path === '/gestionaires' ?  
                            <Link to="/gestionaires" className="nav-link active">
                            <i className="fa fa-fw fa-user"></i> 
                            Gestionaires
                            </Link>
                        :
                            <Link to="/gestionaires" className="nav-link text-white">
                            <i className="fa fa-fw fa-user"></i> 
                            Gestionaires
                            </Link>
                        }
                    </li>
                    <li>
                          {path === '/students' ?  
                        <Link to="/students" className="nav-link active">
                        <i className="fas fa-user-graduate"></i>
                        Students
                        </Link>
                        :
                            <Link to="/students" className="nav-link text-white">
                            <i className="fas fa-user-graduate"></i>
                            Students
                            </Link>
                        }
                    </li>
                    <li>
                          {path === '/utilisateur' ?  
                        <Link to="/utilisateur" className="nav-link active">
                        <i className="fas fa-users"></i>
                        utilisateur
                        </Link> 
                        :
                        <Link to="/utilisateur" className="nav-link text-white">
                        <i className="fas fa-users"></i>
                        utilisateur
                        </Link> 
                        }
                    </li>
                    <li>
                          {path === '/salle' ?  
                        <Link to="/utilisateur" className="nav-link active">
                        <i class="fas fa-home"></i>
                        Salle
                        </Link> 
                        :
                        <Link to="/salle" className="nav-link text-white">
                        <i class="fas fa-home"></i>
                        Salle
                        </Link> 
                        }
                    </li>   
                    </ul>
                </div>
                <Switch>
                    <Route path="/dashboard" render ={(props)=> <Dashboard {...props} setPath={setPath} />} />
                    <Route path="/teachers" render ={(props)=> <Teachers {...props} setPath={setPath} />} />
                    <Route path="/gestionaires" render ={(props)=> <Gestionaires {...props} setPath={setPath} />} />
                    <Route path="/students" render ={(props)=> <Students {...props} setPath={setPath} />} /> 
                    <Route path="/utilisateur" render ={(props)=> <Utilisateur {...props} setPath={setPath} />} />
                    <Route path="/salle" render ={(props)=> <Salles {...props} setPath={setPath} />} />
                </Switch>
            </div> 
        </Router>
       
    )
}

export default Menu
