import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const EChartsTimelineBarContinuous = () => {
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
    const statuses = ['locked', 'listening', 'faulty'];
    const colors = ['green', 'yellow', 'red'];
    const statusIndex = Math.floor(Math.random() * statuses.length);
    return {
      name: statuses[statusIndex] + "_" + now,
      value: [now.getTime(), 1], // Fixed length for all bars
      itemStyle: { color: colors[statusIndex] },
    };
  };

  const options = {
    title: {
      text: '1) b) ECharts: Timeline (Bar)',
      left: 'center', // Center align the title
      textStyle: {
        color: '#e8e8e8', // White color for the title text
      },
      
    },
    tooltip: {
      trigger: 'axis', // Tooltip will trigger on the axis
      formatter: (params) => {
        const param = params[0]; // Assuming there's only one series
        const date = new Date(param.value[0]);
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const status = param.name.split('_')[0];
        const statusLabel = status.charAt(0).toUpperCase() + status.slice(1); // Capitalize the first letter
        return `Time: ${time}<br/>Status: ${statusLabel}`;
      },
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Background color
      borderColor: '#ffffff', // Border color
      borderWidth: 1, // Border width
      textStyle: {
        color: '#ffffff', // Text color
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
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      max: 1,
      axisLabel: { show: false }, // Hide the y-axis labels
      splitLine: { show: false },
    },
    series: [
      {
        name: 'Status',
        type: 'bar',
        data: data,
        // label: {
        //   show: true,
        //   position: 'inside',
        //   verticalAlign: 'middle',
        //   align: 'center',
        //   rotate: 90, // Rotate the label text
        //   formatter: (params) => {
        //     const status = params.name.split('_')[0];
        //     let statusToReturn = status === 'faulty' ? 'Faulty' : status === 'listening' ? 'Listening' : 'Locked';
        //     const currentIndex = params.dataIndex;
        //     // Determine if this label should be shown
        //     const isFirstOccurrence = data[currentIndex - 1]?.name.split('_')[0] !== status;

        //     return isFirstOccurrence ? statusToReturn : ''; // Show label only if it's the first occurrence
        //   },
        //   rich: {
        //     verticalAlign: 'middle',
        //     align: 'center',
        //   },
        // },
        barWidth: '100%', // Make the bars wide
      },
    ],
    animationDuration: 800, // Set initial animation duration
    animationEasing: 'linear', // Set initial animation easing
    animationDurationUpdate: 800, // Set update animation duration
    animationEasingUpdate: 'linear', // Set update animation easing
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
      <ReactECharts option={options} />
    </div>
  );
};

export default EChartsTimelineBarContinuous;
