import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReactLoading from "react-loading";
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';


function CreateAccountPage() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    active:false,
    type:'S',
    msg:''
  })

  let newAccountData = {
    "company_name":"",
    "gst_id":"",
    "company_address":"",
    "closing_balance":0
}
  const handleSaveAccount = ()=>{
    try {
      setLoading(true)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAccountData)
    };

      fetch('http://localhost:3000/safe/company',requestOptions)
      .then((res)=>res.json())
      .then((json)=>{
        console.log('successfully created an account');
        <Alert variant='success'>
          Account Created Successfully!
        </Alert>
        setLoading(false)
    })
    } catch (error) {
        console.log('error creating account details with error '+error)
        setLoading(false)
    }
  }
  return (
    <Container fluid="sm">
        {
        (loading)?
        <ReactLoading type='bars' color="black"/>
        :
        <p></p>
      }

        <div className = "accountDetails">
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control onChange={(e)=>{newAccountData.company_name = e.target.value}}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company Address</Form.Label>
                <Form.Control onChange={(e)=>{newAccountData.company_address = e.target.value}}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>GST ID</Form.Label>
                <Form.Control onChange={(e)=>{newAccountData.gst_id = e.target.value}}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Closing Balance</Form.Label>
                <Form.Control onChange={(e)=>{newAccountData.closing_balance = e.target.value}}/>
              </Form.Group>

              <Button onClick={()=>handleSaveAccount()}>Add Account</Button> 

            </div>
    </Container>
  )
}

export default CreateAccountPage