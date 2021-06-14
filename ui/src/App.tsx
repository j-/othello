import React from 'react';
import { OthelloGame } from '@othello/game';
import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { getBot } from './worker-bot';
import OthelloBoard from './OthelloBoard';
import './App.css';

export interface BotDifficulty {
  name: string;
  iterations: number;
  playoutDepth: number;
}

export const BOT_EASY = { name: 'Easy', iterations: 5, playoutDepth: 5 };
export const BOT_MEDIUM = { name: 'Medium', iterations: 100, playoutDepth: 15 };
export const BOT_HARD = { name: 'Hard', iterations: 500, playoutDepth: 59 };
export const BOT_EXPERT = { name: 'Expert', iterations: 2000, playoutDepth: 59 };

export const BOT_DIFFICULTIES: BotDifficulty[] = [
  BOT_EASY,
  BOT_MEDIUM,
  BOT_HARD,
  BOT_EXPERT,
];

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [gameNumber, setGameNumber] = React.useState(1);
  const [difficulty, setDifficulty] = React.useState(BOT_MEDIUM);

  const OthelloClient = React.useMemo(() => {
    // Must consume game number to recompute memo
    console.info('Game number ' + gameNumber);
    return Client({
      debug: false,
      game: OthelloGame,
      board: OthelloBoard,
      multiplayer: Local({
        bots: {
          1: getBot(difficulty),
        },
      }),
    });
  }, [gameNumber, difficulty]);

  const reset = React.useCallback(() => {
    setGameNumber(gameNumber + 1);
  }, [gameNumber]);

  return (
    <div className="App">
      {isGameStarted && <OthelloClient playerID="0" />}
      {isGameStarted && <button type="button" onClick={reset}>New game</button>}
      {BOT_DIFFICULTIES.map((difficulty) => (
        <button key={difficulty.name} type="button" onClick={() => {
          setIsGameStarted(true);
          setGameNumber(gameNumber + 1);
          setDifficulty(difficulty);
        }}>{difficulty.name} game</button>
      ))}
    </div>
  );
};

export default App;
