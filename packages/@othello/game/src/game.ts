import { Ctx, Game } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

import {
  applyMoves,
  Board,
  createBoard,
  Disk,
  getWinner,
  initializeBoard,
  isGameOver,
  isLegalMoveForIndex,
  playMoveAtIndex,
  getLegalMoveIndexesForPlayer,
  hasLegalMoves,
} from '@othello/logic';

export interface G {
  board: Board;
  lastPlaced: number | null;
}

export interface OthelloCtx extends Ctx {
  gameover?: {
    winner?: string;
    draw?: true;
  };
}

export const playerToDisk = (player: string): Disk => {
  switch (player) {
    case '0': return Disk.BLACK;
    case '1': return Disk.WHITE;
    default: throw new Error('Unexpected player ID: ' + player);
  }
};

export const diskToPlayer = (disk: Disk): string => (
  String(disk)
);

export const getCurrentPlayer = (ctx: Ctx): Disk => (
  playerToDisk(ctx.currentPlayer)
);

export const OthelloGame: Game<G, OthelloCtx> = {
  setup: () => {
    const board = createBoard();
    initializeBoard(board);
    return {
      board,
      lastPlaced: null,
    };
  },

  turn: {
    moveLimit: 1,
    order: {
      first: (_G, _ctx) => 0,
      /**
       * Called at the end of a player's turn.
       * E.g. called after player 0 plays their first move and
       * `ctx.playOrderPos` will be 0.
       */
      next: (G, ctx) => {
        const currPos = ctx.playOrderPos;
        const nextPos = (currPos + 1) % ctx.numPlayers;
        const nextPlayer = ctx.playOrder[nextPos];
        const nextDisk = playerToDisk(nextPlayer);
        return hasLegalMoves(G.board, nextDisk) ? nextPos : currPos;
      },
    },
  },

  moves: {
    clickCell: (G, ctx, index) => {
      const { board } = G;
      const disk = getCurrentPlayer(ctx);
      if (!isLegalMoveForIndex(board, index, disk)) {
        return INVALID_MOVE;
      }
      const clone = board.slice(0);
      const moves = playMoveAtIndex(clone, index, disk);
      applyMoves(clone, moves);
      return {
        board: clone,
        lastPlaced: index,
      };
    },
  },

  endIf: (G, _ctx) => {
    const { board } = G;
    if (!isGameOver(board)) return;
    const winner = getWinner(board);
    if (winner === null) return { draw: true };
    return { winner: diskToPlayer(winner) };
  },

  ai: {
    enumerate: (G, ctx) => {
      const { board } = G;
      const disk = getCurrentPlayer(ctx);
      return getLegalMoveIndexesForPlayer(board, disk)
        .map((i) => ({
          move: 'clickCell',
          args: [i],
        }));
    },
  },
};
