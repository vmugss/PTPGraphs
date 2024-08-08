// //////////////////////////////// //////////////////////////////
// 3. ECarts - timeline using bar graphs
// //////////////////////////////// //////////////////////////////

import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const EChartsTimelineBar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize with initial data
    setData(generateRandomBar(true));

    // Update data every second
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = prevData.slice(1); // Remove the first data point
        newData.push(generateRandomBar(false));
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomBar = (initialData) => {
    const statuses = ['faulty', 'locked', 'listening'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const statusConfig = {
      faulty: { color: 'red', height: 150 },
      locked: { color: 'green', height: 50 },
      listening: { color: 'yellow', height: 100 }
    };
    const now = new Date();
    if (initialData) {
      const initialData = [];
      for (let i = -59; i <= 0; i++) {
        const timestamp = new Date(now.getTime() + i * 1000);
        initialData.push({
          name: status,
          value: [timestamp,statusConfig[status].height],
          itemStyle: {
            color: statusConfig[status].color
          }
        })
      } 
      return initialData;
     }    
    return {
      name: status,
      value: [now,statusConfig[status].height],
      itemStyle: {
        color: statusConfig[status].color
      }
    }
  };

  const options = {
    title: {
      text: 'Dynamic Bar Graph',
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (value) => {
          const date = new Date(value);
          return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 200, // Adjust max value according to your heights
    },
    series: [
      {
        data: data,
        type: 'bar',
        itemStyle: {
          borderRadius: [5, 5, 0, 0], // Rounded corners for bars
        }
      }
    ],
    animationDuration: 1000,
    animationEasing: 'linear',
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
      <ReactECharts option={options} />
    </div>
  );
};

export default EChartsTimelineBar;