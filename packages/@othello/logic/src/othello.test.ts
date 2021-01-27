import {
  applyMoves,
  assertBoardLegal,
  createBoard,
  Disk,
  getAllLines,
  getAllNeighboringCoords,
  getCardinalPositionFromCoords,
  getCardinalPositionFromIndex,
  getDiskAtCoords,
  getLine,
  getScore,
  initializeBoard,
  isBoardFull,
  isBoardLegal,
  isLegalMoveForCoords,
  playMoveAtCoords,
  setDiskAtCoords,
  toString,
} from './othello';

describe('createBoard()', () => {
  it('is of type Array', () => {
    const b = createBoard();
    expect(b).toBeInstanceOf(Array);
  });
  it('has correct length', () => {
    const b = createBoard();
    expect(b).toHaveLength(16);
  });
  it('initializes empty', () => {
    expect.assertions(16);
    const b = createBoard();
    for (let i = 0; i < 16; i++) {
      expect(b[i]).toBe(0);
    }
  });
});

describe('getDiskAtCoords()', () => {
  it('returns null every position in empty board', () => {
    expect.assertions(64);
    const b = createBoard();
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const actual = getDiskAtCoords(b, x, y);
        expect(actual).toBeNull();
      }
    }
  });
  it('returns black every position in black board', () => {
    expect.assertions(64);
    const b = createBoard();
    b.fill(0b11111111, 0, 8);
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const actual = getDiskAtCoords(b, x, y);
        expect(actual).toBe(Disk.BLACK);
      }
    }
  });
  it('returns white every position in white board', () => {
    expect.assertions(64);
    const b = createBoard();
    b.fill(0b11111111, 8, 16);
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const actual = getDiskAtCoords(b, x, y);
        expect(actual).toBe(Disk.WHITE);
      }
    }
  });
  it('returns expected value', () => {
    const b = createBoard();
    //   x = 76543210
    b[0] = 0b11001010; // Black
    b[8] = 0b00110101; // White
    expect(getDiskAtCoords(b, 0, 0)).toBe(Disk.WHITE);
    expect(getDiskAtCoords(b, 1, 0)).toBe(Disk.BLACK);
    expect(getDiskAtCoords(b, 2, 0)).toBe(Disk.WHITE);
    expect(getDiskAtCoords(b, 3, 0)).toBe(Disk.BLACK);
    expect(getDiskAtCoords(b, 4, 0)).toBe(Disk.WHITE);
    expect(getDiskAtCoords(b, 5, 0)).toBe(Disk.WHITE);
    expect(getDiskAtCoords(b, 6, 0)).toBe(Disk.BLACK);
    expect(getDiskAtCoords(b, 7, 0)).toBe(Disk.BLACK);
  });
});

describe('setDiskAtCoords()', () => {
  it('sets white disk at given position', () => {
    const b = createBoard();
    expect(getDiskAtCoords(b, 3, 4)).toBeNull();
    setDiskAtCoords(b, 3, 4, Disk.WHITE);
    expect(getDiskAtCoords(b, 3, 4)).toBe(Disk.WHITE);
  });
});

describe('initializeBoard()', () => {
  it('clears out existing disks', () => {
    const b = createBoard();
    expect(getDiskAtCoords(b, 3, 3)).toBeNull();
    expect(getDiskAtCoords(b, 4, 3)).toBeNull();
    expect(getDiskAtCoords(b, 3, 4)).toBeNull();
    expect(getDiskAtCoords(b, 4, 4)).toBeNull();
    setDiskAtCoords(b, 3, 4, Disk.WHITE);
    setDiskAtCoords(b, 2, 7, Disk.BLACK);
    initializeBoard(b);
    expect(getDiskAtCoords(b, 3, 3)).toBe(Disk.WHITE);
    expect(getDiskAtCoords(b, 4, 3)).toBe(Disk.BLACK);
    expect(getDiskAtCoords(b, 3, 4)).toBe(Disk.BLACK);
    expect(getDiskAtCoords(b, 4, 4)).toBe(Disk.WHITE);
    expect(getDiskAtCoords(b, 2, 7)).toBeNull();
  });
});

describe('toString()', () => {
  test('empty board', () => {
    const b = createBoard();
    const actual = toString(b);
    expect(actual).toBe(
      '········\n' +
      '········\n' +
      '········\n' +
      '········\n' +
      '········\n' +
      '········\n' +
      '········\n' +
      '········'
    );
  });
  test('initialized board', () => {
    const b = createBoard();
    initializeBoard(b);
    const actual = toString(b);
    expect(actual).toBe(
      '········\n' +
      '········\n' +
      '········\n' +
      '···○●···\n' +
      '···●○···\n' +
      '········\n' +
      '········\n' +
      '········'
    );
  });
  test('initialized board inverted', () => {
    const b = createBoard();
    initializeBoard(b);
    const actual = toString(b, true);
    expect(actual).toBe(
      '········\n' +
      '········\n' +
      '········\n' +
      '···●○···\n' +
      '···○●···\n' +
      '········\n' +
      '········\n' +
      '········'
    );
  });
  test('with a few positions set', () => {
    const b = createBoard();
    setDiskAtCoords(b, 5, 1, Disk.BLACK);
    setDiskAtCoords(b, 5, 2, Disk.BLACK);
    setDiskAtCoords(b, 5, 3, Disk.BLACK);
    setDiskAtCoords(b, 5, 4, Disk.BLACK);
    setDiskAtCoords(b, 2, 5, Disk.BLACK);
    setDiskAtCoords(b, 5, 5, Disk.BLACK);
    setDiskAtCoords(b, 3, 6, Disk.BLACK);
    setDiskAtCoords(b, 4, 6, Disk.BLACK);
    const actual = toString(b);
    expect(actual).toBe(
      '········\n' +
      '·····●··\n' +
      '·····●··\n' +
      '·····●··\n' +
      '·····●··\n' +
      '··●··●··\n' +
      '···●●···\n' +
      '········'
    );
  });
});

describe('isBoardLegal()', () => {
  it('returns true for empty board', () => {
    const b = createBoard();
    const actual = isBoardLegal(b);
    expect(actual).toBe(true);
  });
  it('returns true for initialized board', () => {
    const b = createBoard();
    initializeBoard(b);
    const actual = isBoardLegal(b);
    expect(actual).toBe(true);
  });
  it('returns false for a board with a white and black disk in the same position', () => {
    const b = createBoard();
    b[0] = 1;
    b[8] = 1;
    const actual = isBoardLegal(b);
    expect(actual).toBe(false);
  });
});

describe('assertBoardLegal()', () => {
  it('returns true for empty board', () => {
    const b = createBoard();
    expect(() => {
      assertBoardLegal(b);
    }).not.toThrow();
  });
  it('returns true for initialized board', () => {
    const b = createBoard();
    initializeBoard(b);
    expect(() => {
      assertBoardLegal(b);
    }).not.toThrow();
  });
  it('returns false for a board with a white and black disk in the same position', () => {
    const b = createBoard();
    b[0] = 1;
    b[8] = 1;
    expect(() => {
      assertBoardLegal(b);
    }).toThrow('Board is in an illegal state');
  });
});

describe('isBoardFull()', () => {
  it('returns false for empty board', () => {
    const b = createBoard();
    const actual = isBoardFull(b);
    expect(actual).toBe(false);
  });
  it('returns false for initialized board', () => {
    const b = createBoard();
    initializeBoard(b);
    const actual = isBoardFull(b);
    expect(actual).toBe(false);
  });
  it('returns true for full black board', () => {
    const b = createBoard();
    b.fill(255, 0, 8);
    const actual = isBoardFull(b);
    expect(actual).toBe(true);
  });
  it('returns true for full white board', () => {
    const b = createBoard();
    b.fill(255, 8, 16);
    const actual = isBoardFull(b);
    expect(actual).toBe(true);
  });
  it('returns true for half black half white board', () => {
    const b = createBoard();
    b.fill(255, 4, 12);
    const actual = isBoardFull(b);
    expect(actual).toBe(true);
  });
});

describe('getAllNeighboringCoords()', () => {
  test('top left corner', () => {
    const actual = getAllNeighboringCoords(0, 0);
    expect(actual).toEqual([
      [1, 0],
      [0, 1],
      [1, 1],
    ]);
  });
  test('top edge', () => {
    const actual = getAllNeighboringCoords(3, 0);
    expect(actual).toEqual([
      [2, 0],
      [4, 0],
      [2, 1],
      [3, 1],
      [4, 1],
    ]);
  });
  test('top right corner', () => {
    const actual = getAllNeighboringCoords(7, 0);
    expect(actual).toEqual([
      [6, 0],
      [6, 1],
      [7, 1],
    ]);
  });
  test('right edge', () => {
    const actual = getAllNeighboringCoords(7, 3);
    expect(actual).toEqual([
      [6, 2],
      [7, 2],
      [6, 3],
      [6, 4],
      [7, 4],
    ]);
  });
  test('bottom right corner', () => {
    const actual = getAllNeighboringCoords(7, 7);
    expect(actual).toEqual([
      [6, 6],
      [7, 6],
      [6, 7],
    ]);
  });
  test('bottom edge', () => {
    const actual = getAllNeighboringCoords(3, 7);
    expect(actual).toEqual([
      [2, 6],
      [3, 6],
      [4, 6],
      [2, 7],
      [4, 7],
    ]);
  });
  test('bottom left corner', () => {
    const actual = getAllNeighboringCoords(0, 7);
    expect(actual).toEqual([
      [0, 6],
      [1, 6],
      [1, 7],
    ]);
  });
  test('left edge', () => {
    const actual = getAllNeighboringCoords(0, 3);
    expect(actual).toEqual([
      [0, 2],
      [1, 2],
      [1, 3],
      [0, 4],
      [1, 4],
    ]);
  });
  test('middle', () => {
    const actual = getAllNeighboringCoords(3, 3);
    expect(actual).toEqual([
      [2, 2],
      [3, 2],
      [4, 2],
      [2, 3],
      [4, 3],
      [2, 4],
      [3, 4],
      [4, 4],
    ]);
  });
});

describe('getLine()', () => {
  it('works east from (0,0)', () => {
    const actual = getLine(0, 0, 1, 0);
    expect(actual).toEqual([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
    ]);
  });
  it('works south from (0,0)', () => {
    const actual = getLine(0, 0, 0, 1);
    expect(actual).toEqual([
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ]);
  });
  it('works south-east from (0,0)', () => {
    const actual = getLine(0, 0, 1, 1);
    expect(actual).toEqual([
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
    ]);
  });
  it('works north-west from (0,0)', () => {
    const actual = getLine(4, 5, -1, -1);
    expect(actual).toEqual([
      [3, 4],
      [2, 3],
      [1, 2],
      [0, 1],
    ]);
  });
});

describe('getAllLines()', () => {
  it('returns all lines from (7,2) as expected', () => {
    const actual = getAllLines(7, 2);
    expect(actual).toEqual([
      [[6, 1], [5, 0]],
      [[7, 1], [7, 0]],
      [],
      [[6, 2], [5, 2], [4, 2], [3, 2], [2, 2], [1, 2], [0, 2]],
      [],
      [[6, 3], [5, 4], [4, 5], [3, 6], [2, 7]],
      [[7, 3], [7, 4], [7, 5], [7, 6], [7, 7]],
      [],
    ]);
  });
});

describe('isLegalMoveForCoords()', () => {
  const b = createBoard();
  initializeBoard(b);

  test.each([
    [[2, 2], false],
    [[3, 2], true],
    [[4, 2], false],
    [[5, 2], false],
    [[2, 3], true],
    [[3, 3], false],
    [[4, 3], false],
    [[5, 3], false],
    [[2, 4], false],
    [[3, 4], false],
    [[4, 4], false],
    [[5, 4], true],
    [[2, 5], false],
    [[3, 5], false],
    [[4, 5], true],
    [[5, 5], false],
  ])('%p is valid? %p', ([x, y], expected) => {
    const actual = isLegalMoveForCoords(b, x, y, Disk.BLACK);
    expect(actual).toBe(expected);
  });
});

describe('playMoveAtCoords()', () => {
  it('works for the first move', () => {
    const b = createBoard();
    initializeBoard(b);
    const moves = playMoveAtCoords(b, 4, 5, Disk.BLACK);
    expect(getDiskAtCoords(moves, 3, 3)).toBeNull();
    expect(getDiskAtCoords(moves, 4, 3)).toBeNull();
    expect(getDiskAtCoords(moves, 3, 4)).toBeNull();
    expect(getDiskAtCoords(moves, 4, 4)).toBe(Disk.BLACK); // Disk flipped
    expect(getDiskAtCoords(moves, 4, 5)).toBe(Disk.BLACK); // Position played
  });
});

describe('applyMoves()', () => {
  it('works for the first move', () => {
    const b = createBoard();
    initializeBoard(b);
    applyMoves(b, playMoveAtCoords(b, 4, 5, Disk.BLACK));
    assertBoardLegal(b);
    expect(getDiskAtCoords(b, 3, 3)).toBe(Disk.WHITE);
    expect(getDiskAtCoords(b, 4, 3)).toBe(Disk.BLACK);
    expect(getDiskAtCoords(b, 3, 4)).toBe(Disk.BLACK);
    expect(getDiskAtCoords(b, 4, 4)).toBe(Disk.BLACK); // Disk flipped
    expect(getDiskAtCoords(b, 4, 5)).toBe(Disk.BLACK); // Position played
  });
  it('works for the second move', () => {
    const b = createBoard();
    initializeBoard(b);
    applyMoves(b, playMoveAtCoords(b, 4, 5, Disk.BLACK));
    applyMoves(b, playMoveAtCoords(b, 3, 5, Disk.WHITE));
    assertBoardLegal(b);
    expect(getDiskAtCoords(b, 3, 3)).toBe(Disk.WHITE);
    expect(getDiskAtCoords(b, 4, 3)).toBe(Disk.BLACK);
    expect(getDiskAtCoords(b, 3, 4)).toBe(Disk.WHITE); // Disk flipped
    expect(getDiskAtCoords(b, 4, 4)).toBe(Disk.BLACK);
    expect(getDiskAtCoords(b, 3, 5)).toBe(Disk.WHITE); // Position played
    expect(getDiskAtCoords(b, 4, 5)).toBe(Disk.BLACK);
  });
});

describe('getScore()', () => {
  it('returns 0 for each color when empty', () => {
    const b = createBoard();
    expect(getScore(b, Disk.BLACK)).toBe(0);
    expect(getScore(b, Disk.WHITE)).toBe(0);
  });
  it('returns 2 for each color when initialized', () => {
    const b = createBoard();
    initializeBoard(b);
    expect(getScore(b, Disk.BLACK)).toBe(2);
    expect(getScore(b, Disk.WHITE)).toBe(2);
  });
  it('returns correct value for given board', () => {
    const b = createBoard();
    initializeBoard(b);
    setDiskAtCoords(b, 4, 4, Disk.BLACK);
    setDiskAtCoords(b, 4, 5, Disk.BLACK);
    expect(getScore(b, Disk.WHITE)).toBe(1);
    expect(getScore(b, Disk.BLACK)).toBe(4);
  });
});

describe('getCardinalPositionFromCoords()', () => {
  test.each([
    [0, 0, 'a1'],
    [5, 4, 'f5'],
  ])('(%p,%p) = %p', (x, y, expected) => {
    const actual = getCardinalPositionFromCoords(x, y);
    expect(actual).toBe(expected);
  });
});

describe('getCardinalPositionFromIndex()', () => {
  test.each([
    [0, 'a1'],
    [37, 'f5'],
  ])('%p = %p', (index, expected) => {
    const actual = getCardinalPositionFromIndex(index);
    expect(actual).toBe(expected);
  });
});
