import React,{useState,useEffect} from 'react'
import {db,auth} from "../../firebase"
import {ref,onValue,child,get,off} from "firebase/database"
import {signInWithEmailAndPassword } from "firebase/auth";
import ReactJson from 'react-json-view';
import "./realtimeDB.css"

export default function RealtimeDB() {
    const [data,setData] = useState({});
    
    // signInWithEmailAndPassword(auth, "kchongee@gmail.com", "zt/h!\!*B;{)8/U$")
    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log(user)
    //     // ...
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    // });    

    const allRef = ref(db,"/");
    const getData = () => {
        const allRefListener = onValue(allRef,(snapshot) => {
            // console.log(snapshot.val());
            setData(snapshot.val());               
        });        
    }

    useEffect(()=>{                
        
        // return ()=>{
        //     // off(allRefListener,"value");
        // }
        const unsubscribe = getData();
        return unsubscribe
    },[]);
    

    return (
        <ReactJson src={data} theme={"twilight"} iconStyle='square' collapsed="1" style={{padding:"10px"}}/>
        // <div className="realtimeDB" style={{overflow:"auto",height:"600px",backgroundColor:"#FFD580"}}>
        //     <pre style={{padding:"20px"}}>
        //         {JSON.stringify(data,null,2)}
        //     </pre>
        // </div>
    )
}
