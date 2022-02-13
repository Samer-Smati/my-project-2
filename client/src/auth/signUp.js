import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {SingnUp} from '../redux/action' 
function SignUp() { 
    const dispatch = useDispatch();
    const [firstname,setFirstName] = useState('')
    const [lastname,setLastName] = useState('') 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [number,setNumber] = useState('') 
    const [formation,setFormation] = useState('')
    const [product,setProduct] = useState('')   

    let history = useHistory();

    const form = (event) => {
        dispatch(SingnUp({
            firstname: firstname,
            lastname: lastname, 
            email: email,
            number: number,
            formation: formation,
            product: product, 
            password: password 
        }))
    }
    return ( 
        <div className="form-group signup-from">
            <div className="contact__description">
                <div className="contact__description__part-one">Inscrivez-vous</div>
                <div className="contact__description__part-two">Un de nos conseillers vous contactera au plus vite.</div>
            </div>
            <Form onSubmit={form}> 
                <Form.Group className="mb-3 d-flex">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" placeholder="Enter nom" onChange={(e) => setFirstName(e.target.value)} className="me-4 ms-2" required/>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" placeholder="Enter Prénom"  onChange={(e) => setLastName(e.target.value)} className="me-4 ms-2" required />
                </Form.Group>
                <Form.Group className="mb-3">  
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your Email"   onChange={(e) => setEmail(e.target.value)} required/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your Password"   onChange={(e) => setPassword(e.target.value)} required/>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Phone Number"  onChange={(e) => setNumber(e.target.value)} required/>
                    <Form.Label>Lieu de la formation</Form.Label>
                    <Form.Select onChange={(e) => setFormation(e.target.value)}>
                        <option disabled selected>Veuillez sélectionner</option>
                        <option defaultValue="Tunis">Lac 1</option>
                        <option defaultValue="Centre-Ville">Centre-Ville</option>
                        <option defaultValue="Sousse">Sousse</option>
                        <option defaultValue="Sfax">Sfax</option>
                        <option defaultValue="Manzah 5">Manzah 5</option> 
                        <option defaultValue="Nabeul">Nabeul</option> 
                        <option defaultValue="Béja">Béja</option>
                        <option defaultValue="Gabès">Gabès</option>
                        <option defaultValue="Gafsa">Gafsa</option>
                        <option defaultValue="Online">Online-Tunisia</option>
                    </Form.Select>
                    <Form.Label>Product</Form.Label>
                    <Form.Select  onChange={(e) => setProduct(e.target.value)}>
                        <option disabled selected>Veuillez sélectionner</option>
                        <option defaultValue="Deviens Dev fullstack JS">The Full-Stack Javascript Bootcamp</option>
                        <option defaultValue="Web">Introduction to Web Development</option>
                        <option defaultValue="WEB 02: Introducton to Front-end Development">Introduction to React.js</option>
                        <option defaultValue="WEB 03: Introduction to Back-end Development">Introduction to Node.js</option>
                        <option defaultValue="Coding with python">Coding With Python</option>
                        <option defaultValue="AI">Introduction to Artificial Intelligence</option>
                        <option defaultValue="IA 02: Neural Network and Deep Learning">Introduction to Neural Network and Deep Learning</option>
                        <option defaultValue="Business Intelligence 01 : Business Intelligence Introduction with an SQL Server Environement">Introduction to Business Intelligence</option>
                        <option defaultValue="The DevOps Bootcamp">The DevOps Bootcamp</option>
                        <option defaultValue="Linux 01 : How to master Linux">Linux System Administration 101</option>
                        <option defaultValue="Embedded Systems">Introduction to Embedded Systems</option>
                        <option defaultValue="INTRO TO UI/UX">Introduction to UX Design</option>
                        <option defaultValue="Digital Marketing">Introduction to Digital Marketing</option>
                        <option defaultValue="Power BI">Introduction to Power BI</option>
                        <option defaultValue="Game">Introduction to Game Development</option>
                        <option defaultValue="Game 02 : Introduction to 2D Game Development">Introduction to 2D Game Development</option>
                        <option defaultValue="Game 03 : Introduction to 3D Game Development">Introduction to 3D Game Development</option>
                        <option defaultValue="Kids">Scratch and App Inventor (FR)</option>
                        <option defaultValue="Web Development for Kids">Web Development and 3D Modeling (FR)</option>
                        <option defaultValue="3D Modeling 01: Introduction to 3D modeling">Introduction to 3D Modeling</option>
                        <option defaultValue="Data Science">The Data Science Bootcamp</option>
                        <option defaultValue="Digital Marketing Full Time">The Digital Marketing Bootcamp</option>
                        <option defaultValue="SummerAcademy">Summer Academy</option>
                        <option defaultValue="UX/UI design">UX/UI design</option>
                        <option defaultValue="UI Design">Introduction to UI Design</option>
                        <option defaultValue="Cybersecurity">Introduction to Cybersecurity</option>
                        <option defaultValue="Introduction to MSBI">Introduction to MSBI</option>
                        <option defaultValue="The Full-Stack Javascript Mobile Development Bootcamp">The Full-Stack Javascript Mobile Development Bootcamp</option>
                    </Form.Select>
                </Form.Group>
                <Button as={Link} to='/' variant="light">Back</Button> 
                <Button variant="dark" type="submit">Soumettre </Button> 
            </Form> 
        </div>
    )
}

export default SignUp
 