import React,{useState,useEffect} from 'react'
import {NotificationsNone,Traffic,PermIdentity,Settings,ViewSidebar,Logout} from '@mui/icons-material';
import {NavLink,useNavigate} from "react-router-dom";
import {Navbar,Nav,NavDropdown,Container,Offcanvas,Button,Badge,OverlayTrigger,Tooltip,ToastContainer} from 'react-bootstrap';
import MyToast from './MyToast';
import {db} from "../../firebase";
import {ref,onValue,onChildAdded,off, onChildChanged} from "firebase/database";
import Sidebar from '../sidebar/Sidebar';
import { convertObjToObjArr, extractObjValToArr, convertObjArrTimestamp, findValuesInObjArray } from '../../conversion';
import {sum} from "../../statistics";
import "./topbar.css"

export default function Topbar({appName,user,logoutUserHandler}) {   
    
    const navigate = useNavigate();

    const logoutButtonClick = () => {        
        logoutUserHandler();
        navigate("/");
    }
    
    const [unreadNotificationsCount,setUnreadNotificationsCount] = useState(0);
    const [unreadNotifications,setUnreadNotifications] = useState([]);    
    

    useEffect(()=>{         
        const notificationsRef = ref(db,"Notifications/notification");
        const getData = () => {
            const notificationOnValueListener = onValue(notificationsRef,(snapshot) => { 
                if(snapshot.exists()){                            
                    const notificationArray = convertObjToObjArr(snapshot.val());
                    setUnreadNotificationsCount(sum(extractObjValToArr(convertObjArrTimestamp(notificationArray),"unread")));                    
                    setUnreadNotifications(
                        findValuesInObjArray(convertObjArrTimestamp(notificationArray),"unread",true)
                    );
                }
            });  
            // const notificationOnChangeListener = onChildAdded(notificationsRef,(snapshot) => {                  
            //     if(snapshot.exists()){                                  
            //         setUnreadNotifications(
            //             snapshot.val()
            //         );
            //     }
            // });  
        }             

        // return () => {
        //     // off(notificationsOnValueListener,"value",()=>{
        //     //     console.log("removed");
        //     // });
        //     // off(notificationsOnChildAddedListener,"child_added",()=>{
        //     //     console.log("removed");
        //     // });

            
        //     // notificationsRef.off(eventType="value", notificationsOnValueListener);
        //     // notificationsRef.off("on");
        // }

        const unsubscribe = getData();
        return unsubscribe
    },[]);   

    return (        
        <>
            <Navbar bg="light" expand="sm" sticky="top">
                <Container fluid>                    
                    <Navbar.Brand as="div" className="d-flex">
                        <NavLink to="/" className="logo">
                            <span>{appName}</span>
                            <Traffic className="logoIcon"/>
                        </NavLink>                        
                    </Navbar.Brand>                                        
                    <Navbar.Toggle aria-controls="navbarScroll" />                    
                    <Navbar.Collapse id="navbarScroll">                        
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >                                                                                                   
                        </Nav>                        
                        <Nav>   
                            {user &&    
                                <OverlayTrigger
                                    key="notifications"
                                    placement="bottom"
                                    overlay={
                                        <Tooltip id="notifications">
                                            <strong>Notifications</strong>
                                        </Tooltip>
                                    }
                                >
                                    <Nav.Link as="li" className="topbarIconContainer">           
                                        <NavLink to="/notification">
                                            <NotificationsNone/>
                                            {unreadNotificationsCount!==0 && (
                                                <Badge pill bg="danger" text="light" className="topIconBadge">
                                                    {unreadNotificationsCount}
                                                </Badge>
                                            )}                                            
                                        </NavLink>
                                    </Nav.Link>    
                                </OverlayTrigger>                                                                                                          
                            }
                            <OverlayTrigger
                                key="adminLogin"
                                placement="bottom"
                                overlay={
                                    <Tooltip id="admin-login">
                                        <strong>{user ? "Logout" : "Admin Login"}</strong>
                                    </Tooltip>
                                }
                            >
                                <Nav.Link as="li" className="topbarIconContainer">
                                    {
                                        user ?
                                            <Button
                                                size="sm"
                                                variant="primary"                                            
                                                onClick={logoutButtonClick}
                                                >
                                                Logout <Logout/>
                                            </Button>                                             
                                        :
                                            <NavLink to="/login">
                                                <PermIdentity /> 
                                            </NavLink>                             
                                    }                                    
                                </Nav.Link> 
                            </OverlayTrigger>                            
                        </Nav>                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{zIndex:1,position:"fixed",bottom:0,left:0}} className="col-12 col-md-4">
                <ToastContainer position="bottom-start" className="p-3">
                    {unreadNotifications?.map((obj,index)=>{
                        return <MyToast key={`toast-${index}`} title={obj["title"]} timestamp={obj["malf_timestamp"]}/>
                    })}
                </ToastContainer>
            </div>            
        </>
    )
}
