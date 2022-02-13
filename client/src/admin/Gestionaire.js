import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {allUsers,SingnUp,deleteHandler,updateHandler} from "../redux/action" 
import Modal from './modals/Modals'
function Gestionaire({match,setPath}) {
    setPath(match.path) 
    const dispatch = useDispatch()
    const userIsConnected = JSON.parse(localStorage.getItem('student')); 
    useEffect(() => { 
        dispatch(allUsers(userIsConnected.accessToken)) 
    }, [])
    const Users = useSelector(state=> state.users)  
    
    const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [firstname,setFirstName] = useState('')
        const [lastname,setLastName] = useState('')
        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const [roles,setRoles] = useState('')
        const addNewUser = () =>{ 
            dispatch(SingnUp({
                firstname: firstname,
                lastname: lastname, 
                email: email, 
                roles: [roles.toLowerCase()],
                password: password 
            }))
            handleClose()  
            window.setTimeout(refreshPage(), 5000);  
        }

    const DeleteUsers = (email) =>{
        dispatch(deleteHandler(email)) 
        window.setTimeout(refreshPage(), 10000); 
    }
    function refreshPage() {
      window.location.reload();
    }

    return (
        <div className="container gestionaire">
            <div className="col-md-12">
                <div className="">
                    <span className="pull-left">Tous les gestionaire </span>
                </div> 
                    <table className="table">  
                    <thead>
                        <th scope="col"> </th>
                        <th scope="col">Nom d'utilisateur</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </thead>
                    {Users?.map((user) => {
                        if(user?.roles[0].name == 'gestionaire') {  
                            return( 
                                <tr id={user?._id} className="odd">  
                                <td className="avatar">{user?.firstname.charAt(0).toUpperCase()}</td>
                                <td>{user?.firstname.charAt(0).toUpperCase() + user?.firstname.slice(1)} {user?.lastname.charAt(0).toUpperCase() + user?.lastname.slice(1)}</td>
                                <td>{user?.email.charAt(0).toUpperCase() + user?.email.slice(1)}</td>
                                <td className="action"> 
                                    <button onClick={()=> DeleteUsers(user?.email)}><i class="fa fa-times"></i></button>
                                    <Modal user={user}/>   
                                </td>
                            </tr>
                            ) 
                        }
                    }
                    )}
                    
                    </table>
                    {/* <nav aria-label="Page navigation example">
                        <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li> 
                        {Users?.map((_,key)=> {if(key > 0) return <li class="page-item"><a class="page-link" onClick={(e) => {ChnagePage(key)}}>{key}</a></li>}) } 
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav> */} 
                    
            </div> 
        </div>
    )
}

export default Gestionaire
