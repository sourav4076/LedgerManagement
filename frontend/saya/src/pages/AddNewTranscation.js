import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import Modal from 'react-bootstrap/Modal'
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'

function AddNewTranscation(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [transcationData,setTranscationData] = useState({
      type:'DEBIT',
      amount:0,
      details:'',
      ts: new Date()
    });

  return (
    <div>
      <Modal show={props.openStatus} onHide={props.closeFunction}>
        <Modal.Header closeButton>
          <Modal.Title>New transaction for {props.companyData.company_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3">
                <Form.Label>Transcation Type</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e)=>{transcationData.type=e.target.value}}>
                    <option value="DEBIT">DEBIT</option>
                    <option value="CREDIT">CREDIT</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control onChange={(e)=>{transcationData.amount=e.target.value}}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Details</Form.Label>
                <Form.Control onChange={(e)=>{transcationData.details=e.target.value}}/>
              </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeFunctio}n>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            transcationData.ts = startDate;
            props.saveFunction(props.companyData._id,transcationData);  
            }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddNewTranscation