
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3. Highcharts - Line - OG
// //////////////////////////////// //////////////////////////////// //////////////////////////////// //////////////////////////////

import React, { useState, useEffect } from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { easings } from '@react-spring/web';

const HighChartsLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize with initial data
    setData(generateData());

    // Update data every second
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = prevData.slice(1); // Remove the first data point
        newData.push({
          x: Date.now(),
          y: Math.floor(Math.random() * 100),
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
        x: now + i * 1000,
        y: Math.floor(Math.random() * 100),
      });
    }
    return initialData;
  };

  const options = {
    chart: {
      type: 'line', // Line graph
      animation: {
        duration: 800,
        easing: 'linear'
      },
      backgroundColor: 'transparent'
    },
    title: {
        text: 'Highcharts: Line',
        style: {
            color: '#e8e8e8'
        }
      },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time',
        style: {
            color: '#c0c0c0', // White font color for x-axis title
          },
      },
      tickInterval: 1000, // 1 second interval
      labels: {
        format: '{value:%H:%M:%S}', // Display time as hh:mm:ss
        style: {
            color: '#c0c0c0', // White font color for x-axis labels
          },
      },
      lineColor: '#ffffff', // White line color for x-axis
      tickColor: '#c0c0c0', // White line color for x-axis
    },
    yAxis: {
      title: {
        text: 'Value',
        style: {
            color: '#c0c0c0', // White font color for y-axis title
          },
      },
      plotLines: [
        {
          value: 0,
          width: 1,
          color: '#858585',
        },
      ],
      gridLineColor: '#858585',
      labels: {
        style: {
          color: '#c0c0c0', // White font color for y-axis labels
        },
      },
    },
    series: [
      {
        name: 'Random Data',
        data: data,
        type: 'line', // Line graph
        marker: {
          enabled: true, // Enable markers for each data point
        },
        states: {
          hover: {
            lineWidth: 2, // Increase line width on hover
          },
        },
        color: '#00d8db', // White line color
      },
    ],
    plotOptions: {
      line: {
        animation: {
          duration: 800,
           easing: 'linear'
        },
      },
      series: {
        label: {
          connectorAllowed: false,
        },
        animation: {
          duration: 800,
           easing: 'linear'
        },
      },
    },
    legend: {
      enabled: false,
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighChartsLine;
//