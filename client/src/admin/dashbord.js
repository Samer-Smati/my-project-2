import React,{useState,useEffect} from 'react'
import { Button,Modal,Form } from 'react-bootstrap'
import {allUsers,allRoles} from "../redux/action"
import {useDispatch,useSelector} from 'react-redux'

function Dashbord({match,setPath}) {
    
    const dispatch = useDispatch()
    setPath(match.path)
    const userIsConnected = JSON.parse(localStorage.getItem('student')); 
    useEffect(() => { 
        dispatch(allUsers(userIsConnected.accessToken))
        dispatch(allRoles(userIsConnected.accessToken)) 
    }, [])
    const Users = useSelector(state=> state.users) 
    const Roles = useSelector(state=> state.roles)
    let count_admin = 0
    let count_teacher = 0
    let count_student = 0 
    let count_gestionaire = 0
        Users.map(user =>{
            Roles.map(role => {
                if(role.name == user.roles[0].name && user.roles[0].name == 'admin' ){  
                    count_admin = count_admin  + 1     
                }  
                if(role.name == user.roles[0].name && user.roles[0].name == 'teacher' ){  
                    count_teacher = count_teacher  + 1     
                }   
                if(role.name == user.roles[0].name && user.roles[0].name == 'student' ){  
                    count_student = count_student  + 1     
                }  
                if(role.name == user.roles[0].name && user.roles[0].name == 'gestionaire' ){  
                    count_gestionaire = count_gestionaire  + 1     
                }  
            })
        })
        console.log('count_admin',count_admin)
        console.log('count_teacher',count_teacher) 
        console.log('count_student',count_student)
        console.log('count_gestionaire',count_gestionaire)
    return ( 
        <div className="container dashboard">  
                <div className='row'> 
                {Roles?.map((role,key) => <div className='col col-3 row'>
                        <div key={`list-dashbord-${key}`} className="whiteBox shadow">
                            <span>{role.name.toUpperCase()}</span>
                            <div className="ant-row" style={{rowGap: "0px",padding:"20px"}}> 
                                <div className="ant-col ant-col-11 gutter-row" style={{textAlign: "left"}}>
                                    <div className="left">Total :</div>
                                </div>
                                <div className="ant-col ant-col-2 gutter-row">
                                    <div className="ant-divider ant-divider-vertical" role="separator" style={{display: "flex" ,justifyContent: "center"}}></div>
                                </div>
                                <div className={`ant-col ant-col-11 gutter-row count-${role.name}`} style={{display: "flex" ,justifyContent: "center"}}>
                                    <span className="ant-tag ant-tag-purple" style={{margin: "0px auto", justifyContent: "center"}}> 
                                        {role.name == 'admin' ? count_admin :
                                        role.name == 'teacher' ? count_teacher :  
                                        role.name == 'student' ? count_student :
                                        role.name == 'gestionaire' ? count_gestionaire : 
                                        0} 
                                    </span> 
                                    </div>
                                </div>
                        </div>
                    </div> )}
                    <div>
                        <div className='col-5 shadow'>
                        <div className="card-body">
                        {Roles?.map((role,key) => 
                        <>
                            <h4 className="small font-weight-bold">{role.name} <span className="float-right"> {role.name == 'admin' ? count_admin :
                                        role.name == 'teacher' ? count_teacher :   
                                        role.name == 'student' ? count_student:
                                        role.name == 'gestionaire' ? count_gestionaire :  
                                        0} </span></h4>
                            <div className="progress mb-4">
                            {role.name == 'admin' ? <div className="progress-bar bg-danger" role="progressbar" style={{width: `${count_admin}%`}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>:
                                        role.name == 'teacher' ? <div className="progress-bar bg-warning" role="progressbar" style={{width: `${count_teacher}%`}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>:  
                                        role.name == 'student' ? <div className="progress-bar bg-info" role="progressbar" style={{width: `${count_student}%`}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div> :
                                        role.name == 'gestionaire' ? <div className="progress-bar bg-success" role="progressbar" style={{width: `${count_gestionaire}%`}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>  :  
                                        0}
                            </div>
                        </>
                        
                        )}
                    </div>
                        </div>
                    
                    </div>
                </div> 
        </div>
    )
}

export default Dashbord

