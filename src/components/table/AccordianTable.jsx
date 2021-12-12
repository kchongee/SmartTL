import React from 'react'
import {Table} from "react-bootstrap";
import {Accordion,AccordionSummary,AccordionDetails,Typography} from '@mui/material';
import {ExpandMore} from '@mui/icons-material';

export default function AccordianTable({title,data}) {

    const cols = [        
        {title:"Total"},
        {title:"Mean / Avg."},        
        {title:"Mode"},
        {title:"Q1 (25%)"},
        {title:"Median (50%)"},
        {title:"Q3 (75%)"},        
        {title:"Variance"},     
        {title:"Standard Deviation"},     
    ]

    const rows = [
        {            
            total: 2,
            mean: 2,
            mode: 2,
            q1: 2,
            median: 2,
            q3: 2,
            variance: 2,
            std: 2,            
        },
        {            
            total: 2,
            mean: 2,
            mode: 2,
            q1: 2,
            median: 2,
            q3: 2,
            variance: 2,
            std: 2,            
        },
        {            
            total: 2,
            mean: 2,
            mode: 2,
            q1: 2,
            median: 2,
            q3: 2,
            variance: 2,
            std: 2,            
        }        
    ]
    
    return (       
        <Table striped bordered hover responsive className="mb-5">
            <thead>
                <tr>
                    <th colSpan={cols.length} className="bg-dark text-light">{title}</th>
                </tr>
                <tr>
                    {cols.map((obj,index)=>{
                        return <th key={`th-${index}`} style={{color:"#666666"}}>{obj.title}</th>
                    })}                            
                </tr>
            </thead>
            <tbody>
                {
                    data.map((obj,index)=>{
                        return (
                            <tr key={`tr-${index}`}>
                                {
                                    Object.keys(obj).map((key,ind)=>{
                                        if(typeof obj[key] === 'object' && obj[key] !== null){
                                            if(obj[key]["count"]<=0){
                                                return <td key={`tr-${index}-td-${ind}`} style={{color:"#878787"}}> - </td>
                                            }
                                            return (
                                                <td key={`tr-${index}-td-${ind}`} style={{color:"#878787"}}>
                                                    {
                                                        Object.keys(obj[key]).map((k,i)=>{                                                            
                                                            return (
                                                                <div key={`tr-${index}-td-${ind}-div-${i}`}>
                                                                    <span >
                                                                        {k}: {JSON.stringify(obj[key][k],null,1)}
                                                                    </span>
                                                                    {i!==Object.keys(obj[key]).length && <br/>}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>                                                
                                            ) 
                                        }
                                        return <td key={`tr-${index}-td-${ind}`} style={{color:"#878787"}}>{obj[key]}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }                        
            </tbody>
        </Table>            
    )
}
