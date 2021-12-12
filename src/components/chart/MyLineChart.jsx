import React, { useEffect } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Brush } from 'recharts';
import "./chart.css"

// {title, data, dataKey}
export default function MyLineChart({data,title,xDataKey,yDataKey,xLabel,yLabel,legend,lineDataKeys,varietyLine}) {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#f762e7', '#b888d6', '#823c58', '#9303aa', '#12f09b'];
    const LINETYPES = ['monotone', 'natural', 'monotoneX', 'monotoneY', 'step', 'stepBefore', 'stepAfter', 'basis', 'basisClosed', 'basisOpen', 'linear', 'linearClosed'];

    const d = [
        {date: '2017-02-01', roadA: 231, roadB: 100},
        {date: '2017-04-01', roadA: 453, roadB: 453},
        {date: '2017-16-01', roadA: 123, roadB: 123},
        {date: '2018-01-01', roadA: 234, roadB: 50},
        {date: '2018-04-01', roadA: 958, roadB: 200},
        {date: '2018-11-01', roadA: 163, roadB: 163},
        {date: '2018-11-02', roadA: 163, roadB: 900},
        {date: '2018-11-03', roadA: 163, roadB: 163},
        {date: '2018-11-04', roadA: 163, roadB: 300},
        {date: '2019-03-01', roadA: 293, roadB: 293},
        {date: '2019-10-01', roadA: 471, roadB: 471},
        {date: '2020-07-01', roadA: 881, roadB: 881},                
    ]
    
    return (
      <div className="chart">
        <h3 className="chartTitle">{title}</h3>                
        <ResponsiveContainer width="99%" height={400}>          
          <LineChart data={data}>
            <Tooltip isAnimationActive={false}/>
            {legend ? <Legend verticalAlign="top" height={36}/> : null}
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
            {lineDataKeys?.map((dataKey,index)=>{
              return <Line type={varietyLine?LINETYPES[index]:"monotone"} dataKey={dataKey} stroke={COLORS[index]} strokeWidth={2} key={`line-${index}`}/>
            })}
            {/* <Line type="monotone" dataKey={line1} stroke="#8884d8" strokeWidth={2}/> */}
            {/* <Line type="monotone" dataKey="roadB" stroke="limegreen" strokeWidth={2}/>             */}
            <XAxis dataKey={xDataKey} label={{value:xLabel, position:"insideBottom"}} height={40}/>
            <YAxis dataKey={yDataKey} label={{value:yLabel, position:"insideLeft", angle:-90, dy:-10, dx:5}}/>            
            <Brush dy={10}/>
          </LineChart>
        </ResponsiveContainer>                          
      </div>
    )
}
