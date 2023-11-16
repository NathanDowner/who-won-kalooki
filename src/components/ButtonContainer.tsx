import React, { PropsWithChildren } from 'react';

const ButtonContainer = ({ children }: PropsWithChildren) => {
  return (
    <footer className="flex fixed bottom-4 max-w-md gap-4 -ml-4 w-full">
      {children}
    </footer>
  );
};

export default ButtonContainer;
