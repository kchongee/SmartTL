import React,{useState} from 'react'
import {Toast} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./topbar.css";

export default function MyToast({title,timestamp}) {

    const navigate = useNavigate();

    const [showToast,setShowToast] = useState(true);

    const clickToast = () => {
        navigate("/notification");
        closeToast();
    }

    const closeToast = () => {
        setShowToast(false)
    }

    return (
        <Toast autohide delay={3000} show={showToast} onClose={closeToast} onClick={clickToast} className="clickable">
            <Toast.Header closeButton={false}>                
                <strong className="me-auto">Notification</strong>
                <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>
                <span>{title}</span>
                <small>{timestamp}</small>
            </Toast.Body>
        </Toast>
    )
}
