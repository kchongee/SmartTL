import React,{useEffect,useState} from 'react';
import { Container, Col, Row, Badge} from 'react-bootstrap';
import {ThumbUpAlt,ThumbDownAlt} from '@mui/icons-material';
import {get,query,onValue,ref,off} from "firebase/database";

import {db} from "../../../firebase";
import Table from "../../table/Table";
import ComponentsTable from "../../table/ComponentsTable";
import {convertObjToObjArr,convertToFullDateString,convertToDayRangeString} from "../../../conversion";

export default function ComponentList() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'malf_timestamp', headerName: 'Mulfunction Date & Time', width: 200, renderCell:(params)=>{return params.value===0?"-":`${convertToFullDateString(new Date(params.value))}, ${convertToDayRangeString(new Date(params.value))}`}},
        { field: 'status', headerName: 'Status',  width: 100, renderCell:(params)=>{return params.value===1?<Badge bg="success"><ThumbUpAlt/></Badge>:<Badge bg="danger"><ThumbDownAlt/></Badge>}},
    ];

    const [trafficLight1,setTrafficLight1] = useState([]);    
    const [trafficLight2,setTrafficLight2] = useState([]);    
    const [trafficLight3,setTrafficLight3] = useState([]);   
    
    const trafficLight1Ref = ref(db,"/TrafficLights/TL001");
    const trafficLight2Ref = ref(db,"/TrafficLights/TL002");
        const trafficLight3Ref = ref(db,"/TrafficLights/TL003");
    const getData = () => {
        const trafficLight1Listener = onValue(trafficLight1Ref,(snapshot)=>{            
            const objArr = convertObjToObjArr(snapshot.val(),"name").slice(0,-2);
            console.log(objArr);
            const addedIDObjArr = objArr.map((obj,index)=>{
                return {...obj,"id":index+1}
            });
            setTrafficLight1(addedIDObjArr);
        });
        
        const trafficLight2Listener = onValue(trafficLight2Ref,(snapshot)=>{            
            const objArr = convertObjToObjArr(snapshot.val(),"name").slice(0,-2);
            console.log(objArr);
            const addedIDObjArr = objArr.map((obj,index)=>{
                return {...obj,"id":index+1}
            });
            setTrafficLight2(addedIDObjArr);
        });
        
        const trafficLight3Listener = onValue(trafficLight3Ref,(snapshot)=>{            
            const objArr = convertObjToObjArr(snapshot.val(),"name").slice(0,-2);
            console.log(objArr);
            const addedIDObjArr = objArr.map((obj,index)=>{
                return {...obj,"id":index+1}
            });
            setTrafficLight3(addedIDObjArr);
        });
    }

    useEffect(() => {                           
        

        // return () => {
        //     off(trafficLight1Listener,"value");
        //     off(trafficLight2Listener,"value");
        //     off(trafficLight3Listener,"value");
        // }
        const unsubscribe = getData();
        return unsubscribe
    }, [])

    return (
        <>
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h3>TrafficLight 1</h3>
                        <ComponentsTable key="TrafficLight 1" data={trafficLight1} cols={columns} height="235px"/>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <h3>TrafficLight 2</h3>
                        <ComponentsTable key="TrafficLight 2" data={trafficLight2} cols={columns} height="235px"/>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <h3>TrafficLight 3</h3>
                        <ComponentsTable key="TrafficLight 3" data={trafficLight3} cols={columns} height="235px"/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
