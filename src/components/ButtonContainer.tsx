import { PropsWithChildren } from 'react';

const ButtonContainer = ({ children }: PropsWithChildren) => {
  return (
    <footer className="flex fixed bottom-4 gap-4 px-6 w-full">
      {children}
    </footer>
  );
};

export default ButtonContainer;
