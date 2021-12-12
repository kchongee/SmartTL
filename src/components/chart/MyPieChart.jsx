import React,{useEffect} from 'react'
import { ResponsiveContainer, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import "./chart.css"

// {title, data, dataKey}
export default function MyLineChart({data,title,legend,dataKey,label}) {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#f762e7', '#b888d6', '#823c58', '#9303aa', '#12f09b'];

    const d1 = [
      {
        "name": "Group A",
        "value": 400
      },
      {
        "name": "Group B",
        "value": 300
      },
      {
        "name": "Group C",
        "value": 300
      },
      {
        "name": "Group D",
        "value": 200
      },
      {
        "name": "Group E",
        "value": 278
      },
      {
        "name": "Group F",
        "value": 189
      },
      {
        "name": "Group F",
        "value": 19
      }
    ];
    const d2 = [
      {
        "name": "Group A",
        "value": 2400
      },
      {
        "name": "Group B",
        "value": 4567
      },
      {
        "name": "Group C",
        "value": 1398
      },
      {
        "name": "Group D",
        "value": 9800
      },
      {
        "name": "Group E",
        "value": 3908
      },
      {
        "name": "Group F",
        "value": 4800
      }
    ];    

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}          
        </text>
      );
    }        

    // const convertData = (data) => {                  
    //   var newData = []
    //   Object.keys(data).map((key, index) => {                
    //     newData.push({...data[key],"direction":key});
    //   });                 
    //   return newData
    // }    
    
    return (
      <div className="chart">
        <h3 className="chartTitle">{title}</h3>                
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            {legend ? <Legend formatter={(value, entry, index)=>entry.payload.payload.payload[`${label}`]} /> : null}
            <Tooltip isAnimationActive={false} formatter={(value, name, props)=>[value,props.payload[`${label}`]]}/>
            <Pie
              dataKey={dataKey}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
              paddingAngle={5}              
              innerRadius={40}    
              isAnimationActive={false}
            >
              {data.length>0?data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={`pie-cell-${index}`}/>):""}
            </Pie>            
          </PieChart>
        </ResponsiveContainer>                          
      </div>
    )
}
