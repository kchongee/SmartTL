import React,{useState,useEffect} from 'react'
import {ArrowDownward,ArrowUpward} from "@mui/icons-material"
import "./featuredInfo.css"


export default function FeaturedInfo({data,title}) {    

    const initTextColor = "black";

    const [textColor,setTextColor] = useState(initTextColor);

    const increaseColor = "red";
    const decreaseColor = "green";

    const RateChange = () => {
        if(data["rateChange"]>0){     
            // setTextColor(increaseColor);
            return (
                <span>
                    {data["rateChange"]}
                    <ArrowUpward className="featuredIcon" style={{color:increaseColor}}/>
                </span>
            )
        }else if(data["rateChange"]<0){            
            // setTextColor(decreaseColor);
            return (
                <span>
                    {data["rateChange"]}
                    <ArrowDownward className="featuredIcon" style={{color:decreaseColor}}/>
                </span>                
            )
        }
        return ""
    }    

    // useEffect(()=>{
    //     const changeTextColor = setTimeout(() => {
    //         setTextColor(initTextColor);
    //     }, 1000);        
      
    //     return () => clearInterval(changeTextColor);
    // },[textColor]);

    return (        
        <div className="featuredItem">
            <span className="featuredTitle">{title}</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney" style={{color:textColor}}>{data["currValue"]}</span>
                <span className="featuredMoneyRate">                     
                    <RateChange/>
                </span>                                
            </div>
            <small><i>compared to last few minutes</i></small>                                    
        </div>                            
    )
}
