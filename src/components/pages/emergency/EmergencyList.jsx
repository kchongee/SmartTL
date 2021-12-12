import React,{useEffect,useState} from 'react';
import { Container, Col, Row, Badge} from 'react-bootstrap';
import {get,query,onValue,ref,off} from "firebase/database";

import {db} from "../../../firebase";
import ComponentsTable from "../../table/ComponentsTable";
import {convertObjArrTimestamp, convertObjToObjArr, convertToFullDateString, convertToDayRangeString} from "../../../conversion";

export default function EmergencyList() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },        
        { field: 'Ambulance passing', headerName: 'Ambulance passing Date & Time', width: 400},        
    ];

    const [ambulanceData,setAmbulanceData] = useState([]);           

    useEffect(() => {                           
        const ambulanceDataRef = ref(db,"/Ambulance Data");    
        const getData = () => {
            const ambulanceDataListener = onValue(ambulanceDataRef,(snapshot)=>{            
                const objArr = convertObjToObjArr(snapshot.val(),"id");                    
                const addedIDObjArr = objArr.map((obj,index)=>{                                        
                    return {
                        ...obj,                        
                        "id":index+1,
                        "Ambulance passing": convertToFullDateString(new Date(obj["Ambulance passing"])) +", "+ convertToDayRangeString(new Date(obj["Ambulance passing"]))
                    }
                });                              
                setAmbulanceData(addedIDObjArr);
            });            
        }

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
                        <h3>Ambulance Passing Date Time</h3>
                        <ComponentsTable key="Ambulance" data={ambulanceData} cols={columns} height="550px"/>
                    </Col>
                </Row>                
            </Container>
        </>
    )
}
