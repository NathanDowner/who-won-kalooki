import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  value: string;
  onClick: () => void;
  css?: string;
}

const KeypadKey = ({ value, onClick, css, children }: Props) => {
  return (
    <button
      className={`py-4 border border-black rounded-md grid place-items-center ${css}`}
      onClick={onClick}
    >
      {children ? children : value}
    </button>
  );
};

export default KeypadKey;
