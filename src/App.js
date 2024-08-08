import React, { useState } from 'react';
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
  const [showLineGraphs, setShowLineGraphs] = useState(true);
    return (
      <div className="App">
        <header className="App-header">
          <h1>Graphs for PTP</h1>
          <div className='btnContainer'>
          <button 
            onClick={() => setShowLineGraphs(true)}
            style={{border: showLineGraphs ? '4px solid yellow' : 'none'}}>Offset and Path Delay graphs</button>
          <button 
            onClick={() => setShowLineGraphs(false)}
            style={{border: !showLineGraphs ? '4px solid yellow' : 'none'}}>Timeline Graphs</button>
          </div>
        </header>
        { showLineGraphs ? 
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
            :
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
      }
      </div>
    );
}
export default App;