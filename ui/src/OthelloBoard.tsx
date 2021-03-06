import React from 'react';
import { BOARD_TILES, Disk, getDiskAtIndex, getScore, isLegalMoveForIndex } from '@othello/logic';
import { G, OthelloCtx, getCurrentPlayer } from '@othello/game';
import { BoardProps } from 'boardgame.io/react';
import Scores from './Scores';
import DiskDisplay from './DiskDisplay';
import MoveDisplay from './MoveDisplay';
import './OthelloBoard.css';

export type Props = BoardProps<G> & {
  ctx: OthelloCtx;
}

const OthelloBoard: React.FC<Props> = ({ G, ctx, moves, playerID, log }) => {
  const showPositions = (
    // Player ID must be specified
    playerID != null &&
    // It's our turn
    ctx.currentPlayer === playerID
  );
  const playerDisk = getCurrentPlayer(ctx);
  const mapToTile = (_: unknown, i: number) => {
    const disk = getDiskAtIndex(G.board, i);
    const canPlay = showPositions && isLegalMoveForIndex(G.board, i, playerDisk);
    return (
      <div className="OthelloBoard-tile" key={`tile-${i}`}>
        {disk !== null && (
          <DiskDisplay disk={disk} key={`disk-${i}`} index={i} log={log}>
            {G.lastPlaced === i && <span>{ctx.turn - 1}</span>}
          </DiskDisplay>
        )}
        {canPlay && (
          <MoveDisplay onClick={() => moves.clickCell(i)} />
        )}
      </div>
    );
  };
  return (
    <div className="OthelloBoard">
      <Scores
        black={getScore(G.board, Disk.BLACK)}
        white={getScore(G.board, Disk.WHITE)}
        currentPlayer={playerDisk}
        gameOver={ctx.gameover}
      />
      <div className="OthelloBoard-square">
        <div className="OthelloBoard-grid">
          {Array.from(new Array(BOARD_TILES), mapToTile)}
        </div>
      </div>
    </div>
  );
};

export default OthelloBoard;
