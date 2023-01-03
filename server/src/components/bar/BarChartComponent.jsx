import "./chart.scss";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";



const BarChartComponent = ({title, data, barColor}) => {
 


  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
      <BarChart
      width={400}
      height="100%"
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
