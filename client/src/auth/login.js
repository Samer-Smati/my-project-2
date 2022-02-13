import React,{ useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {myStudentHandler} from '../redux/action' 

import { useHistory } from 'react-router-dom'

function Login() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.students) 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    let history = useHistory();
    const login = () => {
        dispatch(myStudentHandler({
            email:email,
            password:password 
        }))
        history.push('/') 
    }

    return (
        <div className="login">
            <Form className="login-from"> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group> 
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label> 
                    <Form.Control type="password"  onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Button variant="dark" onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login 
