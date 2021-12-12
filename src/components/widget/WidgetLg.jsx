import React from 'react'
import "./widgetLg.css"

export default function WidgetLg() {

    const Button = ({type}) => {
        return <button className={"widgetLgButton"+type}>{type}</button>
    }

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">
                <table className="widgetLgTable">
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Name</th>
                        <th className="widgetLgTh">Status</th>
                        <th className="widgetLgTh">Action</th>
                    </tr>
                    <tr className="widgetLgTr">
                        <td className="widgetLgDate">Date</td>
                        <td className="widgetLgName">light_sensor1</td>
                        <td className="widgetLgStatus">Off</td>
                        <td className="widgetLgAction">
                            <Button type="On"/>
                        </td>
                    </tr>
                    <tr className="widgetLgTr">
                        <td className="widgetLgDate">Date</td>
                        <td className="widgetLgName">light_sensor2</td>
                        <td className="widgetLgStatus">On</td>
                        <td className="widgetLgAction">
                            <Button type="Off"/>
                        </td>
                    </tr>
                </table>
            </h3>
        </div>
    )
}
