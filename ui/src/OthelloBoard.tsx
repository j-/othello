import React from 'react';
import { BOARD_TILES, Disk, getDiskAtIndex, getScore, getWinner, isLegalMoveForIndex } from '@othello/logic';
import { G, getCurrentPlayer } from '@othello/game';
import { BoardProps } from 'boardgame.io/react';
import Scores from './Scores';
import DiskDisplay from './DiskDisplay';
import MoveDisplay from './MoveDisplay';
import Log from './Log';
import './OthelloBoard.css';

export type Props = BoardProps<G>

const RENDER_LOG = false;

const OthelloBoard: React.FC<Props> = ({ G, ctx, moves, playerID, log }) => {
  const showPositions = (
    // Player ID must be specified
    playerID != null &&
    // It's our turn
    ctx.currentPlayer === playerID
  );
  const playerDisk = getCurrentPlayer(ctx);
  const winner = getWinner(G.board);
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
      />
      <div className="OthelloBoard-square">
        <div className="OthelloBoard-grid">
          {Array.from(new Array(BOARD_TILES), mapToTile)}
        </div>
      </div>
      {ctx.gameover && <p><strong>{winner === null ? 'Draw' : winner === Disk.BLACK ? 'Black wins' : 'White wins'}</strong></p>}
      {!ctx.gameover && <p>{ctx.currentPlayer === '0' ? 'Black\'s turn' : 'White\'s turn'}</p>}
      {RENDER_LOG && (
        <>
          <p><strong>Log</strong></p>
          <Log log={log} />
        </>
      )}
    </div>
  );
};

export default OthelloBoard;
