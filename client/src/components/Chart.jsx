import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

// const data = [
//     {
//       name: 'Jan',
//       pv: 2400,
//     },
//     {
//       name: 'Feb',
//       pv: 1398,
//     },
//     {
//       name: 'March',
//       pv: 9800,
//     },
//     {
//       name: 'May',
//       pv: 3908,
//     },
//     {
//       name: 'June',
//       pv: 4800,
//     },
//     {
//       name: 'July',
//       pv: 3800,
//     },
//     {
//       name: 'Aug',
//       pv: 4300,
//     },
//     {
//       name: 'Sept',
//       pv: 4300,
//     },
//     {
//       name: 'Oct',
//       pv: 4300,
//     },
//     {
//       name: 'Nov',
//       pv: 4300,
//     },
//     {
//       name: 'Dec',
//       pv: 4300,
//     },
//   ];
  
const Chart = ({stroke, color, data}) => {
    return (
      <ResponsiveContainer width={1200} height={400}>
        <LineChart data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Total Sales" stroke="#8884d8" />
        </LineChart>
    </ResponsiveContainer>

      );
}

export default Chart