import React,{useState,useEffect} from 'react' 
import { Button,Modal,Form } from 'react-bootstrap'
import {allUsers,addSalle,allSalles,deleteSalle,updateSalle} from "../redux/action" 
import {useDispatch,useSelector} from 'react-redux'
import Modals from './modals/Modals'

function Salles({history,match,setPath}) { 
    const dispatch = useDispatch() 
    setPath(match.path)
    const userIsConnected = JSON.parse(localStorage.getItem('student')); 
    const [currentPage,setCurrentPage] = useState(1)
    const [perPage,setPerPage] = useState(9) 
    useEffect(() => { 
        dispatch(allUsers(userIsConnected.accessToken,currentPage,perPage))
        dispatch(allSalles())
    }, [])
    
    const Users = useSelector(state=> state.users)  
    const Salles = useSelector(state=> state.salles) 
    function NewClass({users}) {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [name,setName] = useState('')
        const [teacher,setTeacher] = useState('')
        const [status,setStatus] = useState(false)
        const addNewClass = () =>{ 
            dispatch(addSalle({
                name: name,
                assigned_to: teacher.toLowerCase(),  
                status: status,
            }))
            handleClose()
            //window.setTimeout(refreshPage(), 5000);  
        }
        return (
          <>
           <Button variant='outline-danger' onClick={handleShow}>ADD NEW CLASSROOM</Button> 
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton> 
                <Modal.Title>ADD NEW CLASSROOM</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicNom">
                        <Form.Label>Name of Classroom</Form.Label>
                        <Form.Control type="text" onChange={(e)=> setName(e.target.value)} placeholder="Enter Nom" />
                    </Form.Group>
                    <Form.Label>Assigned to</Form.Label>
                    <Form.Select className="mb-3" onChange={(e)=> setTeacher(e.target.value) } controlId="formBasicTeacher">
                        <option selected>Choose teacher</option> 
                        {users.map(user =>  
                            user?.roles[0].name == 'teacher' ? 
                             <option value={user.email}>{user.firstname} {user.lastname}</option> 
                            :
                            '' 
                        )} 
                    </Form.Select>
                    <Form.Label>Status</Form.Label> 
                    <Form.Select className="mb-3" onChange={(e)=> e.target.value === 'true' ? setStatus(true) : setStatus(false) } controlId="formBasicStatus"> 
                        <option selected>Choose Status</option>
                        <option value={true} >Available</option> 
                        <option value={false}>Not available</option>    
                    </Form.Select>
                </Form>
              </Modal.Body>
              <Modal.Footer> 
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={addNewClass}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
      function UpdatedClass({salle,users}) { 
        const [show, setShow] = useState(false);
        
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const [name,setName] = useState('')
        const [status,setStatus] = useState('')
        const [teacher,setTeacher] = useState(''); 

        const UpdatedCalss = {
          nameClass: salle.name,  
          name: name == '' ? salle.name : name,
          assigned_to: teacher == '' ? salle.assigned_to[0].email : teacher,
          status:  status == '' ? salle.status : status, 
        }
        
        const submitUpdatedClass = () =>{ 
         dispatch(updateSalle({...UpdatedCalss}));   
         handleClose() 
          window.setTimeout(refreshPage(), 5000);  
        }
        return (
          <>
            <button onClick={handleShow}><i class="fa fa-cog"></i></button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>EDIT CLASSROOM</Modal.Title>
              </Modal.Header>
                <Modal.Body>
                    <Form> 
                        <Form.Group className="mb-3" controlId="formBasicNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" onChange={(e)=> setName(e.target.value)} placeholder="Enter Nom" defaultValue={salle.name}/>
                        </Form.Group>
                        <Form.Label>Assigned to</Form.Label>  
                    <Form.Select className="mb-3" onChange={(e)=> setTeacher(e.target.value) } controlId="formBasicTeacher">
                      <option value={salle.assigned_to[0].email} selected>{salle.assigned_to[0].firstname} {salle.assigned_to[0].lastname}</option> 
                          {users.map(user =>   
                              user?.roles[0].name == 'teacher' &&  user.firstname != salle.assigned_to[0].firstname?  
                              <option value={user.email}>{user.firstname} {user.lastname}</option> 
                              :
                              '' 
                          )} 
                    </Form.Select> 
                    <Form.Label>Status</Form.Label>   
                    <Form.Select className="mb-3"  onChange={(e)=> setStatus(e.target.value) } controlId="formBasicStatus"> 
                        <option value={salle.status} selected>{salle.status == 'true' ? 'Available' : 'Not available' }</option> 
                        <option value={true} >Available</option>  
                        <option value={false}>Not available</option>    
                    </Form.Select> 
                </Form>
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={submitUpdatedClass}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
      const DeleteClass = (name) => {
        dispatch(deleteSalle({name:name}))
      }
      const updateRoom = (nameClass,classStatus) => { 
        dispatch(updateSalle({nameClass,status:classStatus}))
        window.setTimeout(refreshPage(), 500);    
      }
      function refreshPage() {
        window.location.reload();
      }
       
    return (
        <div className="utilisateur container-fluid">
                <div className="col-md-12">
                    <div className="">
                        <span className="pull-left">All Classroom</span>
                        <span className="pull-right">  
                            <NewClass users={Users} />
                        </span>
                    </div> 
                        <table className="table">  
                        <thead>
                            <th scope="col">Nom</th>
                            <th scope="col">Assigned to</th>
                            <th scope="col">Teacher email</th>
                            <th scope="col">Status</th> 
                            <th scope="col">Action</th>
                        </thead>
                        {Salles?.map((salle,key)=>
                         <tr key={`salle_${salle._id}`} id={`salle_${salle._id}`}> 
                            <td>{salle.name}</td>
                            <td>{salle.assigned_to[0].firstname} {salle.assigned_to[0].lastname}</td>
                            <td>{salle.assigned_to[0].email}</td>   
                            <td>{salle.status == 'true' ? <Form.Check onClick={() => updateRoom(salle.name, salle.status = 'false')} type="checkbox" className="available" checked /> : <Form.Check onClick={() => updateRoom(salle.name,salle.status = 'true')} className="not-available" type="checkbox" /> } </td>  
                            <td className="action"> 
                                <button onClick={()=> DeleteClass(salle?.name)}><i class="fa fa-times"></i></button> 
                                <UpdatedClass salle={salle} users={Users}/>
                            </td>
                         </tr>
                        )}
                       
                        </table>
                </div>   
        </div>
    )
}
 
export default Salles 
