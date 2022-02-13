import React,{useState,useEffect} from 'react'
import { Button,Modal,Form } from 'react-bootstrap'
import {allUsers,SingnUp,deleteHandler,updateHandler} from "../redux/action"
import {useDispatch,useSelector} from 'react-redux'
function Utilisateur({match,setPath}) {
    const dispatch = useDispatch()
    setPath(match.path)
    const userIsConnected = JSON.parse(localStorage.getItem('student')); 
    const [currentPage,setCurrentPage] = useState(1)
    const [perPage,setPerPage] = useState(9) 
    useEffect(() => { 
        dispatch(allUsers(userIsConnected.accessToken,currentPage,perPage))
    }, [])
    const ChnagePage = (numberPage) =>{
      dispatch(allUsers(userIsConnected.accessToken,numberPage,perPage))  
    }
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
           <Button variant='outline-danger' onClick={handleShow}>Nouvel utilisateur</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>NOUVEL UTILISATEUR</Modal.Title>
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
                    <Form.Select className="mb-3" onChange={(e)=> setRoles(e.target.value)} controlId="formBasicRole">
                        <option selected disabled defaultValue="">Select The role</option>
                        <option defaultValue="teacher">Teacher</option>
                        <option defaultValue="gestionaire">Gestionaire</option>
                        <option value="admin">Admin</option>  
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

      function UpdatedUser({user}) { 
        const [show, setShow] = useState(false);
        
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const [firstname,setFirstName] = useState('')
        const [lastname,setLastName] = useState('')
        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const [Newroles,setNewRoles] = useState('')

        const Users = {
          firstname:firstname != '' ? firstname : user.firstname,
          lastname: lastname != '' ? lastname : user.lastname,
          email: email != '' ? email : user.email,
          oldEmail: user.email, 
          password: password != '' ? password : '', 
          roles: Newroles != '' ? [Newroles.toLowerCase()] : [user.roles[0].name.toLowerCase()] 
        }
        
        const submitUpdatedUser = () =>{
          dispatch(updateHandler(Users));  
          handleClose() 
          window.setTimeout(refreshPage(), 5000); 
        }
        return (
          <>
            <button onClick={handleShow}><i class="fa fa-cog"></i></button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" onChange={(e)=> setFirstName(e.target.value)} placeholder="Enter Nom" defaultValue={user.firstname}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrenom">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control type="text" onChange={(e)=> setLastName(e.target.value)} placeholder="Enter Prénom" defaultValue={user.lastname} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={(e)=> setEmail(e.target.value) } placeholder="Enter email" defaultValue={user.email}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e)=> setPassword(e.target.value) } placeholder="Password" defaultValue='' />
                        </Form.Group>
                        <Form.Label>Role</Form.Label>    
                        <Form.Select className="mb-3" onChange={(e)=> setNewRoles(e.target.value) } controlId="formBasicRole"> 
                            <option disabled defaultValue="">Select The role</option> 
                            {user.roles[0].name == 'teacher'? <option defaultValue="teacher" selected>Teacher</option>  : <option defaultValue="teacher" >Teacher</option> }
                            {user.roles[0].name == 'gestionaire'? <option defaultValue="gestionaire" selected>Gestionaire</option> : <option defaultValue="gestionaire">Gestionaire</option> }
                            {user.roles[0].name == 'admin'? <option defaultValue="admin" selected>Admin</option> : <option defaultValue="admin">Admin</option> }
                        </Form.Select>
                    </Form>
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={submitUpdatedUser}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
      const DeleteUsers = (email) =>{
          dispatch(deleteHandler(email)) 
          window.setTimeout(refreshPage(), 10000); 
      }
      function refreshPage() {
        window.location.reload();
      }
       
    return (
        <div className="utilisateur container-fluid">
                <div className="col-md-12">
                    <div className="">
                        <span className="pull-left">Tous les utilisateurs </span>
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
                            if(user?.roles[0].name !== 'student') { 
                                return( 
                                    <tr id={user?._id} className="odd"> 
                                    <td className="avatar">{user?.firstname.charAt(0).toUpperCase()}</td>
                                    <td>{user?.firstname.charAt(0).toUpperCase() + user?.firstname.slice(1)} {user?.lastname.charAt(0).toUpperCase() + user?.lastname.slice(1)}</td>
                                    <td>{user?.email.charAt(0).toUpperCase() + user?.email.slice(1)}</td>
                                    <td>{user?.roles[0].name.charAt(0).toUpperCase() + user?.roles[0].name.slice(1)}</td> 
                                    <td className="label label-success">{user?.roles[0].name == 'admin' ? 'yes'.charAt(0).toUpperCase() + 'yes'.slice(1) : 'no'.charAt(0).toUpperCase() + 'no'.slice(1)}</td>
                                    <td className="action"> 
                                        <button onClick={()=> DeleteUsers(user?.email)}><i class="fa fa-times"></i></button>
                                        <UpdatedUser user={user}/>  
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

export default Utilisateur
