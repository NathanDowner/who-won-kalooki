import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  value: string;
  onClick: () => void;
}

const KeypadKey = ({ value, onClick, children }: Props) => {
  return (
    <button
      className="py-4 border border-black rounded-md grid place-items-center"
      onClick={onClick}
    >
      {' '}
      {children ? children : value}
    </button>
  );
};

export default KeypadKey;
