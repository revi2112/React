import React from "react";
import { Toast } from "react-bootstrap";

function ToastMesage(props){

    return(
        <Toast 
        show = {props.show}
        onClose={props.onClose}
        delay={3000}
        autohide
        bg={props.toastVariant}
        style={{
            position: 'fixed',
            top: 20,
            right: 20,   // 👈 This places it at the top right
            zIndex: 9999,
            minWidth: '250px',
          }}
        >
        <Toast.Body>{props.errorMsg}</Toast.Body>
        </Toast>
    )
}

export default ToastMesage;