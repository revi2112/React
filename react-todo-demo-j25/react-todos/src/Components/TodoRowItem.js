function TodoRowItem(props) {

    const todo = {
        rowNumber: props.rownumber,
        rowDescription: props.rowdesc,
        priority: props.rowpriority,
        rowAssigned: props.rowass,
        status: props.status
      };
      

    return (
        <tr>
            <th scope="row">{props.rownumber}</th>
            <td>{props.rowdesc}</td>
            <td>{props.rowpriority}</td>
            <td>{props.rowass}</td>
            {/* <td>  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={props.status} /></td> */}
            <td>{props.status}</td>
            <td>
                <button className="btn btn-danger" onClick={() => props.delete_todo(props.rownumber)}>
                    <i className="bi bi-trash"></i>
                </button>
            </td>
            <td>
                <button className="btn btn-secondary" onClick={() => {
                    props.onEdit(todo)
                }}>
                    <i className="bi bi-pencil"></i>
                </button>
            </td>
        </tr>
    )

}

export default TodoRowItem