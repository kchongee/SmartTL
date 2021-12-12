import React from 'react'
import "./widgetSm.css"
import {Visibility} from "@mui/icons-material"

export default function WidgetSm() {
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Camera Status</span>
            <ul className="widgetSmList">
                <li className="widgetSmListItem">
                    <img className="widgetSmImg" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" alt="pic"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Dwayne Johnson</span>
                        <span className="widgetSmUserTitle">Software Engineer</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Display
                    </button>                    
                </li>
                <li className="widgetSmListItem">
                    <img className="widgetSmImg" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" alt="pic"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Dwayne Johnson</span>
                        <span className="widgetSmUserTitle">Software Engineer</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Display
                    </button>                    
                </li>
                <li className="widgetSmListItem">
                    <img className="widgetSmImg" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" alt="pic"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Dwayne Johnson</span>
                        <span className="widgetSmUserTitle">Software Engineer</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Display
                    </button>                    
                </li>
            </ul>
        </div>
    )
}
