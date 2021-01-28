import React from 'react';
import { OthelloGame } from '@othello/game';
import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { getBot } from './worker-bot';
import OthelloBoard from './OthelloBoard';
import './App.css';

const App: React.FC = () => {
  const [iterations] = React.useState(500);
  const [playoutDepth] = React.useState(59);

  const OthelloClient = React.useMemo(() => (
    Client({
      debug: false,
      game: OthelloGame,
      board: OthelloBoard,
      multiplayer: Local({
        bots: {
          1: getBot({
            iterations,
            playoutDepth,
          }),
        },
      }),
    })
  ), [iterations, playoutDepth]);

  return (
    <div className="App">
      <OthelloClient playerID="0" />
    </div>
  );
};

export default App;
