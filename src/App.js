import React,{useEffect,useState} from "react";
import {Offcanvas,Button,Container,Row,Col} from 'react-bootstrap';
import {ViewSidebar} from '@mui/icons-material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/pages/home/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './components/pages/userList/UserList';
import RealtimeDB from "./components/realtimeDB/RealtimeDB";
import ComponentList from "./components/pages/componentList/ComponentList";
import Statistics from "./components/pages/statistics/Statistics";
import Login from "./components/login/Login";
import {auth} from "./firebase";
import Notification from "./components/pages/notification/Notification";
import EmergencyList from "./components/pages/emergency/EmergencyList";

function App() {

  const appName = "SmartTL";  

  const [show,setShow] = useState(false);
  const [user,setUser] = useState(null);    

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const loginUserHandler = async (email,password) => {
    await signInWithEmailAndPassword(auth,email,password)
      .then((authUser)=>{ 
        console.log(authUser);
        setUser(authUser);
        return true;
      })
      .catch((err)=>{
        console.log(err);
        throw new Error(err);
      });
    return false;
  }

  const logoutUserHandler = () => {
    auth.signOut();
    setUser(null);
  }

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{      
      if(authUser){
        setUser(authUser);
      }      
    });    
  },[]);
  

  return (
    <Router>
      <div className="App">
        <Routes>
          {!user && <Route path="/login" element={<Login loginUserHandler={loginUserHandler}/>}></Route>}          
          <Route path="/" element={
            <>
              <Topbar appName={appName} user={user} logoutUserHandler={logoutUserHandler}/>              
              <div className="d-flex mt-2">                                          
                  {user && 
                    <>  
                      <Button variant="secondary" onClick={handleShow} className="d-lg-none btn-sidebar">
                        <ViewSidebar/>
                      </Button>
                      <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>{appName}</Offcanvas.Title>
                        </Offcanvas.Header>    
                        <Offcanvas.Body style={{overflowY:"hidden"}}>
                          <Sidebar handleClose={handleClose}/>
                        </Offcanvas.Body>         
                      </Offcanvas>                    
                    </>
                  }
                <Container fluid>
                  <Row>  
                    {
                      !user ?
                        <Col>
                          <Outlet/>
                        </Col>
                      : 
                        <>
                          <Col lg={3} xl={2}>            
                            <Sidebar className="d-none d-lg-block" top/>          
                          </Col>
                          <Col lg={9} xl={10}>
                            <Outlet/>
                          </Col>
                        </>
                    }                    
                  </Row>   
                </Container>               
              </div>
            </>
          }>
          <Route path="" element={<Home/>}></Route>
            {user && 
              <>
                <Route path="component" element={<ComponentList/>}></Route>
                <Route path="notification" element={<Notification/>}></Route>    
                <Route path="emergency" element={<EmergencyList/>}></Route>    
                <Route path="insight" element={<Statistics/>}></Route>    
                <Route path="firebase" exact element={<RealtimeDB/>}></Route>   
              </>
            }            
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
