import React,{useState, useEffect} from 'react'
import {Alert} from "react-bootstrap"
import BoostrapContainer from "react-bootstrap/Container"
import { NavLink, useNavigate } from 'react-router-dom';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from '@mui/material';
import {LockOutlined, Traffic, ArrowBack} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./login.css"

const theme = createTheme();

export default function Login({loginUserHandler}) {

    const [showAlert,setShowAlert] = useState(false);
    const [showLoading,setShowLoading] = useState(false);

    let navigate = useNavigate();  

    useEffect(()=>{        
        const timer = setTimeout(() => {
          setShowAlert(false);
        }, 3000);

        return () => clearTimeout(timer);
    },[showAlert]);

    const handleSubmit = (event) => {
        setShowAlert(false);
        setShowLoading(true);
        event.preventDefault();        
        const data = new FormData(event.currentTarget);

        // // eslint-disable-next-line no-console
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });               
        loginUserHandler(data.get('email'),data.get('password'))
            .then((isUser)=>{                            
                navigate("/");                
                setShowLoading(false);                
            })
            .catch((err)=>{        
                setShowLoading(false);
                setShowAlert(true);
            });
    };    

    return (
        <div className="login">             
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >                           
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                autoFocus                                
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"                                
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}                                
                            >
                                Sign In
                            </Button>                                 
                            <NavLink to="/" variant="body2" style={{textDecoration:"none"}}>
                                <ArrowBack/>Back
                            </NavLink>                                                
                        </Box>
                    </Box>
                    {showAlert &&                 
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible className="mt-4">                
                            <span>Login Failed! Please try again..</span>
                        </Alert>
                    }
                    {showLoading &&
                        <Alert variant="primary" onClose={() => setShowAlert(false)} dismissible className="mt-4">                
                            <span>Loading...</span>
                        </Alert>
                    }
                </Container>
            </ThemeProvider>
        </div>
    )
}
