import TodoRowItem from "./TodoRowItem"

function TodoTable(props){

    return(
        <table className = 'table table-hover'>
        <thead>
          <tr>
            <th scope = 'col'>#</th>
            <th scope = 'col'>Description</th>
            <th scope = 'col'>Priority</th>
            <th scope = 'col'>Assigned</th>
            <th scope = 'col'>status</th>
            <th scope = 'col'>Delete Row</th>
            <th scope = 'col'>Edit Row</th>

          </tr>
        </thead>
        <tbody>
          

          {props.todo_list.map(todo => (
            <TodoRowItem
            key={todo.rowNumber}
            rownumber = {todo.rowNumber}
            rowdesc = {todo.rowDescription}
            rowpriority = {todo.priority}
            rowass = {todo.rowAssigned}
            status = {todo.status}
            delete_todo = {props.delete_todo}
            onEdit={props.onEdit}
            />
          ))}
    
        </tbody>
      </table>
    )
}

export default TodoTable