import React,{useEffect} from 'react'
import './students.css'
import {useDispatch,useSelector} from 'react-redux';
import {allUsers,allRoles} from "../redux/action"  
function Students({history,match,setPath}) {
    const dispatch = useDispatch()
    setPath(match.path)
    const userIsConnected = JSON.parse(localStorage.getItem('student')); 
    useEffect(() => { 
        dispatch(allUsers(userIsConnected.accessToken))
        dispatch(allRoles(userIsConnected.accessToken)) 
    }, [])
    const Users = useSelector(state=> state.users)
    return (
        <div className="container students"> 
            <div class="page-content page-container" id="page-content">
                <div class="padding"> 
                    <div class="row">
                        <div class="col-sm-12">
                            
                            <table className="table table">
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Formation</th>
                                        <th>Product</th>
                                        <th>Number</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                            {Users?.map((user,key)=>{
                                if(user?.roles[0].name == 'student'){ 
                                    return( 
                                        <tr key={key} data-id={user._id} >
                                            <td className="avatar">{user?.firstname.charAt(0).toUpperCase()}</td>
                                            <td>{user.firstname} {user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td >{user.formation}</td> 
                                            <td>{user.product}</td>
                                            <td>{user.number}</td>
                                            <td>{new Date(user.created_At).toLocaleString()}</td>
                                        </tr>
                                    )
                                }
                            }
                            )}
                             </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Students
