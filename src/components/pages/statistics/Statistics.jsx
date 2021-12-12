import React,{useEffect,useState} from 'react'
import {Table} from "react-bootstrap";
import {Accordion,AccordionSummary,AccordionDetails,Typography} from '@mui/material';
import {ExpandMore} from '@mui/icons-material';
import { get,ref,onValue,off} from '@firebase/database';
import {db} from "../../../firebase"
import "./statistics.css";
import AccordianTable from '../../table/AccordianTable';
import {asc,uniques,filterNonUniqueBy,convertObjToObjArr,extractObjValToArr,convertObjArrTimestamp} from "../../../conversion";
import {sum,average,median,mode,firstQuartile,secondQuartile,thirdQuartile,variance,standardDeviation} from "../../../statistics";

export default function Statistics() {        
    
    const [road1Data,setRoad1Data] = useState([]);
    const [road2Data,setRoad2Data] = useState([]);
    const [road3Data,setRoad3Data] = useState([]);

    const road1Ref = ref(db,"/Traffic Data/TL001");
    const getData = () => {
        const road1Listener = onValue(road1Ref,(snapshot) => { 
            if(snapshot.exists()){                
                const childSnapShot = convertObjToObjArr(snapshot.val());                             
                const carCountArr = extractObjValToArr(childSnapShot,"Total");             
                setRoad1Data([
                    {
                        total: sum(carCountArr),
                        mean: average(carCountArr),
                        mode: mode(carCountArr),
                        q1: firstQuartile(carCountArr),
                        median: median(carCountArr),
                        q3: thirdQuartile(carCountArr),
                        variance: variance(carCountArr),
                        std: standardDeviation(carCountArr),                        
                    }
                ]);
            }
        });

        const road2Ref = ref(db,"/Traffic Data/TL002");                
        const road2Listener = onValue(road2Ref,(snapshot) => {          
            if(snapshot.exists()){     
                const childSnapShot = convertObjToObjArr(snapshot.val());
                const carCountArr = extractObjValToArr(childSnapShot,"Total");             
                setRoad2Data([
                    {
                        total: sum(carCountArr),
                        mean: average(carCountArr),
                        mode: mode(carCountArr),
                        q1: firstQuartile(carCountArr),
                        median: median(carCountArr),
                        q3: thirdQuartile(carCountArr),
                        variance: variance(carCountArr),
                        std: standardDeviation(carCountArr),                        
                    }
                ]);
            }
        });

        const road3Ref = ref(db,"/Traffic Data/TL003");
        const road3Listener = onValue(road3Ref,(snapshot) => {    
            if(snapshot.exists()){        
                const childSnapShot = convertObjToObjArr(snapshot.val()); 
                const carCountArr = extractObjValToArr(childSnapShot,"Total");             
                setRoad3Data([
                    {
                        total: sum(carCountArr),
                        mean: average(carCountArr),
                        mode: mode(carCountArr),
                        q1: firstQuartile(carCountArr),
                        median: median(carCountArr),
                        q3: thirdQuartile(carCountArr),
                        variance: variance(carCountArr),
                        std: standardDeviation(carCountArr),                        
                    }
                ]);
            }
        });        
    }

    useEffect(()=>{                        
        // return () => {
        //     off(road1Listener,"value")
        //     off(road2Listener,"value")
        //     off(road3Listener,"value")
        // }

        const unsubscribe = getData();
        return unsubscribe
    },[]);

    return (   
        <>     
            <Accordion className="mb-3">
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Roads</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccordianTable data={road1Data} title="Road 1"/>  
                    <AccordianTable data={road2Data} title="Road 2"/>  
                    <AccordianTable data={road3Data} title="Road 3"/>  
                </AccordionDetails>
            </Accordion>
            {/* <Accordion className="mb-3">
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Roads</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccordianTable columns={cols} data={rows} title="Road 1"/>  
                    <AccordianTable columns={cols} data={rows} title="Road 2"/>  
                    <AccordianTable columns={cols} data={rows} title="Road 3"/>  
                </AccordionDetails>
            </Accordion>
            <Accordion className="mb-3">
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Roads</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccordianTable columns={cols} data={rows} title="Road 1"/>  
                    <AccordianTable columns={cols} data={rows} title="Road 2"/>  
                    <AccordianTable columns={cols} data={rows} title="Road 3"/>  
                </AccordionDetails>
            </Accordion>        */}
        </>
    )
}
