import React from 'react'
import {Alert, Button} from "react-bootstrap"

export default function NotificationAlert({title,message,date,unread}) {
    return (
        <Alert variant={unread?"primary":"light"} style={{boxShadow:unread?"":"0 0 4px -2px #000000"}}>            
            <Alert.Heading>{title}</Alert.Heading>                        
            {/* <span>{message}</span><br/>             */}
            <span style={{fontSize:"14px",textAlign:"right"}}>{date}</span>
            {/* <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                    Close me y'all!
                </Button>
            </div> */}
        </Alert>                
    )
}
