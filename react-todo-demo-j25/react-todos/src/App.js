import logo from './logo.svg';
import './App.css';
import TodoTable from './Components/TodoTable';
import React, { useState } from 'react';
import NewTodoForm from './Components/NewTodoForm';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';

function App() {

  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [showEditTodoForm, setShowEditTodoForm] = useState(false);

  const [todo_list, setTodoList] = useState([
    { rowNumber: 1, rowDescription: 'Feed puppy', priority: "high", rowAssigned: 'User One', status: "Yet to Start" },
    { rowNumber: 2, rowDescription: 'Water plants', priority: "high", rowAssigned: 'User Two', status: "Done" },
    { rowNumber: 3, rowDescription: 'Make dinner', priority: "medium", rowAssigned: 'User One', status: "In Progress" },
    { rowNumber: 4, rowDescription: 'Charge phone battery', priority: "low", rowAssigned: 'User One', status: "Yet to Start" }
  ])

  const add_todo = (newTodo) => {
    console.log(newTodo)
    const rowNumber = todo_list.length > 0
     ? Math.max(...todo_list.map(t => t.rowNumber)) + 1
     : 1;
    
    const new_todo_toinsert = { rowNumber, ...newTodo }
    // todo_list.push(new_todo) // table doesn't get change thats when state comes into picture
    setTodoList([...todo_list, new_todo_toinsert])
    console.log(todo_list)
  }

  const delete_todo = (toDeleteRownum) => {
    console.log("delete called")
    let filtered_rows = todo_list.filter(todo => todo.rowNumber !== toDeleteRownum);
    console.log(filtered_rows);

    setTodoList(filtered_rows)

  }

  const edit_todo = (updated_todo, todo_rownum) => {

    console.log(updated_todo, todo_rownum)

    const updatedList = todo_list.map((todo)=>(
        todo.rowNumber == todo_rownum ? {...todo, ...updated_todo} : todo
    ));
    setTodoList(updatedList)
    setShowEditForm(false);

  }
  return (
    <div className="mt-5 container">
      <div className='card'>
        <div className='card-header'>
          Your Todo's
        </div>
        <div className='card-body'>
          <TodoTable todo_list={todo_list} delete_todo={delete_todo} edit_todo = {edit_todo}/>
          {/* <button className='btn btn-primary' onClick={() => setShowAddTodoForm(!showAddTodoForm)}> 
          {showAddTodoForm ? 'Close New Todo' : 'New Todo'}
          </button> */}
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={() => setShowAddTodoForm(true)}>
              Add New Todo
            </button>

            <button className="btn btn-primary" onClick={() => setShowAddTodoForm(true)}>
              Move Your Todo
            </button>
          </div>
          <Modal
            show={showAddTodoForm}
            onHide={() => setShowAddTodoForm(false)}
          >
            <ModalHeader closeButton>
              <ModalTitle>New Todo </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <NewTodoForm
                add_todo={add_todo}
                closeForm={() => setShowAddTodoForm(false)} />
            </ModalBody>
            <ModalFooter></ModalFooter>

          </Modal>

          <Modal
            show={showEditTodoForm}
            onHide={() => setShowEditTodoForm(false)}
          >
            <ModalHeader closeButton>
              <ModalTitle>Eidt Your Todo </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <EditTodoForm
                edit_todo={edit_todo}
                closeForm={() => setShowAddTodoForm(false)} />
            </ModalBody>
            <ModalFooter></ModalFooter>

          </Modal>
          {/* {showAddTodoForm && 
          <NewTodoForm add_todo = {add_todo} />}  */}

        </div>
      </div>
    </div>
  );
}


export default App;