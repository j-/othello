import React from 'react';
import classNames from 'classnames';
import { Disk } from '@othello/logic';
import DiskDisplay from './DiskDisplay';
import './Scores.css';

export interface Props {
  black: number;
  white: number;
  currentPlayer: Disk | null;
  winner: Disk | null;
}

const Scores: React.FC<Props> = ({ black, white, currentPlayer, winner }) => {
  return (
    <div className={classNames('Scores', winner !== null && 'Scores--game-over')}>
      <div className={classNames('Scores-player', {
        'Scores-player--current-player': currentPlayer === Disk.BLACK,
        'Scores-player--winner': winner === Disk.BLACK,
      })}>
        <div className="Scores-player-disk">
          <DiskDisplay disk={Disk.BLACK} />
        </div>
        <div className="Scores-player-score">
          {black}
        </div>
      </div>
      <div className={classNames('Scores-player', {
        'Scores-player--current-player': currentPlayer === Disk.WHITE,
        'Scores-player--winner': winner === Disk.WHITE,
      })}>
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
