import React from 'react';
import './MoveDisplay.css';

export interface Props {
  onClick?: () => void;
}

const MoveDisplay: React.FC<Props> = ({ onClick }) => (
  <button
    className="MoveDisplay"
    type="button"
    onClick={onClick}
  />
);

export default MoveDisplay;
