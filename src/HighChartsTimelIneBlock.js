 //////////////////////////////// //////////////////////////////
// 4. Highcharts - continuous data not cubbed - high prob of green
// //////////////////////////////// //////////////////////////////

import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTimeline from 'highcharts/modules/timeline';
import { duration } from 'moment';

// Initialize the Highcharts Timeline module
HighchartsTimeline(Highcharts);

const HighChartsTimelineBlock = () => {
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
    // Adjust probabilities
    const statuses = ['Locked', 'Locked', 'Locked', 'Listening', 'Faulty'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    return {
      name: `${new Date(now).toLocaleTimeString()}: ${status}`,
      description: `Status is ${status}`,
      color: getColor(status),
      x: now
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
      type: 'timeline',
      animation: {
        duration: 800
      },
      backgroundColor: 'transparent'
    },
    title: {
      text: '1) a) Highcharts: Timeline (Block)',
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
      labels: {
        format: '{value:%H:%M:%S}', // Display time as hh:mm:ss
        style: {
          color: '#c0c0c0', // White font color for x-axis title
        },
      },     
      lineColor: '#ffffff', // White line color for x-axis
      tickColor: '#c0c0c0', // White line color for x-axis
    },
    yAxis: {
      type: 'category',
      categories: ['Locked', 'Listening', 'Faulty'],
      title: {
        text: 'Status',
        style: {
          color: '#c0c0c0', // White font color for x-axis title
        },
      },
      labels: {
        style: {
          color: '#c0c0c0', // White font color for x-axis title
        },
      }, 
    },
    series: [{
      data: data,
      dataLabels: {
        enabled: false,
        formatter: function () {
          return this.point.name;
        },
      },
    }],
    colors: ['#00FF00', '#FFFF00', '#FF0000'], // Color for the status
    plotOptions: {
      series: {
        animation: false,
        dataLabels: {
          enabled: true,
          inside: true
        }
      },
    },
    legend: {
      enabled: true,
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighChartsTimelineBlock;






// //////////////////////////////// //////////////////////////////
// 5. Highcharts - Separate block timelines
// //////////////////////////////// //////////////////////////////

// import React, { useState, useEffect } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import HighchartsTimeline from 'highcharts/modules/timeline';

// // Initialize the Highcharts Timeline module
// HighchartsTimeline(Highcharts);

// const App = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Initialize with initial data
//     setData(generateData());

//     // Update data every second
//     const interval = setInterval(() => {
//       setData((prevData) => {
//         const newData = prevData.slice(1); // Remove the first data point
//         newData.push(generatePoint());
//         return newData;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const generateData = () => {
//     // Generate initial dummy data for 60 seconds
//     const initialData = [];
//     for (let i = -59; i <= 0; i++) {
//       initialData.push(generatePoint(i));
//     }
//     return initialData;
//   };

//   const generatePoint = (offset = 0) => {
//     const now = Date.now() + offset * 1000;
//     const statuses = ['Locked', 'Listening', 'Faulty'];
//     const statusIndex = Math.floor(Math.random() * statuses.length);
//     return {
//       name: `${new Date(now).toLocaleTimeString()}: ${statuses[statusIndex]}`,
//       description: `Status is ${statuses[statusIndex]}`,
//       color: getColor(statuses[statusIndex]),
//       x: now
//     };
//   };

//   const getColor = (status) => {
//     switch (status) {
//       case 'Locked':
//         return '#00FF00'; // Green
//       case 'Listening':
//         return '#FFFF00'; // Yellow
//       case 'Faulty':
//         return '#FF0000'; // Red
//       default:
//         return '#000000'; // Default black
//     }
//   };

//   const options = {
//     chart: {
//       type: 'timeline',
//       animation: false
//     },
//     title: {
//       text: 'Dynamic Timeline Graph - Status Updates'
//     },
//     xAxis: {
//       type: 'datetime',
//       title: {
//         text: 'Time'
//       },
//       labels: {
//         format: '{value:%H:%M:%S}', // Display time as hh:mm:ss
//       },
//     },
//     yAxis: {
//       type: 'category',
//       categories: ['Locked', 'Listening', 'Faulty'],
//       title: {
//         text: 'Status'
//       },
//       labels: {
//         formatter: function () {
//           return this.value;
//         },
//       },
//     },
//     series: [{
//       data: data,
//       dataLabels: {
//         enabled: false,
//         formatter: function () {
//           return this.point.name;
//         },
//       },
//     }],
//     colors: ['#00FF00', '#FFFF00', '#FF0000'], // Color for the status
//     plotOptions: {
//       series: {
//         animation: false
//       },
//     },
//     legend: {
//       enabled: false,
//     },
//   };

//   return (
//     <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// };

// export default App;

 
 
 


// //////////////////////////////// //////////////////////////////// DATA GRAPHS  //////////////////////////////// //////////////////////////////





