import { Disk } from '@othello/logic';
import React from 'react';
import DiskDisplay from './DiskDisplay';
import './Scores.css';

export interface Props {
  black: number;
  white: number;
}

const Scores: React.FC<Props> = ({ black, white }) => {
  return (
    <div className="Scores">
      <div className="Scores-player">
        <div className="Scores-player-disk">
          <DiskDisplay disk={Disk.BLACK} />
        </div>
        <div className="Scores-player-score">
          {black}
        </div>
      </div>
      <div className="Scores-player">
        <div className="Scores-player-disk">
          <DiskDisplay disk={Disk.WHITE} />
        </div>
        <div className="Scores-player-score">
          {white}
        </div>
      </div>
    </div>
  );
};

export default Scores;
