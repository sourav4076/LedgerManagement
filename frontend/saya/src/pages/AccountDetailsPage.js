import React from 'react'
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import AccountStatement from './AccountStatement';
import AddNewTranscation from './AddNewTranscation';
import ReactLoading from "react-loading";

function AccountDetailsPage() {
  const [accountNames, setAccountNames] = useState([]);
  const [detailsActive, setDetailsActive] = useState(false);
  const [cuurentAccount, setCurrentAccount] = useState();
  const [statementData, setStatementData] = useState();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewTanscation = (company_id,transcationData)=> {
    try {
      setLoading(true)
      const requestBody = {
        'company_id':company_id,
        'transactions':[]
      }
      requestBody.transactions.push(transcationData);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

      fetch('http://localhost:3000/safe/company/transcation',requestOptions)
      .then((res)=>res.json())
      .then((json)=>{
        console.log('successfully saved a transcaiton')
        setLoading(false)
        fetchStatements()
    })
    } catch (error) {
        console.log('error fetching account details with error '+error)
        setLoading(false)
    }
    handleClose();
  }


  const fetchStatements = ()=>{
    try {
      setLoading(true)
      fetch('http://localhost:3000/safe/company/transcation/'+cuurentAccount._id)
      .then((res)=>res.json())
      .then((json)=>{
        setStatementData(json.data);
        setLoading(false);
    })
    } catch (error) {
        setLoading(false);
        console.log('error fetching account details with error '+error)
    }
  }

  const fetchAccountNames = (inputName)=>{
    setDetailsActive(false)
    setLoading(true)
    try {

      fetch('http://localhost:3000/safe/company/name/'+inputName)
      .then((res)=>res.json())
      .then((json)=>{
         setAccountNames(json.data);
         setLoading(false)
    })
    } catch (error) {
        console.log('error fetching account details with error '+error)
        setLoading(false)
    }
    
  }

  const loadAccountDetailsOnClicked = (accountData) =>{
    setDetailsActive(true);
    setCurrentAccount(accountData)
  }

  return (
    <Container fluid="sm">
    {/* input line to catch name */}
    {
        (loading)?
        <ReactLoading type='bars' color="black"/>
        :
        <p></p>
      }
    <InputGroup size="lg">
        <InputGroup.Text id="accountNameText" >Account Name</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        onChange={(e)=>{
          e.preventDefault();
          fetchAccountNames(e.target.value)}}/>
      </InputGroup>
      
      {/* list showing fetched account */}
      <div className="accountList">
        <ListGroup defaultActiveKey="" as="ul">
          {
          (!detailsActive)?
          accountNames.map(accountData => (
            <ListGroup.Item as="li" action onClick={()=>{loadAccountDetailsOnClicked(accountData)}}>
              {accountData.company_name}
          </ListGroup.Item>
          ))
          :
          <p></p>
        }
        </ListGroup>
      </div>
      
      {/* selelcted account details */}
      <div>
      {
          (detailsActive)? 
            <div className = "accountDetails">
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control placeholder={cuurentAccount.company_name} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company Address</Form.Label>
                <Form.Control placeholder={cuurentAccount.company_address} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>GST ID</Form.Label>
                <Form.Control placeholder={cuurentAccount.gst_id} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Closing Balance</Form.Label>
                <Form.Control placeholder={cuurentAccount.closing_balance} disabled />
              </Form.Group>
              

              <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="First group">
                  <Button onClick={handleClickOpen}>Add Transcation</Button> 
                </ButtonGroup>
                <br></br>
                <ButtonGroup className="me-2" aria-label="Second group">
                  <Button onClick={()=>{fetchStatements()}}>Get Statement</Button>
                </ButtonGroup>
              </ButtonToolbar>

            </div>
          :
          <p></p>
        }
      </div>
      
      {
           (cuurentAccount)?
           <div>
                <div className = "addTranscaiton">
                  <AddNewTranscation companyData = {cuurentAccount} openStatus = {open} closeFunction = {()=>handleClose()} saveFunction = {(company_id, transcationData)=>createNewTanscation(company_id, transcationData)}/>
                </div>
           </div>
           
           :
           <p></p>
      }
     
      {
          (detailsActive)?
          <div className = "statementList">
            {
                (statementData &&  statementData.length>0)?
                  <AccountStatement statements = {statementData}/>
                :<p></p>
            }
          </div>
          : <p></p>
      }
      
      
      
  </Container>
  )
}

export default AccountDetailsPage