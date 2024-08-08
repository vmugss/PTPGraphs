// src/SimpleLineChart.js
import React from 'react';
import { Line } from '@nivo/line';

const data = [
  {
    id: 'japan',
    color: 'hsl(205, 70%, 50%)',
    data: [
      { x: 'January', y: 40 },
      { x: 'February', y: 60 },
      { x: 'March', y: 80 },
      { x: 'April', y: 90 },
      { x: 'May', y: 100 },
    ],
  },
];

const DynamicLineChartNivo = () => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Line
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Month',
          legendOffset: 36,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Value',
          legendOffset: -40,
        }}
        colors={{ scheme: 'nivo' }}
        lineWidth={3}
        pointSize={10}
        pointColor={{ from: 'color' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'color' }}
        enableGridX={true}
        enableGridY={true}
        useMesh={true}
      />
    </div>
  );
};

export default DynamicLineChartNivo;
