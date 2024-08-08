import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Utility function to generate initial data for 60 seconds
const generateInitialData = () => {
  const now = moment();
  return Array.from({ length: 60 }, (_, index) => ({
    time: now.clone().subtract(59 - index, 'seconds').format('mm:ss'),
    value: Math.floor(Math.random() * 100),
  }));
};

const DynamicLineChart = () => {
  const [data, setData] = useState(generateInitialData());
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newTime = moment(currentTime).add(1, 'seconds').format('mm:ss');
        const newData = [...prevData.slice(1), { time: newTime, value: Math.floor(Math.random() * 100) }];
        setCurrentTime(moment(currentTime).add(1, 'seconds'));
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time" 
          tickFormatter={tick => moment(tick, 'mm:ss').format('mm:ss')} 
          interval={0} // Ensure all labels are shown
          tick={{ fontSize: 10 }} // Adjust font size if necessary
          domain={['dataMin', 'dataMax']} // Keeps x-axis consistent
        />
        <YAxis />
        <Tooltip formatter={(value) => [`${value}`, 'Value']} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#8884d8" 
          activeDot={{ r: 8 }} 
          animationDuration={0}
          isAnimationActive={true} // Disable animation for smoother updates
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DynamicLineChart;
