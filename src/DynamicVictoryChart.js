import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';

const generateDataPoint = () => ({
  x: new Date(), // Using Date object to show current time
  y: Math.floor(Math.random() * 100) // Random y-value
});

const DynamicVictoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData, generateDataPoint()];
        if (newData.length > 60) {
          newData.shift(); // Keep only the latest 60 data points
        }
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div>
      <h1>Live Data Chart</h1>
      <VictoryChart
        animate={{
          duration: 500,
          onExit: { duration: 500 }
        }}
        scale={{ x: "time" }} // Scale x-axis as time
      >
        <VictoryAxis
          tickFormat={(x) => `${x.getHours()}:${x.getMinutes()}:${x.getSeconds()}`}
          tickLabelComponent={<VictoryLabel angle={-45} />}
        />
        <VictoryAxis dependentAxis />
        <VictoryLine
          data={data}
          x="x"
          y="y"
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" }
          }}
          animate={{
            duration: 500,
            onExit: { duration: 500 }
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default DynamicVictoryChart;
