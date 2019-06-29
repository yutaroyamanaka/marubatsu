import React from 'react';
import './App.css';
import Board from './components/board';


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Board/>
      </header>
    </div>
  );
};

export default App;
