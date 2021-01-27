import React from 'react';
import classNames from 'classnames';
import { Disk } from '@othello/logic';
import DiskDisplay from './DiskDisplay';
import './Scores.css';

export interface Props {
  black: number;
  white: number;
  currentPlayer?: Disk;
}

const Scores: React.FC<Props> = ({ black, white, currentPlayer }) => {
  return (
    <div className="Scores">
      <div className={classNames('Scores-player', currentPlayer === Disk.BLACK && 'Scores-player--current-player')}>
        <div className="Scores-player-disk">
          <DiskDisplay disk={Disk.BLACK} />
        </div>
        <div className="Scores-player-score">
          {black}
        </div>
      </div>
      <div className={classNames('Scores-player', currentPlayer === Disk.WHITE && 'Scores-player--current-player')}>
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
