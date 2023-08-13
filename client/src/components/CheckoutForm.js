import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { useCreateOrderMutation } from '../services/appApi';
import { Row,Col,Alert,Form,Button, Card } from 'react-bootstrap';

function CheckoutForm() {
    const stripe=useStripe();
    const elements=useElements();
    const user=useSelector(state=>state.user);
    const navigate=useNavigate();
    const [alertMessage,setAlertMessage]=useState("");
    const [createOrder,{isLoading,isError,isSuccess}]=useCreateOrderMutation();
    const [country,setCountry]=useState('');
    const [address,setAddress]=useState("");
    const [paying,setPaying]=useState(false);



    async function handlePay(e){
        e.preventDefault();
        if(!stripe || !elements || user.cart.count==0)
        return;
        setPaying(true);

        const {client_secret}=await fetch('http://localhost:8080/create-payment',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({amount:user.cart.total}),
        }).then((res)=>res.json());
        
        // const k=elements.getElement(CardElement);
        // console.log(k);


        const {paymentIntent,error}=await stripe.confirmCardPayment(client_secret,{
            payment_method:{
                card:elements.getElement(CardElement),
            },
        }).then(function(result) {
    // Handle result.error or result.paymentIntent
    // console.log(result);
        
    return result;
  });
        
        
        setPaying(false);
        console.log(error);
        if(error){
            setAlertMessage(`Payment failed: ${error.message}`);
        }
        if(paymentIntent){
            
            createOrder({userId:user._id,cart:user.cart,address,country}).then(res=>{
                if(!isLoading && !isError){
                    if(paymentIntent.status==='succeeded'){
                        setAlertMessage(`Payment ${paymentIntent.status}`);
                    }
                    setTimeout(()=>{
                        navigate('/orders')
                    },2000);
                }
            })
        }
    }

  return <Col className="cart-payment-container">
    <Form onSubmit={handlePay}>
        <Row>
            {alertMessage && <Alert>{alertMessage}</Alert>}
       
        <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" value={user.name} disabled />
            </Form.Group>
        </Col>
        <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" value={user.email} disabled />
            </Form.Group>
        </Col>
         </Row>
         <Row>
             <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
                </Form.Group>
             </Col>
             <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Country" value={country} onChange={(e)=>setCountry(e.target.value)} />
                </Form.Group>
             </Col>
         </Row>
         <label htmlFor="card-element">Card</label>
         <CardElement id="card-element" />
         <Button className="mt-3" type="submit" disabled={user.cart.count<=0 || paying || isSuccess}>{paying?"Processing...":"Pay"}</Button>
    </Form>
  </Col>
}

export default CheckoutForm