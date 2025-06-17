import './App.css';
import TodoTable from './Components/TodoTable';
import React, { useState, useEffect } from 'react';
import NewTodoForm from './Components/NewTodoForm';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import EditTodoForm from './Components/EditTodoForm';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ToastMesage from './Components/ToastMesage';


function App() {

  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [showEditTodoForm, setShowEditTodoForm] = useState(false);
  const [showMoveTodoForm, setShowMoveTodoForm] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [successMsg, setSuccessMsg] = useState('Todo Moved Successfully');
  const [showToast, setShowToast] = useState(false);
  const [todo_list, setTodoList] = useState({
    '2025-06-16': [
      { rowNumber: 1, rowDescription: 'Feed puppy', priority: "high", rowAssigned: 'User One', status: "Yet to Start" },
      { rowNumber: 2, rowDescription: 'Water plants', priority: "high", rowAssigned: 'User Two', status: "Done" }
    ],
    '2025-06-17': [
      { rowNumber: 3, rowDescription: 'Make dinner', priority: "medium", rowAssigned: 'User One', status: "In Progress" },
      { rowNumber: 4, rowDescription: 'Charge phone battery', priority: "low", rowAssigned: 'User One', status: "Yet to Start" }

    ]
  });

  // const [todo_list, setTodoList] = useState([
  //   { rowNumber: 1, rowDescription: 'Feed puppy', priority: "high", rowAssigned: 'User One', status: "Yet to Start" },
  //   { rowNumber: 2, rowDescription: 'Water plants', priority: "high", rowAssigned: 'User Two', status: "Done" },
  //   { rowNumber: 3, rowDescription: 'Make dinner', priority: "medium", rowAssigned: 'User One', status: "In Progress" },
  // ])

  useEffect(() => {
    const dataKey = selectedDate.toISOString().split('T')[0];
    setVisibleTodos(todo_list[dataKey] || []);
  }, [selectedDate, todo_list]);

  const add_todo = (newTodo) => {
    const dataKey = selectedDate.toISOString().split('T')[0];
    const current_todos = todo_list[dataKey] || [];
    const rowNumber = todo_list[dataKey].length > 0
      ? Math.max(...todo_list[dataKey].map(t => t.rowNumber)) + 1
      : 1;

    const new_todo_toinsert = { rowNumber, ...newTodo }
    // todo_list.push(new_todo) // table doesn't get change thats when state comes into picture
    setTodoList({
      ...todo_list,
      [dataKey]: [...current_todos, new_todo_toinsert]
    })
  }

  const delete_todo = (toDeleteRownum) => {
    const dataKey = selectedDate.toISOString().split('T')[0];
    const filtered_rows = todo_list[dataKey].filter(todo => todo.rowNumber !== toDeleteRownum);
    setTodoList({
      ...todo_list,
      [dataKey] : filtered_rows,
    });
  }

  const edit_todo = (updated_todo, todo_rownum) => {
    const dataKey = selectedDate.toISOString().split('T')[0];
    const updatedRowNum = Number(todo_rownum);
    const updatedList = todo_list[dataKey].map((todo) =>
      todo.rowNumber === updatedRowNum ? { ...todo, ...updated_todo } : todo
    );
    setTodoList({
      ...todo_list,
      [dataKey] : updatedList,
    });
    };

  const handleEdit = (todo) => {
    setTodoToEdit(todo);
    setShowEditTodoForm(true);
  };

  const move_todo = () => {
    //"2025-06-17T22:30:52.123Z"
    //Tue Jun 17 2025 17:30:52 GMT-0500 (Central Daylight Time)

    const fromKey = fromDate.toISOString().split('T')[0];
    const toKey = toDate.toISOString().split('T')[0];

    const todo_to_migrate = (todo_list[fromKey] || []).filter(todo => todo.status !== 'Done');
    const todo_to_remain_from = (todo_list[fromKey] || []).filter(todo => todo.status === 'Done');

    const todo_to_key = [ ...(todo_list[toKey] || []), ...todo_to_migrate ]

    setTodoList(
      {
        ...todo_list,
        [fromKey]: todo_to_remain_from,
        [toKey]: todo_to_key
      }
    );

    setShowMoveTodoForm(false);
    setShowToast(true);
  }

  return (
    <div className="mt-5 container">
      <div className='card'>
        <div className='card-header'>
          <div className="d-flex justify-content-between">
            <h5 className="mb-0">Your Todo's</h5>
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className='card-body'>
          <TodoTable
            todo_list={visibleTodos} delete_todo={delete_todo} onEdit={handleEdit}
          />
          {/* <button className='btn btn-primary' onClick={() => setShowAddTodoForm(!showAddTodoForm)}> 
          {showAddTodoForm ? 'Close New Todo' : 'New Todo'}
          </button> */}
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={() => setShowAddTodoForm(true)}>
              Add New Todo
            </button>

            <button className="btn btn-primary" onClick={() => setShowMoveTodoForm(true)}>
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

          <EditTodoForm
            show={showEditTodoForm}
            edit_todo={edit_todo}
            // send todo that is clicked
            todo={todoToEdit}
            onClose={() => setShowEditTodoForm(false)}
          />
           <ToastMesage 
            show = {showToast}
            onClose = {()=> setShowToast(false)}
            errorMsg = {successMsg}
            toastVariant = {"success"}
            />
          {showMoveTodoForm &&
            <Modal show={true}
              onHide={() => setShowMoveTodoForm(false)}
              centered>
              <ModalHeader closeButton>
                <ModalTitle>Move Your Todo's</ModalTitle>
              </ModalHeader>

              <ModalBody>
                <div className='mb-3'>
                  <label>From Date:</label>
                  <DatePicker selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    className='from-control'
                  />
                </div>

                <div className='mb-3'>
                  <label> To Date:</label>
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    className='from-control'
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <button className='btn btn-primary' onClick={move_todo}>Move Todo</button>
                <button className='btn btn-secondary' onClick={() => setShowMoveTodoForm(false)}>Cancel</button>

              </ModalFooter>
            </Modal>
          }



        </div>
      </div>
    </div>
  );
}


export default App;