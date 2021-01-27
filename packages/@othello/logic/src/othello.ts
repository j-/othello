/** Board has this many tiles wide vs tall */
export const BOARD_SIZE = 8;

/** Total number of tiles on a board */
export const BOARD_TILES = BOARD_SIZE ** 2;

/** Length of board array */
export const BOARD_LENGTH = BOARD_SIZE * 2;

/** (x,y) coordinates tuple */
export type Coords = readonly [x: number, y: number];

/** A row, column, or diagonal line of tiles */
export type Line = readonly Coords[];

/** Player disks are either dark (black) or light (white) */
export enum Disk {
  BLACK,
  WHITE,
}

/** Dark disk player always moves first */
export const FIRST_MOVE = Disk.BLACK;

/** Uint8Array can store 8 board positions per index */
export interface Board extends Array<number> {
  length: typeof BOARD_LENGTH;
}

/** Create a new board array */
export const createBoard = (): Board => (
  new Array(16).fill(0)
);

/** Get the (x,y) coords for the given index */
export const getCoordsAtIndex = (index: number): Coords => [
  index % 8,
  Math.floor(index / 8)
];

/** Determines which color disk is at these coords */
export const getDiskAtCoords = (board: Board, x: number, y: number): Disk | null => {
  if (board[y + 0] & (1 << x)) return Disk.BLACK;
  if (board[y + 8] & (1 << x)) return Disk.WHITE;
  return null;
};

/** Determines which color disk is at this index */
export const getDiskAtIndex = (board: Board, index: number): Disk | null => (
  getDiskAtCoords(board, ...getCoordsAtIndex(index))
);

/** Sets a single disk at the given coords */
export const setDiskAtCoords = (board: Board, x: number, y: number, disk: Disk | null): void => {
  board[y + 0] &= ~(1 << x);
  board[y + 8] &= ~(1 << x);
  if (disk === Disk.BLACK) board[y + 0] |= 1 << x;
  if (disk === Disk.WHITE) board[y + 8] |= 1 << x;
};

/** Sets a single disk at the given index */
export const setDiskAtIndex = (board: Board, index: number, disk: Disk | null): void => (
  setDiskAtCoords(board, ...getCoordsAtIndex(index), disk)
);

/** Is there a disk at the given coords? */
export const hasDiskAtCoords = (board: Board, x: number, y: number): boolean => (
  getDiskAtCoords(board, x, y) !== null
);

/** Is there a disk at the given index? */
export const hasDiskAtIndex = (board: Board, index: number): boolean => (
  getDiskAtCoords(board, ...getCoordsAtIndex(index)) !== null
);

/** Clear the entire board and place the four starting disks */
export const initializeBoard = (board: Board): void => {
  board.fill(0);
  setDiskAtCoords(board, 3, 3, Disk.WHITE); // White north west
  setDiskAtCoords(board, 4, 3, Disk.BLACK); // Black north east
  setDiskAtCoords(board, 3, 4, Disk.BLACK); // Black south west
  setDiskAtCoords(board, 4, 4, Disk.WHITE); // White south east
};

/** Draw board as unicode string */
export const toString = (board: Board, invert = false): string => {
  const diskBlack = invert ? '\u25CB' : '\u25CF';
  const diskWhite = invert ? '\u25CF' : '\u25CB';
  let result = '';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const disk = getDiskAtCoords(board, x, y);
      if (disk === Disk.BLACK) {
        result += diskBlack;
      } else if (disk === Disk.WHITE) {
        result += diskWhite;
      } else {
        result += '\xB7';
      }
    }
    if (y < 7) result += '\n';
  }
  return result;
};

/** Returns false if board is in an illegal state */
export const isBoardLegal = (board: Board): boolean => {
  for (let y = 0; y < 8; y++) {
    if (board[y] & board[y + 8]) {
      return false;
    }
  }
  return true;
};

/** Throws if board is in an illegal state */
export const assertBoardLegal = (board: Board): void => {
  if (!isBoardLegal(board)) {
    throw new Error('Board is in an illegal state');
  }
};

/** Returns true if every position on board is filled */
export const isBoardFull = (board: Board): boolean => {
  for (let y = 0; y < 8; y++) {
    if (board[y] ^ board[y + 8] ^ 255) {
      return false;
    }
  }
  return true;
};

/** Returns the coordinates in the given direction or null if on an edge */
export const getNeighboringCoords = (x: number, y: number, deltaX: number, deltaY: number): Coords | null => (
  x + deltaX < 0 ||
  x + deltaX > 7 ||
  y + deltaY < 0 ||
  y + deltaY > 7 ?
    null :
    [x + deltaX, y + deltaY]
);

/** Type check input is not null */
const isNotNull = <T>(item: T): item is NonNullable<T> => (
  item !== null
);

/** Get coordinates for cells around all sides of given coords */
export const getAllNeighboringCoords = (x: number, y: number): Coords[] => [
  getNeighboringCoords(x, y, -1, -1), // NW
  getNeighboringCoords(x, y, +0, -1), // N
  getNeighboringCoords(x, y, +1, -1), // NE
  getNeighboringCoords(x, y, -1, +0), // W
  getNeighboringCoords(x, y, +1, +0), // E
  getNeighboringCoords(x, y, -1, +1), // SW
  getNeighboringCoords(x, y, +0, +1), // S
  getNeighboringCoords(x, y, +1, +1), // SE
].filter(isNotNull);

/** Get all valid coordinates in any direction from the given coords */
export const getLine = (x: number, y: number, deltaX: number, deltaY: number): Line => {
  const result: Coords[] = [];
  let curX = x;
  let curY = y;
  while (true) {
    const coords = getNeighboringCoords(curX, curY, deltaX, deltaY);
    if (!coords) break;
    result.push(coords);
    curX += deltaX;
    curY += deltaY;
  }
  return result;
};

/** Get all lines in all directions from the given coords */
export const getAllLines = (x: number, y: number): Line[] => [
  getLine(x, y, -1, -1), // NW
  getLine(x, y, +0, -1), // N
  getLine(x, y, +1, -1), // NE
  getLine(x, y, -1, +0), // W
  getLine(x, y, +1, +0), // E
  getLine(x, y, -1, +1), // SW
  getLine(x, y, +0, +1), // S
  getLine(x, y, +1, +1), // SE
];

/** Get the opposing disk color */
export const getOpponent = (disk: Disk): Disk => (
  disk === Disk.BLACK ? Disk.WHITE : Disk.BLACK
);

/** Returns true if the postion at these coords can be played legally */
export const isLegalMoveForCoords = (board: Board, x: number, y: number, disk: Disk): boolean => {
  // Cannot play a disk in a position which already has a disk
  if (hasDiskAtCoords(board, x, y)) return false;
  const lines = getAllLines(x, y);
  const opponent = getOpponent(disk);
  outer: for (const line of lines) {
    // Must be at least two disks for a legal move
    if (line.length < 2) continue;
    // First disk in line must be of the opposite color
    if (getDiskAtCoords(board, line[0][0], line[0][1]) !== opponent) continue;
    inner: for (let i = 1; i < line.length; i++) {
      switch (getDiskAtCoords(board, line[i][0], line[i][1])) {
        // Valid move if there is a disk of our color in line
        case disk: return true;
        // Keep iterating over the their disks in this line
        case opponent: continue inner;
        // This move is not valid in this line if we hit an empty spot
        default: continue outer;
      }
    }
  }
  // No valid moves found
  return false;
};

/** Returns true if the postion at this index can be played legally */
export const isLegalMoveForIndex = (board: Board, index: number, disk: Disk): boolean => (
  isLegalMoveForCoords(board, ...getCoordsAtIndex(index), disk)
);

/** Returns an array of all legal moves by index that the player can make */
export const getLegalMoveIndexesForPlayer = (board: Board, disk: Disk): number[] => {
  const moves: number[] = [];
  for (let i = 0; i < BOARD_TILES; i++) {
    if (isLegalMoveForIndex(board, i, disk)) {
      moves.push(i);
    }
  }
  return moves;
};

/** Returns true if the player can make any moves at all */
export const hasLegalMoves = (board: Board, disk: Disk): boolean => {
  for (let i = 0; i < BOARD_TILES; i++) {
    if (isLegalMoveForIndex(board, i, disk)) {
      return true;
    }
  }
  return false;
};

/** Returns an array of all legal moves by coords that the player can make */
export const getLegalMoveCoordsForPlayer = (board: Board, disk: Disk): Coords[] => {
  const moves: Coords[] = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (isLegalMoveForIndex(board, x, disk)) {
        moves.push([x, y]);
      }
    }
  }
  return moves;
};

/** Returns a new board with the state of the board after this move is played */
export const playMoveAtCoords = (board: Board, x: number, y: number, disk: Disk): Board => {
  const newBoard = createBoard();
  if (!isLegalMoveForCoords(board, x, y, disk)) {
    throw new Error('Move is illegal');
  }
  setDiskAtCoords(newBoard, x, y, disk);
  const lines = getAllLines(x, y);
  const opponent = getOpponent(disk);
  outer: for (const line of lines) {
    // Must be at least two disks for a legal move
    if (line.length < 2) continue;
    // First disk in line must be of the opposite color
    if (getDiskAtCoords(board, line[0][0], line[0][1]) !== opponent) continue;
    inner: for (let i = 1; i < line.length; i++) {
      switch (getDiskAtCoords(board, line[i][0], line[i][1])) {
        // Valid move if there is a disk of our color in line
        case disk: {
          for (let j = 0; j < i; j++) {
            setDiskAtCoords(newBoard, line[j][0], line[j][1], disk);
          }
          continue outer;
        }
        // Keep iterating over the their disks in this line
        case opponent: continue inner;
        // This move is not valid in this line if we hit an empty spot
        default: continue outer;
      }
    }
  }
  return newBoard;
};

/** Returns a new board with the state of the board after this move is played */
export const playMoveAtIndex = (board: Board, index: number, disk: Disk): Board => (
  playMoveAtCoords(board, ...getCoordsAtIndex(index), disk)
);

/** Takes a set of moves and applies them to a game board */
export const applyMoves = (board: Board, moves: Board): void => {
  for (let y = 0; y < 8; y++) {
    // Unset white moves from black positions
    board[y + 0] &= ~moves[y + 8];
    // Unset black moves from white positions
    board[y + 8] &= ~moves[y + 0];
    // Set black moves to black positions
    board[y + 0] |= moves[y + 0];
    // Set white moves to white positions
    board[y + 8] |= moves[y + 8];
  }
};

/** Returns true if board is full or no more valid moves */
// TODO: Add unit tests
export const isGameOver = (board: Board) => {
  if (isBoardFull(board)) return true;
  for (let i = 0; i < BOARD_TILES; i++) {
    if (
      isLegalMoveForIndex(board, i, Disk.BLACK) ||
      isLegalMoveForIndex(board, i, Disk.WHITE)
    ) return false;
  }
  return true;
};

/** Returns the number of set bits in an integer */
const countBits = (value: number): number => {
  let count = 0;
  while (value > 0) {
    if ((value & 1) === 1) count++;
    value >>= 1;
  }
  return count;
};

/** Get the number of disks of the given color on the board */
export const getScore = (board: Board, disk: Disk): number => {
  const offset = disk === Disk.BLACK ? 0 : 8;
  let score = 0;
  for (let i = 0; i < 8; i++) {
    score += countBits(board[i + offset]);
  }
  return score;
};

/** Return the color with the higher score or null if draw */
export const getWinner = (board: Board): Disk | null => {
  const scoreBlack = getScore(board, Disk.BLACK);
  const scoreWhite = getScore(board, Disk.WHITE);
  if (scoreBlack > scoreWhite) return Disk.BLACK;
  if (scoreWhite > scoreBlack) return Disk.WHITE;
  return null;
};

/** Converts e.g. (5,4) to "f5" */
export const getCardinalPositionFromCoords = (...[x, y]: Coords): string => {
  if (x < 0 || x > 7 || y < 0 || y > 7) throw new Error('Position is out of bounds');
  return String.fromCharCode(0x61 + x) + (y + 1);
};

/** Converts e.g. 37 to "f5" */
export const getCardinalPositionFromIndex = (index: number): string => (
  getCardinalPositionFromCoords(...getCoordsAtIndex(index))
);
