import React,{useState,useEffect} from 'react' 
import { Button,Modal,Form } from 'react-bootstrap'
import {allUsers,SingnUp,deleteHandler,updateHandler} from "../redux/action"
import {useDispatch,useSelector} from 'react-redux'
import Modals from './modals/Modals'
function Teacher({history,match,setPath}) { 
    const dispatch = useDispatch()
    setPath(match.path)
    const userIsConnected = JSON.parse(localStorage.getItem('student')); 
    const [currentPage,setCurrentPage] = useState(1)
    const [perPage,setPerPage] = useState(9) 
    useEffect(() => { 
        dispatch(allUsers(userIsConnected.accessToken,currentPage,perPage))
    }, [])
    // const ChnagePage = (numberPage) =>{
    //   dispatch(allUsers(userIsConnected.accessToken,numberPage,perPage))  
    // }
    const Users = useSelector(state=> state.users)  
    
    function NewUser() {
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
        return (
          <>
           <Button variant='outline-danger' onClick={handleShow}>ADD NEW TEACHER</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton> 
                <Modal.Title>ADD NEW TEACHER</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicNom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" onChange={(e)=> setFirstName(e.target.value)} placeholder="Enter Nom" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPrenom">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text" onChange={(e)=> setLastName(e.target.value)} placeholder="Enter Prénom" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Password" />
                    </Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Select className="mb-3" onChange={(e)=> setRoles('teacher') } controlId="formBasicRole">
                            <option defaultValue="teacher" selected>Teacher</option>  
                        </Form.Select>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={addNewUser}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }

      const DeleteUsers = (email) =>{
          dispatch(deleteHandler(email)) 
          window.setTimeout(refreshPage(), 5000); 
      }
      function refreshPage() {
        window.location.reload();
      }
       
    return (
        <div className="utilisateur container-fluid">
                <div className="col-md-12">
                    <div className="">
                        <span className="pull-left">All teachers</span>
                        <span className="pull-right">  
                            <NewUser />
                        </span>
                    </div> 
                        <table className="table">  
                        <thead>
                            <th scope="col"> </th>
                            <th scope="col">Nom d'utilisateur</th>
                            <th scope="col">Email</th>
                            <th scope="col">Titre</th>
                            <th scope="col">super administrateur</th>
                            <th scope="col">Action</th>
                        </thead>
                        {Users?.map((user) => {
                            if(user?.roles[0].name == 'teacher') {  
                                return( 
                                    <tr id={user?._id} className="odd"> 
                                    <td className="avatar">{user?.firstname.charAt(0).toUpperCase()}</td>
                                    <td>{user?.firstname.charAt(0).toUpperCase() + user?.firstname.slice(1)} {user?.lastname.charAt(0).toUpperCase() + user?.lastname.slice(1)}</td>
                                    <td>{user?.email.charAt(0).toUpperCase() + user?.email.slice(1)}</td>
                                    <td>{user?.roles[0].name.charAt(0).toUpperCase() + user?.roles[0].name.slice(1)}</td> 
                                    <td className="label label-success">{user?.roles[0].name == 'admin' ? 'yes'.charAt(0).toUpperCase() + 'yes'.slice(1) : 'no'.charAt(0).toUpperCase() + 'no'.slice(1)}</td>
                                    <td className="action"> 
                                        <button onClick={()=> DeleteUsers(user?.email)}><i class="fa fa-times"></i></button>
                                        <Modals user={user}/>   
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

export default Teacher 
