import React from 'react';
import { Disk, getCoordsAtIndex } from '@othello/logic';
import classNames from 'classnames';
import { LogEntry } from 'boardgame.io';
import './DiskDisplay.css';

export interface Props {
  disk: Disk;
  index?: number;
  log?: LogEntry[];
}

function usePrevious <T>(value: T): T | undefined {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const getLastMove = (log: LogEntry[]): LogEntry | undefined => {
  for (let i = log.length - 1; i >= 0; i--) {
    if (log[i].action.type === 'MAKE_MOVE') return log[i];
  }
}

const DISTANCE_DELAY = 50;

const DiskDisplay: React.FC<Props> = ({ disk, index, log, children }) => {
  const previousDisk = usePrevious(disk);
  const diskRef = React.createRef<HTMLDivElement>();
  
  React.useEffect(() => {
    const diskElement = diskRef.current;
    if (
      index === undefined ||
      log === undefined ||
      previousDisk === undefined ||
      previousDisk === disk ||
      !diskElement
    ) return;
    const lastMove = getLastMove(log);
    if (lastMove === undefined) return;
    const [x, y] = getCoordsAtIndex(index);
    const [lastX, lastY] = getCoordsAtIndex(lastMove.action.payload.args[0]);
    const distance = Math.max(Math.abs(x - lastX), Math.abs(y - lastY));
    const delay = distance * DISTANCE_DELAY;
    diskElement.style.animationDelay = `${delay / 1000}s`;
    diskElement.style.animationDuration = `0.5s`;
    // diskElement.style.animationDelay = '0s';
  }, [diskRef, disk, previousDisk, index, log]);

  return (
    <div ref={diskRef} className={classNames('DiskDisplay', {
      'DiskDisplay--black': disk === Disk.BLACK,
      'DiskDisplay--white': disk === Disk.WHITE,
    })}>
      {children}
    </div>
  );
};

export default DiskDisplay;
