import React,{useState} from 'react'
import { Button, Container,Row,Col,Form,Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './Signup.css'
import { useSignupMutation } from '../services/appApi';
function Signup() {
  const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");

    const [signup,{error,isLoading,isError}]=useSignupMutation();
    function handleSignup(e){
        e.preventDefault();
        signup({name,email,password});
    }
  return (
    <Container>
        <Row>
            <Col md={6} className="signup_form--container">
                <Form style={{width:"100%"}} onSubmit={handleSignup}>
                    <h1 className='mb-4'>Create an account</h1>
                    {isError && <Alert variant='danger'>{error.data}</Alert>}
                    <Form.Group className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Your name" value={name} required onChange={(e)=>setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e)=>setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} required onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Button type="submit" disabled={isLoading}>Sign Up</Button>
                    </Form.Group>
                    <p>Already have an account?<Link to="/login">Login</Link></p>
                </Form>
            </Col>
            <Col md={6} className="signup_image--container"></Col>
        </Row>
    </Container>
  )
}

export default Signup