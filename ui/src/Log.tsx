import React from 'react';
import { playerToDisk } from '@othello/game';
import { getCardinalPositionFromIndex } from '@othello/logic';
import { LogEntry } from 'boardgame.io';
import DiskDisplay from './DiskDisplay';
import './Log.css';

export interface Props {
  log: LogEntry[];
}

const Log: React.FC<Props> = ({ log }) => {
  const children = log
    .filter((entry) => entry.action.type === 'MAKE_MOVE')
    .filter((entry) => entry.action.payload.type === 'clickCell')
    .map((entry) => (
      <li className="Log-entry" key={entry.turn}>
        <div className="Log-entry-disk">
          <DiskDisplay disk={playerToDisk(entry.action.payload.playerID)} />
        </div>
        <div className="Log-entry-position">
          {getCardinalPositionFromIndex(entry.action.payload.args[0])}
        </div>
      </li>
    ));
  return <ol className="Log">{children}</ol>;
};

export default Log;
