// //////////////////////////////// //////////////////////////////
// // 2. Echarts timeline - hypnograph
// //////////////////////////////// //////////////////////////////


import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const EChartsTimelineLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize with initial data
    setData(generateData());

    // Update data every second
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = prevData.slice(1); // Remove the first data point
        newData.push(generatePoint());
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateData = () => {
    // Generate initial dummy data for 60 seconds
    const initialData = [];
    for (let i = -59; i <= 0; i++) {
      initialData.push(generatePoint(i));
    }
    return initialData;
  };

  const generatePoint = (offset = 0) => {
    const now = new Date(Date.now() + offset * 1000);
    const statuses = ['Locked', 'Listening', 'Faulty'];
    const statusIndex = Math.floor(Math.random() * statuses.length);
    return {
      name: statuses[statusIndex]+"_"+now,
      value: [now.getTime(), statusIndex],
    };
  };

  const getColor = (status) => {
    switch (status) {
      case 'Locked':
        return '#00FF00'; // Green
      case 'Listening':
        return '#FFFF00'; // Yellow
      case 'Faulty':
        return '#FF0000'; // Red
      default:
        return '#000000'; // Default black
    }
  };

  const options = {
    title: {
      text: '2) b) ECharts: Timeline (Line)',
      left: 'center', // Center align the title
      textStyle: {
        color: '#e8e8e8', // White color for the title text
      },
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (value) => {
          const date = new Date(value);
          return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
        color: '#c0c0c0', // White color for x-axis labels
      },     
      axisLine: {
        lineStyle: {
          color: '#ffffff', // White color for x-axis line
        },
      },
      axisTick: {
        lineStyle: {
          color: '#c0c0c0', // White color for x-axis ticks
        },
      },
    },
    yAxis: {
      type: 'category',
      data: ['Locked', 'Listening', 'Faulty'],
      axisLabel: {
        formatter: (value) => value,
        color: '#c0c0c0', // White color for x-axis labels
      },
      axisLine: {
        lineStyle: {
          color: '#ededed', // White color for x-axis line
        },
      },
      axisTick: {
        lineStyle: {
          color: '#c0c0c0', // White color for x-axis ticks
        },
      },
    },
    series: [
      {
        name: 'Status',
        type: 'line',
        data: data.map((point) => ({
          name: point.name,
          value: [point.value ? point.value[0] : 0, point.value ? point.value[1] : 0],
          itemStyle: { color: getColor(point.name.split('_')[0]) },
        })),
        label: {
          show: true,
          formatter: (params) => {
            const status = params.name.split('_')[0]; // Extract the status name
            const currentIndex = params.dataIndex;

            // Determine if this label should be shown
            const isFirstOccurrence = data[currentIndex - 1]?.name.split('_')[0] !== status;

            return isFirstOccurrence ? status : ''; // Show label only if it's the first occurrence
          },
          color: '#ededed',
        },
        lineStyle: {
            color: '#1990ff', // White color for the line
        },
      },
    ],
    animationDuration: 1000, // Set initial animation duration
    animationEasing: 'linear', // Set initial animation easing
    animationDurationUpdate: 1000, // Set update animation duration
    animationEasingUpdate: 'linear', // Set update animation easing
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
      <ReactECharts option={options} />
    </div>
  );
};

export default EChartsTimelineLine;
