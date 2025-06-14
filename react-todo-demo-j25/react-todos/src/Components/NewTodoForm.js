import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import ToastMesage from './ToastMesage';


function NewTodoForm(props) {

    // add event handler to capture the event

    const [description, setDescription] = useState('');
    const [assigned, setAssigned] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('danger');


    // const descChange = (event) => {
    //     setDescription(event.target.value) //typing valye
    // }

    // const assChange = (event) => {
    //    setAssigned(event.target.value) //typing valye
    // }

    const submitTodo = (e) => {
        e.preventDefault();

        // get the desc and ass and change the props 
        // to get the form data use state to store it
        if (!description || !assigned || !priority || !status) {
            setErrorMsg("All fields are required");
            setShowToast(true);
            return;
          }
       else {
            console.log("in submit")

            props.add_todo({ description: description, assigned: assigned, status: status, priority: priority });
            setAssigned('');
            setDescription('');
            setPriority('');
            setStatus('');
            props.closeForm();
        }



    }

    return (
        <div className='mt-1'>
        <ToastMesage 
            show = {showToast}
            onClose = {()=> setShowToast(false)}
            errorMsg = {errorMsg}
            toastVariant = {"danger"}
            />

            <form onSubmit={submitTodo}>
                <div>
                    <label className='form-label'>Assigned</label>
                    <input type='text' className='form-control'
                        value={assigned}
                        onChange={(e) => setAssigned(e.target.value)} ></input>
                </div>
                <div>
                    <label className='form-label'>Description</label>
                    <textarea
                        rows={3}
                        className='form-control'
                        
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    ></textarea>
                </div>
                <div>
                    <label className='form-label'>Priority</label>
                    <input type='text' className='form-control'
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)} ></input>
                </div>
                <div>
                    <label className='form-label'>Status</label>
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        
                    >
                        <option value="">Select status</option>
                        <option value="Yet to Start">Yet to Start</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button type="submit" className='mt-3 btn btn-primary'> Add Todo</button>
                <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={props.closeForm}>Cancel</button>
            </form>
        </div>
    )
}

export default NewTodoForm