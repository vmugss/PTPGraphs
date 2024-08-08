
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 6. High charts timeline - like Hypnograph
// //////////////////////////////// //////////////////////////////// //////////////////////////////// //////////////////////////////

import React, { useState, useEffect } from 'react';
import Highcharts, { animate, animObject } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTimeline from 'highcharts/modules/timeline';
import { duration } from 'moment';

HighchartsTimeline(Highcharts);

const HighChartsTImelineLine = () => {
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
    const now = Date.now() + offset * 1000;
    const statuses = ['Locked', 'Listening', 'Faulty'];
    const statusIndex = Math.floor(Math.random() * statuses.length);
    return {
      x: now,
      y: statusIndex,
      name: statuses[statusIndex],
    };
  };

  const getColor = (status) => {
    switch (status) {
      case 'Locked':
        return '#00BD00'; // Green
      case 'Listening':
        return '#FFFF00'; // Yellow
      case 'Faulty':
        return '#FF0000'; // Red
      default:
        return '#000000'; // Default black
    }
  };

  const options = {
    chart: {
      type: 'line',
      animation: {
        duration: 800
      },
      backgroundColor: 'transparent'
    },
    title: {
      text: '2) a) Highcharts: Timeline (Line)',
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
      tickInterval: 1000, // 1-second interval
      labels: {
        format: '{value:%H:%M:%S}', // Display time as hh:mm:ss
        style: {
          color: '#c0c0c0', // White font color for x-axis title
        },
      },
      lineColor: '#ffffff', // White line color for x-axis
      tickColor: '#c0c0c0', // White line color for x-axis,
    },
    yAxis: {
      type: 'category',
      categories: ['Locked', 'Listening', 'Faulty'],
      title: {
        text: 'Status',
        style: {
          color: '#c0c0c0', // White font color for x-axis title
        }
      }, 
      plotLines: [
        {
          color: '#858585',
        },
      ],
      labels: {
        formatter: function () {
          return this.value;
        },
        style: {
          color: '#c0c0c0', // White font color for x-axis title
        }
      },
    },
    gridLineColor: '#858585',
    series: [
      {
        name: 'Status',
        data: data.map((point) => ({
          x: point.x,
          y: point.y,
          name: point.name,
          color: getColor(point.name),
        })),
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.point.name;
          },
          style: {
            color: '#c0c0c0', // White font color for x-axis title
          }
        },
        color: '#1990ff'
      },
    ],
    plotOptions: {
      line: {
        animation: {
          duration: 800
        }
      },
      series: {
        animation: {
          duration: 800
        }
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

export default HighChartsTImelineLine;