import React from 'react';
import { OthelloGame } from '@othello/game';
import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { WorkerBot } from './worker-bot';
import OthelloBoard from './OthelloBoard';
import './App.css';

const OthelloClient = Client({
  debug: false,
  game: OthelloGame,
  board: OthelloBoard,
  multiplayer: Local({
    bots: {
      1: WorkerBot,
    },
  }),
});

const App: React.FC = () => (
  <div className="App">
    <OthelloClient playerID="0" />
  </div>
);

export default App;
