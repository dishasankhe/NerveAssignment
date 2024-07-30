// NerveStrategyView.js
import React, { useState, useEffect } from 'react';
import './NerveStrategyView.css'; 

const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];

const strategyArray = [
  { 'View': 'Bullish', 'Value': {
    '24-Apr-2024': ['Bull Call Spread','Bull Put Spread','Bull Put Spread','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy1','Strategy1','SpreadStrategy','Bull Call Spread'],
    '02-May-2024': ['Bull Call Spread','Bull Call Spread','Bull Put Spread','Long Call','Long Call','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy2','Strategy1','Strategy2','Bull Call Spread'],
    '09-May-2024': ['Strategy Put','Strategy Call','Strategy Call','Strategy Call','Strategy Put']
  }},
  { 'View': 'Bearish', 'Value': {
    '24-Apr-2024': ['Bear Call Spread','Bear Call Spread','Bear Call Spread','Long Put','Long Put','Long Put','Bear Call Spread'],
    '31-May-2024': ['Long Put','Long Put','Long Put','Long Put','Long Put'],
    '21-Jun-2024': ['Strategy3','Strategy3','Bear Put Spread','Strategy3','Long Put','Long Put']
  }},
  { 'View': 'RangeBound', 'Value': {
    '24-Apr-2024': ['Short Straddle','Short Strangle','Short Strangle','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy1','Strategy1','SpreadStrategy','Short Straddle'],
    '02-May-2024': ['Short Straddle','Short Straddle','Short Strangle','Iron Butterfly','Iron Butterfly','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy2','Strategy1','Strategy2','Short Straddle'],
    '21-Jun-2024': ['Iron Condor','Iron Butterfly','Iron Butterfly','Iron Butterfly','Iron Condor']
  }},
  { 'View': 'Volatile', 'Value': {
    '02-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy1','Strategy1','Spread-Strategy','Long Straddle'],
    '09-May-2024': ['Long Straddle','Long Straddle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy2','Strategy1','Strategy2','Long Straddle'],
    '31-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle']
  }}
];

const StrategyViewer = () => {
  const [selectedView, setSelectedView] = useState('Bullish');
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    updateCards();
  }, [selectedView, selectedDate]);

  const populateDropdown = () => {
    return dateArray.map(date => (
      <option key={date} value={date}>
        {date}
      </option>
    ));
  };

  const updateCards = () => {
    const viewData = strategyArray.find(item => item.View === selectedView).Value;
    const dateStrategies = viewData[selectedDate] || [];

    if (dateStrategies.length === 0) {
      setStrategies([{ name: `No strategies for ${selectedDate}`, count: 0 }]);
      return;
    }

    const strategyCount = dateStrategies.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});

    setStrategies(Object.entries(strategyCount).map(([name, count]) => ({
      name,
      count
    })));
  };

  return (
    <div className="container" align="center">
      <div className="toggle-buttons"  align="center">
        {['Bullish', 'Bearish', 'RangeBound', 'Volatile'].map(view => (
          <button
            key={view}
            className={`toggle-btn ${selectedView === view ? 'active' : ''}`}
            onClick={() => setSelectedView(view)}
          >
            {view}
          </button>
        ))}
      </div>
      <div className="date-dropdown" align="center">
        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          {populateDropdown()}
        </select>
      </div>
      <div id="strategy-cards" className="strategy-cards" align="center">
        {strategies.length > 0 && strategies[0].count === 0 ? (
          <div className="empty-state">{strategies[0].name}</div>
        ) : (
          strategies.map((strategy, index) => (
            <div key={index} className="card strategy-card">
              <strong>{strategy.name}</strong><br />
              {strategy.count === 1 ? 'Strategy' : 'Strategies'}: {strategy.count}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StrategyViewer;
