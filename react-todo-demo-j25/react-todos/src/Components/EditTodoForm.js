import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, Form, Button } from 'react-bootstrap';


function EditTodoForm(props) {

    const [description, setDescription] = useState('');
    const [assigned, setAssigned] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
  
    useEffect(() => {
      if (props.todo) {
        setDescription(props.todo.rowDescription || '');
        setAssigned(props.todo.rowAssigned || '');
        setPriority(props.todo.priority || '');
        setStatus(props.todo.status || '');
      }
    }, [props.todo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated_todo = {
            ...props.todo,
            rowAssigned : assigned,
            rowDescription: description,
            priority: priority,
            status: status
        };
        props.edit_todo(updated_todo, props.todo.rowNumber);
        props.onClose();
    };
    return (
        <div>
            <Modal show={props.show} onHide={props.onClose} centered>
                <ModalHeader>
                    Edit Your Todo
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Assigned</Form.Label>
                            <Form.Control value={assigned} onChange={(e) => setAssigned(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Priority</Form.Label>
                            <Form.Control value={priority} onChange={(e) => setPriority(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} required>
                                <option value="">Select</option>
                                <option>Yet to Start</option>
                                <option>In Progress</option>
                                <option>Done</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-between mt-4">
                            <Button variant="secondary" onClick={props.onClose}>Cancel</Button>
                            <Button variant="primary" type="submit">Update Todo</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default EditTodoForm