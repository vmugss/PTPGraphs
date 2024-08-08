import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const EChartsSpline = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize with initial data
    setData(generateData());

    // Update data every second
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = prevData.slice(1); // Remove the first data point
        newData.push({
          name: new Date().toISOString(),
          value: [new Date(), Math.floor(Math.random() * 100)],
        });
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateData = () => {
    // Generate initial dummy data for 60 seconds
    const initialData = [];
    const now = Date.now();
    for (let i = -59; i <= 0; i++) {
      initialData.push({
        name: new Date(now + i * 1000).toISOString(),
        value: [new Date(now + i * 1000), Math.floor(Math.random() * 100)],
      });
    }
    return initialData;
  };

  const options = {
    title: {
      text: 'ECharts: Spline',
      left: 'center', // Center align the title
      textStyle: {
        color: '#ffffff', // White color for the title text
      },
    },
    tooltip: {
      trigger: 'axis', // Tooltip will trigger on the axis
      formatter: (params) => {
        return params.map(param => `${param.marker} ${param.axisValueLabel}: ${param.value[1]}`).join('<br/>');
      },
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Background color
      borderColor: '#ffffff', // White border color
      borderWidth: 1, // Border width
      textStyle: {
        color: '#ffffff', // White text color in tooltip
      },
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
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
      type: 'value',
      axisLabel: {
        formatter: '{value}',
        color: '#c0c0c0', // White color for y-axis labels
      },
      axisLine: {
        lineStyle: {
          color: '#ffffff', // White color for y-axis line
        },
      },
      axisTick: {
        lineStyle: {
          color: '#c0c0c0', // White color for y-axis ticks
        },
      },
      splitLine: {
        lineStyle: {
          color: '#858585', // White color for grid lines
        },
      },
    },
    series: [
      {
        name: 'Random Data',
        type: 'line',
        smooth: true,
        data: data,
        showSymbol: true, // Show symbols for each data point
        lineStyle: {
          width: 2.5, // Line width
          color: '#e5ff00', // White color for the line
        },
        itemStyle: {
          color: '#f4f7d5', // White color for data point symbols
        },
        animationDuration: 1000, // Animation duration
      },
    ],
    animationDurationUpdate: 1000, // Animation duration for updates
    animationEasingUpdate: 'linear'
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', marginTop: '20px' }}>
      <ReactECharts option={options} />
    </div>
  );
};

export default EChartsSpline;
