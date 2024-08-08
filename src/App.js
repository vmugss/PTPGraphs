import React from 'react';
import './App.css';
import HighChartsLine from './HighChartsLine';
import HighChartsSpline from './HighChartsSpline';
import EChartsLine from './EChartsLine';
import EChartsSpline from './EChartsSpline';
import HighChartsTimelineLine from './HighChartsTimelineLine';
import HighChartsTimelineBlock from './HighChartsTimelIneBlock';
import EChartsTimelineLine from './EChartsTimelineLine';
import EChartsTimelineBarContinuous from './EChartsTimelineBarContinuous';


const App = () => {
  let showLineGraphs = false;
  if (showLineGraphs){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Graphs for PTP</h1>
          <p>For Offset and Path Delay graphs</p>
        </header>
        <div className='container'>
            <div className='graphContainer'>
              <HighChartsLine />
            </div>
            <div className='graphContainer'>
              <EChartsLine />
            </div>
            <div className='graphContainer'>
              <HighChartsSpline/>
            </div>
            <div className='graphContainer'>
              <EChartsSpline />
            </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Timeline Graphs for PTP</h1>
          <p>For Client State Graph</p>
        </header>
        <div className='linear-container'>
            <div className='graphContainer timeline'>
              <HighChartsTimelineBlock />
            </div>
            <div className='graphContainer timeline'>
              <EChartsTimelineBarContinuous />
            </div>
            <div className='graphContainer timeline'>
              <HighChartsTimelineLine />
            </div>
            <div className='graphContainer timeline'>
              <EChartsTimelineLine />
            </div>
        </div>
      </div>
    );
  }
}

export default App;