import React,{useState,useEffect} from 'react'
import {ref,onValue,child,get,push,update, goOffline,onDisconnect,off} from "firebase/database"
import {Container,Row,Col} from 'react-bootstrap';
import {convertObjToObjArr,extractObjValToArr,convertObjArrTimestamp} from "../../../conversion";
import {sum,calcRateChange} from "../../../statistics";

import {db,auth} from "../../../firebase"
import FeaturedInfo from '../../featureInfo/FeaturedInfo'
import {MyLineChart,MyPieChart,MyBarChart} from '../../chart/Chart'
import WidgetSm from '../../widget/WidgetSm'
import WidgetLg from '../../widget/WidgetLg'

import "./home.css"

const featureInfoInit = {
    title: "",
    currValue: 0,
    rateChange: 0
}

export default function Home() {    
    const [carCountRoad1,setCarCountRoad1] = useState([]);
    const [carCountRoad2,setCarCountRoad2] = useState([]);
    const [carCountRoad3,setCarCountRoad3] = useState([]);
    const [featureInfoRoad1,setFeatureInfoRoad1] = useState(featureInfoInit);
    const [featureInfoRoad2,setFeatureInfoRoad2] = useState(featureInfoInit);
    const [featureInfoRoad3,setFeatureInfoRoad3] = useState(featureInfoInit);
    const [carCountRoadAllLatest,setCarCountRoadAllLatest] = useState([]);         
    const [carTurningCountAll,setCarTurningCountAll] = useState({});
    const [carTurningCountTimeSeries,setCarTurningCountTimeSeries] = useState([]);    

    function writeNewPost(carCount,timestamp) {          
        // A post entry.
        const postData = {
          carCount: carCount,
          timestamp: timestamp
        };
      
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), '/Traffic Data/TL001')).key;
      
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/Traffic Data/TL001/' + newPostKey] = postData;        
      
        return update(ref(db), updates);
    }    

    const road1Ref = ref(db,"/Traffic Data/TL001");
        const road2Ref = ref(db,"/Traffic Data/TL002");                        
        const road3Ref = ref(db,"/Traffic Data/TL003");
        
        const getData = () => {
            const road1Listener = onValue(road1Ref,(snapshot) => {            
                if(snapshot.exists()){                                                
                    const childSnapShot = convertObjToObjArr(snapshot.val());                
                    const convertedTimestampArray = convertObjArrTimestamp(childSnapShot);                
                    setCarCountRoad1(convertedTimestampArray);
                    setCarCountRoadAllLatest(prev => {
                        return {
                            ...prev,
                            "road1": convertedTimestampArray.slice(-1)[0]
                        }
                    });                
                    const currValue = carCountRoad1.length ? carCountRoad1.slice(-1)[0]["Total"] : convertedTimestampArray.slice(-1)[0]["Total"]
                    const pastValue = carCountRoad1.length ? carCountRoad1.slice(-2)[0]["Total"] : convertedTimestampArray.slice(-2)[0]["Total"]                
                    setFeatureInfoRoad1({
                        currValue: currValue,
                        // rateChange: calcRateChange(currValue,pastValue)
                        rateChange: currValue - pastValue
                    });
    
                    // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
                    // const con = push(myConnectionsRef);
    
                    // When I disconnect, remove this device
                    // onDisconnect(con).remove();
    
                    // Add this device to my connections list
                    // this value could contain info about the device or a timestamp too
                    // set(con, true);
    
                    // When I disconnect, update the last time I was seen online
                    // onDisconnect(lastOnlineRef).set(serverTimestamp());
    
                }
            });

            const road2Listener = onValue(road2Ref,(snapshot) => {          
                if(snapshot.exists()){                     
                    const childSnapShot = convertObjToObjArr(snapshot.val());
                    const convertedTimestampArray = convertObjArrTimestamp(childSnapShot);                           
                    setCarCountRoad2(convertedTimestampArray);
                    setCarCountRoadAllLatest(prev => {
                        return {
                            ...prev,
                            "road2": convertedTimestampArray.slice(-1)[0]
                        }
                    });                  
                    const currValue = carCountRoad2.length ? carCountRoad2.slice(-1)[0]["Total"] : convertedTimestampArray.slice(-1)[0]["Total"]
                    const pastValue = carCountRoad2.length ? carCountRoad2.slice(-2)[0]["Total"] : convertedTimestampArray.slice(-2)[0]["Total"]                  
                    setFeatureInfoRoad2({
                        currValue: currValue,
                        // rateChange: calcRateChange(currValue,pastValue)
                        rateChange: currValue - pastValue
                    });              
                }
            });

            const road3Listener = onValue(road3Ref,(snapshot) => {    
                if(snapshot.exists()){        
                    const childSnapShot = convertObjToObjArr(snapshot.val()); 
                    const convertedTimestampArray = convertObjArrTimestamp(childSnapShot);                                
                    setCarCountRoad3(convertedTimestampArray);
                    setCarCountRoadAllLatest(prev => {
                        return {
                            ...prev,
                            "road3": convertedTimestampArray.slice(-1)[0]
                        }
                    });                      
                    const currValue = carCountRoad3.length ? carCountRoad3.slice(-1)[0]["Total"] : convertedTimestampArray.slice(-1)[0]["Total"]
                    const pastValue = carCountRoad3.length ? carCountRoad3.slice(-2)[0]["Total"] : convertedTimestampArray.slice(-2)[0]["Total"]                  
                    setFeatureInfoRoad3({
                        currValue: currValue,
                        // rateChange: calcRateChange(currValue,pastValue)
                        rateChange: currValue - pastValue
                    });
                }
            });
        }              

    useEffect(()=>{                          
                
        // const turningRef = ref(db,"/turning");                
        // const turningListener = onValue(turningRef,(snapshot) => {      
        //     if(snapshot.exists()){
        //         const childSnapShot = convertObjToObjArr(snapshot.val()); 
        //         const convertedTimestampArray = convertObjArrTimestamp(childSnapShot);           
        //         setCarTurningCountTimeSeries(convertedTimestampArray);

        //         const leftDirectionArr = extractObjValToArr(convertedTimestampArray,"left");
        //         const rightDirectionArr = extractObjValToArr(convertedTimestampArray,"right");            
        //         const totalLeft = leftDirectionArr.reduce((accumulator, curr) => accumulator + curr);
        //         const totalRight = rightDirectionArr.reduce((accumulator, curr) => accumulator + curr);
        //         setCarTurningCountAll([
        //             {
        //                 "direction": "left",
        //                 "Total": totalLeft
        //             },
        //             {
        //                 "direction": "right",
        //                 "Total": totalRight
        //             }
        //         ])
        //     }            
        // });                    

        // return () => {                        
        //     off(road1Listener,"value");
        //     off(road2Listener,"value");
        //     off(road3Listener,"value");
        // }
        const unsubscribe = getData();
        return unsubscribe
    },[]);      
    
    const sortTimestamp = (a,b) => {        
        return a["timestamp"] - b["timestamp"];
    }
    
    const handleLimitTimeRange = (arr,minTimestamp) => {                
        return arr.filter((item)=>{
            return item["timestamp"] >= minTimestamp;
        })        
    }   

    const handleLimitData = (arr,limitCount) => {                
        if(arr.length>limitCount){
            return arr.slice(1);
        }
        return arr
    }    

    return (    
        <Container>
            <Row className="mb-4">
                <Col>
                    <MyBarChart data={carCountRoadAllLatest} key="Road Traffic (Latest)" title="Road Traffic (Latest)" xDataKey="road" yDataKey="Total" xLabel="Road" yLabel="Traffic Count" legend barDataKey="Total"/>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={4} className="mb-2 my-md-none">
                    <FeaturedInfo data={featureInfoRoad1} title="Road 1"/>                    
                </Col>
                <Col md={4} className="mb-2 my-md-none">
                    <FeaturedInfo data={featureInfoRoad2} title="Road 2"/>                    
                </Col>
                <Col md={4} className="mb-2 my-md-none">
                    <FeaturedInfo data={featureInfoRoad3} title="Road 3"/>                    
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <MyLineChart data={carCountRoad1} key="Traffic count (Road1)" title="Traffic count (Road1)" xDataKey="timestamp" xLabel="Time" yLabel="Quantity" legend lineDataKeys={["Total","car","truck","motorbike","bus"]}/>
                </Col>
            </Row>    
            <Row className="mb-4">
                <Col>
                    <MyLineChart data={carCountRoad2} key="Traffic count (Road2)" title="Traffic count (Road2)" xDataKey="timestamp" xLabel="Time" yLabel="Quantity" legend lineDataKeys={["Total","car","truck","motorbike","bus"]}/>
                </Col>
            </Row>        
            <Row className="mb-4">
                <Col>
                    <MyLineChart data={carCountRoad3} key="Traffic count (Road3)" title="Traffic count (Road3)" xDataKey="timestamp" xLabel="Time" yLabel="Quantity" legend lineDataKeys={["Total","car","truck","motorbike","bus"]}/>
                </Col>
            </Row>            
            {/* <Row className="mb-4">
                <Col md={5}>                    
                    <MyPieChart data={carTurningCountAll} key="All Turning" title="All Turning" legend dataKey="carCount" label="direction"/>
                </Col>
                <Col md={7}>                    
                    <MyLineChart data={carTurningCountTimeSeries} key="Car turning count (Full time)" title="Car turning (Full time)" xDataKey="timestamp" xLabel="Time" yLabel="Quantity" legend lineDataKeys={["left","right"]}/>
                </Col>
            </Row>  */}
        </Container>                        
    )
}
