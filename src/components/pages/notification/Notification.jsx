import React,{useState,useEffect} from 'react'
import {db} from "../../../firebase"
import {ref,onValue,update,get,child,set,off} from "firebase/database"
import { convertObjToObjArr, convertObjArrTimestamp, convertToFullDateString, convertToDayRangeString } from '../../../conversion';
import "./notification.css"
import NotificationAlert from './NotificationAlert'

export default function Notification() {

    const [notficationData,setNotificationData] = useState([]);

    const readNotifications = (notification) => {    
        set(ref(db, '/Notifications'), {
            notification,
            unread: false
        });
    }       

    const readNotification = (obj) => {
        set(ref(db, '/Notifications/notification/' + obj["id"]), {
            ...obj,
            id: null,
            unread: false
        });
    }     

    useEffect(()=>{                                           
        const notificationRef = ref(db,"Notifications/notification");
        const getData = () => {
            const notificationListener = get(child(notificationRef,"/"))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    readNotifications(snapshot.val());
                    const childSnapShot = convertObjToObjArr(snapshot.val());                    
                    const convertedTimestampArray = childSnapShot.map((obj) => {
                        readNotification(obj);
                        return {
                            ...obj,
                            "timestamp": convertToFullDateString(new Date(obj["timestamp"])) + " , " + convertToDayRangeString(new Date(obj["timestamp"]))
                        }
                    });                    
                    setNotificationData(convertedTimestampArray);                    
                }
            }).catch((error)=>{
                console.error(error);
            })     
        }
        
        const unsubscribe = getData();
        return unsubscribe
    },[]);

    return (
        <>
            {
                notficationData?.reverse().map((obj,index)=>{
                    return <NotificationAlert key={`na-${index}`} title={obj["title"]} message="There is mulfunction led!!" date={obj["timestamp"]} unread={obj["unread"]}/>
                })
            }  
            { !notficationData.length && <span>There is no any notification yet</span>}
            {/* <NotificationAlert title="Red light from Light 2" message="There is mulfunction led!!" date="8 Dec 2021"/> */}
        </>    
    )
}
