import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addIssue } from '../actions/issueActions'

const IssueModal = () => {
  const [state, setState] = useState({
    subject: '',
    description: '',
    severity: 0,
    modal: false
  })

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const toggle = () => setState({ ...state, modal: !state.modal })

  const onSubmit = e => {
    e.preventDefault()

    const newIssue = {
      subject: state.subject,
      description: state.description,
      severity: state.severity,
      author: auth.user.name,
      status: 1
    }

    dispatch(addIssue(newIssue))

    toggle()
  }

  return (
    <div>
      {auth.isAuthenticated && (
        <Button color='dark' style={{ marginBottom: '2rem' }} onClick={toggle}>
          Add Issue
        </Button>
      )}
      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Issue</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='subject'>Subject</Label>
              <Input
                type='text'
                name='subject'
                id='issue'
                placeholder='Subject'
                className='mb-2'
                onChange={e =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              <Label for='description'>Description</Label>
              <Input
                type='textarea'
                name='description'
                id='issue'
                placeholder='Description'
                className='mb-2'
                onChange={e =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              <Label for='severity'>Severity</Label>
              <Input
                type='number'
                name='severity'
                id='issue'
                placeholder='1'
                className='mb-2'
                min={1}
                max={3}
                onChange={e =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Issue
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default IssueModal
