import React from 'react';
import './App.css';
import Board from './components/board';

let status : boolean = false;
let board : Array<string> = ["○", " ", " ", " ", " ", " ", " ", " ", " "];


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Board status={status} board={board}/>
      </header>
    </div>
  );
};

export default App;
