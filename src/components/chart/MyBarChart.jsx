import { height } from '@mui/system';
import React, { useEffect } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import {convertObjToObjArr} from "../../conversion";
import "./chart.css"

// {title, data, dataKey}
export default function MyLineChart({data,title,xDataKey,yDataKey,xLabel,yLabel,legend,barDataKey}) {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#f762e7', '#b888d6', '#823c58', '#9303aa', '#12f09b'];

    const d = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400,
          "amt": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398,
          "amt": 2210
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800,
          "amt": 2290
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908,
          "amt": 2000
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800,
          "amt": 2181
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800,
          "amt": 2500
        },        
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        }
    ]    

    const convertData = (data) => {      
      var newData = []

      Object.keys(data).map((key, index) => {        
        newData.push({...data[key],"road":key});
      });      
      
      return newData
    }    
        
    
    return (
      <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="99%" height={400}>                    
          <BarChart data={convertObjToObjArr(data,xDataKey)}>
            <Tooltip isAnimationActive={false}/>
            {legend ? <Legend verticalAlign="top" height={36}/> : null}
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={xDataKey} label={{value:xLabel, position:"insideBottom",dy:9}}/>
            <YAxis label={{value:yLabel, position:"insideLeft", angle:-90, dy:-5, dx:5}}/>              
            <Bar dataKey={barDataKey} fill="#00a0fc">
              { data.length>0 ? data.map((entry, index) => 
                  <Cell key={`bar-cell-${index}`} fill={COLORS[index]} />
                ) : ""              
              }
            </Bar>
            {/* <Bar dataKey={barDataKeys} fill="black"/> */}
            {/* {barDataKeys.map((d,index)=>{
              console.log(d);
              return <Bar dataKey={d} x={yDataKey} y={xDataKey} fill={COLORS[index]}/>
            })}             */}
          </BarChart>          
        </ResponsiveContainer>                          
      </div>
    )
}
