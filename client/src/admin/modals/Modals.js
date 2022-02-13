import React,{useState,useEffect} from 'react' 
import { Button,Modal,Form } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {allUsers,SingnUp,deleteHandler,updateHandler} from "../../redux/action"
function Modals({user}) { 
    const dispatch = useDispatch()
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
          window.setTimeout(window.location.reload(), 5000);   
        } 
        return (
          <>
            <button onClick={handleShow}><i class="fa fa-cog"></i></button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update {user.firstname} {user.lastname}</Modal.Title>
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
                        <Form.Select className="mb-3" onChange={(e)=> setNewRoles('teacher') } controlId="formBasicRole">
                            <option defaultValue="teacher" selected>Teacher</option>  
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

export default Modals
